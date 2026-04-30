<#
.SYNOPSIS
  Search C:\ for node, npm, git, curl and add their directories to the User PATH.

.NOTES
  - Does NOT require admin. Modifies the per-user PATH only (HKCU registry hive).
  - Scans all of C:\ — can take several minutes. Pass -SearchRoot to narrow it.
  - Open a new terminal to see the persisted change everywhere.
  - Use -WhatIf to preview without modifying PATH.
#>

[CmdletBinding(SupportsShouldProcess)]
param(
    [string[]]$Commands = @('node', 'npm', 'git', 'curl'),
    [string]$SearchRoot = 'C:\'
)

$ErrorActionPreference = 'Stop'

# This script is intentionally User-scope only. Writing to Machine PATH would
# require admin; we don't want that. Hard-code the scope so it can't drift.
$PathScope = 'User'

# Warn if running elevated — not needed, and any subsequent `npm install -g` etc.
# from this shell would land in admin-owned locations.
$isAdmin = ([Security.Principal.WindowsPrincipal] `
    [Security.Principal.WindowsIdentity]::GetCurrent()
).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if ($isAdmin) {
    Write-Warning "Running as Administrator. Not required — this script only edits your User PATH."
}

function Find-Executable {
    param([string]$Name, [string]$Root)

    $patterns = @("$Name.exe", "$Name.cmd", "$Name.bat")
    Write-Host "Searching $Root for $Name..." -ForegroundColor Cyan

    $hits = foreach ($pat in $patterns) {
        Get-ChildItem -Path $Root -Filter $pat -File -Recurse -ErrorAction SilentlyContinue
    }

    if (-not $hits) { return $null }

    # Prefer shortest path (typically the canonical install location)
    $hits | Sort-Object { $_.FullName.Length } | Select-Object -First 1
}

# 1. Discover
$dirsToAdd = [System.Collections.Generic.HashSet[string]]::new([StringComparer]::OrdinalIgnoreCase)
$results = @{}

foreach ($cmd in $Commands) {
    # Skip if already on PATH
    $existing = Get-Command $cmd -ErrorAction SilentlyContinue
    if ($existing) {
        Write-Host "[OK]    $cmd already on PATH: $($existing.Source)" -ForegroundColor Green
        $results[$cmd] = $existing.Source
        continue
    }

    $hit = Find-Executable -Name $cmd -Root $SearchRoot
    if ($hit) {
        Write-Host "[FOUND] $cmd -> $($hit.FullName)" -ForegroundColor Yellow
        $results[$cmd] = $hit.FullName
        [void]$dirsToAdd.Add($hit.DirectoryName)
    } else {
        Write-Host "[MISS]  $cmd not found under $SearchRoot" -ForegroundColor Red
        $results[$cmd] = $null
    }
}

if ($dirsToAdd.Count -eq 0) {
    Write-Host "`nNothing to add to PATH." -ForegroundColor Green
    return
}

# 2. Compute new User PATH (dedup, case-insensitive)
$currentUserPath = [Environment]::GetEnvironmentVariable('Path', $PathScope)
$currentEntries  = if ($currentUserPath) { $currentUserPath -split ';' | Where-Object { $_ } } else { @() }

$newEntries = foreach ($d in $dirsToAdd) {
    if ($currentEntries -notcontains $d) { $d }
}

if (-not $newEntries) {
    Write-Host "`nAll discovered directories already in User PATH." -ForegroundColor Green
    return
}

Write-Host "`nWill add to User PATH:" -ForegroundColor Cyan
$newEntries | ForEach-Object { Write-Host "  + $_" }

# 3. Persist
$updatedPath = (@($currentEntries) + $newEntries) -join ';'

if ($PSCmdlet.ShouldProcess("$PathScope PATH", "Append $($newEntries.Count) director(ies)")) {
    [Environment]::SetEnvironmentVariable('Path', $updatedPath, $PathScope)
    # Also update current session so changes are visible without restart
    $env:Path = $env:Path + ';' + ($newEntries -join ';')
    Write-Host "`n$PathScope PATH updated. Open a new terminal for the change to apply everywhere." -ForegroundColor Green
}
