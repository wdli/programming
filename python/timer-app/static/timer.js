// Timer state
let timerState = {
    totalSeconds: 0,
    remainingSeconds: 0,
    intervalId: null,
    isRunning: false,
    isPaused: false
};

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

    updateStatus('Running', 'running');
    updatePauseButton();

    timerState.intervalId = setInterval(tick, 1000);
}

// Cancel and reset
function handleCancel() {
    clearTimer();
    showSection('input');
    minutesInput.value = '';
    minutesInput.focus();
}

// Timer completed
function timerComplete() {
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
