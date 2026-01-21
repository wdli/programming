// Timer states for both timers
const timers = {
    1: {
        totalSeconds: 0,
        remainingSeconds: 0,
        intervalId: null,
        isRunning: false,
        isPaused: false
    },
    2: {
        totalSeconds: 0,
        remainingSeconds: 0,
        intervalId: null,
        isRunning: false,
        isPaused: false
    }
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

// DOM Elements helper
function getElements(timerId) {
    return {
        nameInput: document.getElementById(`timer${timerId}-name`),
        inputSection: document.getElementById(`timer${timerId}-input-section`),
        displaySection: document.getElementById(`timer${timerId}-display-section`),
        completeSection: document.getElementById(`timer${timerId}-complete-section`),
        minutesInput: document.getElementById(`timer${timerId}-minutes`),
        startBtn: document.getElementById(`timer${timerId}-start-btn`),
        pauseBtn: document.getElementById(`timer${timerId}-pause-btn`),
        cancelBtn: document.getElementById(`timer${timerId}-cancel-btn`),
        restartBtn: document.getElementById(`timer${timerId}-restart-btn`),
        timerDisplay: document.getElementById(`timer${timerId}-display`),
        statusIndicator: document.getElementById(`timer${timerId}-status`),
        errorMessage: document.getElementById(`timer${timerId}-error`)
    };
}

// Initialize event listeners for both timers
function initTimer(timerId) {
    const els = getElements(timerId);

    els.startBtn.addEventListener('click', () => handleStart(timerId));
    els.pauseBtn.addEventListener('click', () => handlePauseResume(timerId));
    els.cancelBtn.addEventListener('click', () => handleCancel(timerId));
    els.restartBtn.addEventListener('click', () => handleRestart(timerId));
    els.minutesInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleStart(timerId);
    });
}

// Initialize both timers
initTimer(1);
initTimer(2);

// Validate and start timer
function handleStart(timerId) {
    const els = getElements(timerId);
    const minutes = parseFloat(els.minutesInput.value);

    // Validation
    if (isNaN(minutes) || els.minutesInput.value.trim() === '') {
        showError(timerId, 'Please enter a valid number');
        return;
    }

    if (minutes <= 0) {
        showError(timerId, 'Please enter a positive number');
        return;
    }

    if (minutes > 999) {
        showError(timerId, 'Maximum time is 999 minutes');
        return;
    }

    clearError(timerId);
    startTimer(timerId, minutes);
}

// Start the countdown
function startTimer(timerId, minutes) {
    const timer = timers[timerId];

    // Convert minutes to seconds (handle decimals)
    timer.totalSeconds = Math.round(minutes * 60);
    timer.remainingSeconds = timer.totalSeconds;
    timer.isRunning = true;
    timer.isPaused = false;

    // Play start sound
    playStartSound();

    // Update UI
    showSection(timerId, 'timer');
    updateDisplay(timerId);
    updateStatus(timerId, 'Running', 'running');
    updatePauseButton(timerId);

    // Start countdown
    timer.intervalId = setInterval(() => tick(timerId), 1000);
}

// Timer tick - called every second
function tick(timerId) {
    const timer = timers[timerId];

    if (timer.remainingSeconds > 0) {
        timer.remainingSeconds--;
        updateDisplay(timerId);
    }

    if (timer.remainingSeconds <= 0) {
        timerComplete(timerId);
    }
}

// Handle pause/resume toggle
function handlePauseResume(timerId) {
    const timer = timers[timerId];

    if (timer.isPaused) {
        resumeTimer(timerId);
    } else {
        pauseTimer(timerId);
    }
}

// Pause the timer
function pauseTimer(timerId) {
    const timer = timers[timerId];

    if (timer.intervalId) {
        clearInterval(timer.intervalId);
        timer.intervalId = null;
    }
    timer.isPaused = true;
    timer.isRunning = false;

    updateStatus(timerId, 'Paused', 'paused');
    updatePauseButton(timerId);
}

// Resume the timer
function resumeTimer(timerId) {
    const timer = timers[timerId];

    timer.isPaused = false;
    timer.isRunning = true;

    // Play resume sound
    playResumeSound();

    updateStatus(timerId, 'Running', 'running');
    updatePauseButton(timerId);

    timer.intervalId = setInterval(() => tick(timerId), 1000);
}

// Cancel and reset
function handleCancel(timerId) {
    // Play cancel sound
    playCancelSound();

    clearTimer(timerId);
    showSection(timerId, 'input');

    const els = getElements(timerId);
    els.minutesInput.value = '';
    els.minutesInput.focus();
}

// Timer completed
function timerComplete(timerId) {
    // Play celebratory complete sound
    playCompleteSound();

    clearTimer(timerId);
    showSection(timerId, 'complete');
}

// Clear timer interval and reset state
function clearTimer(timerId) {
    const timer = timers[timerId];

    if (timer.intervalId) {
        clearInterval(timer.intervalId);
        timer.intervalId = null;
    }
    timer.isRunning = false;
    timer.isPaused = false;
    timer.remainingSeconds = 0;
}

// Restart from completion screen
function handleRestart(timerId) {
    showSection(timerId, 'input');

    const els = getElements(timerId);
    els.minutesInput.value = '';
    els.minutesInput.focus();
}

// Update the timer display (MM:SS format)
function updateDisplay(timerId) {
    const timer = timers[timerId];
    const els = getElements(timerId);

    const minutes = Math.floor(timer.remainingSeconds / 60);
    const seconds = timer.remainingSeconds % 60;

    const displayMinutes = String(minutes).padStart(2, '0');
    const displaySeconds = String(seconds).padStart(2, '0');

    els.timerDisplay.textContent = `${displayMinutes}:${displaySeconds}`;
}

// Update pause button text and style
function updatePauseButton(timerId) {
    const timer = timers[timerId];
    const els = getElements(timerId);

    if (timer.isPaused) {
        els.pauseBtn.textContent = 'Resume';
        els.pauseBtn.classList.add('resume');
    } else {
        els.pauseBtn.textContent = 'Pause';
        els.pauseBtn.classList.remove('resume');
    }
}

// Update status indicator
function updateStatus(timerId, text, className) {
    const els = getElements(timerId);
    els.statusIndicator.textContent = text;
    els.statusIndicator.className = 'status ' + className;
}

// Show/hide sections
function showSection(timerId, section) {
    const els = getElements(timerId);

    els.inputSection.classList.add('hidden');
    els.displaySection.classList.add('hidden');
    els.completeSection.classList.add('hidden');

    switch(section) {
        case 'input':
            els.inputSection.classList.remove('hidden');
            break;
        case 'timer':
            els.displaySection.classList.remove('hidden');
            break;
        case 'complete':
            els.completeSection.classList.remove('hidden');
            break;
    }
}

// Error handling
function showError(timerId, message) {
    const els = getElements(timerId);
    els.errorMessage.textContent = message;
}

function clearError(timerId) {
    const els = getElements(timerId);
    els.errorMessage.textContent = '';
}
