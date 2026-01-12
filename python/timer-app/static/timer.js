// Timer state
let timerState = {
    totalSeconds: 0,
    remainingSeconds: 0,
    intervalId: null,
    isRunning: false,
    isPaused: false
};

// Audio context for sound effects
let audioContext = null;

function getAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    // Resume if suspended (required by browser autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    return audioContext;
}

// Play a tone with given frequency, duration, and type
function playTone(frequency, duration, type = 'sine', volume = 0.3) {
    const ctx = getAudioContext();

    // Ensure context is running before playing
    if (ctx.state !== 'running') {
        ctx.resume().then(() => {
            playToneInternal(ctx, frequency, duration, type, volume);
        });
    } else {
        playToneInternal(ctx, frequency, duration, type, volume);
    }
}

function playToneInternal(ctx, frequency, duration, type, volume) {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;
    gainNode.gain.value = volume;

    // Fade out to avoid clicks
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
}

// Start sound - Rising hopeful tone (ascending notes)
function playStartSound() {
    const ctx = getAudioContext();
    ctx.resume();
    // Ascending cheerful notes: C5 -> E5 -> G5
    setTimeout(() => playTone(523, 0.15, 'sine', 0.5), 0);    // C5
    setTimeout(() => playTone(659, 0.15, 'sine', 0.5), 120);  // E5
    setTimeout(() => playTone(784, 0.25, 'sine', 0.6), 240);  // G5
}

// Resume sound - Quick double beep (ready to continue)
function playResumeSound() {
    const ctx = getAudioContext();
    ctx.resume();
    setTimeout(() => playTone(587, 0.12, 'sine', 0.5), 0);    // D5
    setTimeout(() => playTone(784, 0.18, 'sine', 0.6), 120);  // G5
}

// Complete sound - Celebratory fanfare
function playCompleteSound() {
    const ctx = getAudioContext();
    ctx.resume();
    // Victory fanfare: G4 -> C5 -> E5 -> G5 (held)
    setTimeout(() => playTone(392, 0.2, 'sine', 0.5), 0);     // G4
    setTimeout(() => playTone(523, 0.2, 'sine', 0.5), 150);   // C5
    setTimeout(() => playTone(659, 0.2, 'sine', 0.5), 300);   // E5
    setTimeout(() => playTone(784, 0.5, 'sine', 0.7), 450);   // G5 (longer)
}

// Cancel sound - Gentle descending tone
function playCancelSound() {
    const ctx = getAudioContext();
    ctx.resume();
    setTimeout(() => playTone(440, 0.15, 'sine', 0.4), 0);   // A4
    setTimeout(() => playTone(330, 0.2, 'sine', 0.3), 100);  // E4
}

// DOM Elements
const inputSection = document.getElementById('input-section');
const timerSection = document.getElementById('timer-section');
const completeSection = document.getElementById('complete-section');
const minutesInput = document.getElementById('minutes-input');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const cancelBtn = document.getElementById('cancel-btn');
const restartBtn = document.getElementById('restart-btn');
const timerDisplay = document.getElementById('timer-display');
const statusIndicator = document.getElementById('status-indicator');
const errorMessage = document.getElementById('error-message');

// Event Listeners
startBtn.addEventListener('click', handleStart);
pauseBtn.addEventListener('click', handlePauseResume);
cancelBtn.addEventListener('click', handleCancel);
restartBtn.addEventListener('click', handleRestart);
minutesInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleStart();
});

// Validate and start timer
function handleStart() {
    const minutes = parseFloat(minutesInput.value);

    // Validation
    if (isNaN(minutes) || minutesInput.value.trim() === '') {
        showError('Please enter a valid number');
        return;
    }

    if (minutes <= 0) {
        showError('Please enter a positive number');
        return;
    }

    if (minutes > 999) {
        showError('Maximum time is 999 minutes');
        return;
    }

    clearError();
    startTimer(minutes);
}

// Start the countdown
function startTimer(minutes) {
    // Convert minutes to seconds (handle decimals)
    timerState.totalSeconds = Math.round(minutes * 60);
    timerState.remainingSeconds = timerState.totalSeconds;
    timerState.isRunning = true;
    timerState.isPaused = false;

    // Play start sound
    playStartSound();

    // Update UI
    showSection('timer');
    updateDisplay();
    updateStatus('Running', 'running');
    updatePauseButton();

    // Start countdown
    timerState.intervalId = setInterval(tick, 1000);
}

// Timer tick - called every second
function tick() {
    if (timerState.remainingSeconds > 0) {
        timerState.remainingSeconds--;
        updateDisplay();
    }

    if (timerState.remainingSeconds <= 0) {
        timerComplete();
    }
}

// Handle pause/resume toggle
function handlePauseResume() {
    if (timerState.isPaused) {
        resumeTimer();
    } else {
        pauseTimer();
    }
}

// Pause the timer
function pauseTimer() {
    if (timerState.intervalId) {
        clearInterval(timerState.intervalId);
        timerState.intervalId = null;
    }
    timerState.isPaused = true;
    timerState.isRunning = false;

    updateStatus('Paused', 'paused');
    updatePauseButton();
}

// Resume the timer
function resumeTimer() {
    timerState.isPaused = false;
    timerState.isRunning = true;

    // Play resume sound
    playResumeSound();

    updateStatus('Running', 'running');
    updatePauseButton();

    timerState.intervalId = setInterval(tick, 1000);
}

// Cancel and reset
function handleCancel() {
    // Play cancel sound
    playCancelSound();

    clearTimer();
    showSection('input');
    minutesInput.value = '';
    minutesInput.focus();
}

// Timer completed
function timerComplete() {
    // Play celebratory complete sound
    playCompleteSound();

    clearTimer();
    showSection('complete');
}

// Clear timer interval and reset state
function clearTimer() {
    if (timerState.intervalId) {
        clearInterval(timerState.intervalId);
        timerState.intervalId = null;
    }
    timerState.isRunning = false;
    timerState.isPaused = false;
    timerState.remainingSeconds = 0;
}

// Restart from completion screen
function handleRestart() {
    showSection('input');
    minutesInput.value = '';
    minutesInput.focus();
}

// Update the timer display (MM:SS format)
function updateDisplay() {
    const minutes = Math.floor(timerState.remainingSeconds / 60);
    const seconds = timerState.remainingSeconds % 60;

    const displayMinutes = String(minutes).padStart(2, '0');
    const displaySeconds = String(seconds).padStart(2, '0');

    timerDisplay.textContent = `${displayMinutes}:${displaySeconds}`;
}

// Update pause button text and style
function updatePauseButton() {
    if (timerState.isPaused) {
        pauseBtn.textContent = 'Resume';
        pauseBtn.classList.add('resume');
    } else {
        pauseBtn.textContent = 'Pause';
        pauseBtn.classList.remove('resume');
    }
}

// Update status indicator
function updateStatus(text, className) {
    statusIndicator.textContent = text;
    statusIndicator.className = 'status ' + className;
}

// Show/hide sections
function showSection(section) {
    inputSection.classList.add('hidden');
    timerSection.classList.add('hidden');
    completeSection.classList.add('hidden');

    switch(section) {
        case 'input':
            inputSection.classList.remove('hidden');
            break;
        case 'timer':
            timerSection.classList.remove('hidden');
            break;
        case 'complete':
            completeSection.classList.remove('hidden');
            break;
    }
}

// Error handling
function showError(message) {
    errorMessage.textContent = message;
}

function clearError() {
    errorMessage.textContent = '';
}
