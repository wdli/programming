# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a polyglot learning and experimentation repository containing projects and examples across multiple programming languages and technologies. Each top-level directory represents a different language or technology stack with independent projects.

## Repository Structure

- **go/** - Go projects including Kubernetes controllers, metrics exporters, and learning examples
  - Individual projects have their own `go.mod` files
  - Projects: admission-control, counter-metrics, k8s client tools, learning examples
- **python/** - Python scripts and Docker-based development examples
- **java/** - Java learning examples with Makefile-based builds
- **bash/** - Shell scripting examples and grep pattern references
- **k8/** - Kubernetes manifests, Dockerfiles, and kubectl command references
- **terraform/** - Infrastructure as Code examples
- **ansible/** - Ansible playbooks and container configurations
- **copilot/** - GitHub Copilot examples across multiple languages
- **ebpf/** - eBPF learning materials
- **cl/** - Common Lisp examples

## Common Commands

### Go Projects
Each Go project is independent with its own module:
```bash
cd go/<project-name>
go build                    # Build the project
go test ./...              # Run all tests
go run main.go             # Run the main program
```

### Python Development
Python development uses Docker containers:
```bash
cd python
docker build -t david-python .
docker run -v $(pwd):/app --rm -it david-python
docker run -v $(pwd):/app --rm -it david-python python -m pdb /app/<script>.py
```

### Java Development
```bash
cd java
export CLASSPATH=/home/david/workspace/javaclass
make                       # Compiles all .java files
make clean                 # Removes compiled classes
java <MainClass>           # Run the compiled program
```

### Kubernetes Development
The k8/ directory contains kubectl command references and examples:
```bash
# Local development
minikube start/stop

# Common operations (see k8/README for full reference)
kubectl apply -f <manifest>.yaml
kubectl get pods/deployments/services
kubectl delete -f <manifest>.yaml
kubectl exec -it <pod-name> bash
```

## Git Workflow

This repository has Claude Code GitHub Actions integration:
- **@claude mentions** in issues/PRs trigger the Claude assistant (`.github/workflows/claude.yml`)
- **Automated code reviews** run on pull requests (`.github/workflows/claude-code-review.yml`)

## Development Notes

### Language-Specific Patterns

**Go:**
- Each subdirectory in `go/` is typically an independent module
- Use standard Go testing patterns (`*_test.go` files)
- Go version 1.20+ is used across projects

**Python:**
- Dependencies listed in `requirements.txt` (requests, pyyaml)
- Docker-based workflows are preferred for consistency
- Scripts often include template examples for API calls

**Java:**
- Simple Makefile-based builds (no Maven/Gradle in this repo)
- Requires CLASSPATH environment variable setup
- Focus on learning fundamentals

**Kubernetes:**
- Examples cover: Deployments, ReplicaSets, DaemonSets, Services
- Uses minikube for local development
- Docker images pushed to wdlidocker registry for testing

### Docker Usage
- Python projects use custom `david-python` image
- Kubernetes examples use `wdli-flask` image
- Images are tagged and pushed to Docker Hub (wdlidocker namespace)

## Testing

- **Go**: Standard `go test` in each project directory
- **Python**: Scripts can be run with debugger: `python -m pdb <script.py>`
- No centralized test runner; tests are project-specific

## Architecture Notes

This is a learning repository, not a production system. Each directory is relatively independent:
- No shared libraries or common modules across languages
- READMEs in subdirectories contain language/project-specific documentation
- Focus is on experimentation and learning rather than production-ready code
