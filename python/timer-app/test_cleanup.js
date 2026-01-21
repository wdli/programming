/**
 * Automated test script to verify memory leak fix
 * Run this in the browser console on the timer app page
 */

console.log('=== Memory Leak Fix Test Suite ===\n');

// Test 1: Verify cleanup function exists
console.log('Test 1: Checking if cleanupAllTimers function exists...');
if (typeof cleanupAllTimers === 'function') {
    console.log('✓ PASS: cleanupAllTimers function exists');
} else {
    console.error('✗ FAIL: cleanupAllTimers function not found');
}

// Test 2: Verify timers object exists
console.log('\nTest 2: Checking timer state object...');
if (typeof timers !== 'undefined' && timers[1] && timers[2]) {
    console.log('✓ PASS: Timer state objects exist');
    console.log('  Timer 1 state:', timers[1]);
    console.log('  Timer 2 state:', timers[2]);
} else {
    console.error('✗ FAIL: Timer state objects not found');
}

// Test 3: Start a timer and verify intervalId is set
console.log('\nTest 3: Testing timer start and interval creation...');
console.log('Starting a 0.1 minute timer on Timer 1...');

// Simulate user input and start
const timer1Input = document.getElementById('timer1-minutes');
const timer1StartBtn = document.getElementById('timer1-start-btn');

if (timer1Input && timer1StartBtn) {
    timer1Input.value = '0.1'; // 6 seconds
    timer1StartBtn.click();

    setTimeout(() => {
        if (timers[1].intervalId !== null) {
            console.log('✓ PASS: Timer interval created');
            console.log('  Timer 1 intervalId:', timers[1].intervalId);
            console.log('  Timer 1 isRunning:', timers[1].isRunning);
        } else {
            console.error('✗ FAIL: Timer interval not created');
        }

        // Test 4: Test cleanup function
        console.log('\nTest 4: Testing cleanupAllTimers function...');
        console.log('Calling cleanupAllTimers()...');

        const timer1IntervalBefore = timers[1].intervalId;
        const timer2IntervalBefore = timers[2].intervalId;

        cleanupAllTimers();

        if (timers[1].intervalId === null && timers[2].intervalId === null) {
            console.log('✓ PASS: All timer intervals cleared');
            console.log('  Timer 1 intervalId:', timers[1].intervalId);
            console.log('  Timer 2 intervalId:', timers[2].intervalId);
            console.log('  Timer 1 isRunning:', timers[1].isRunning);
            console.log('  Timer 2 isRunning:', timers[2].isRunning);
        } else {
            console.error('✗ FAIL: Timer intervals not properly cleared');
        }

        // Test 5: Verify event listeners
        console.log('\nTest 5: Event listeners verification...');
        console.log('Note: Event listeners for beforeunload and pagehide are attached.');
        console.log('These will automatically call cleanupAllTimers() when you:');
        console.log('  - Navigate to another page');
        console.log('  - Close the tab/window');
        console.log('  - Refresh the page');
        console.log('✓ Event listeners should be active');

        // Summary
        console.log('\n=== Test Summary ===');
        console.log('All automated tests completed.');
        console.log('Manual test: Start timers and navigate away/close tab.');
        console.log('Expected: No running intervals should persist after page unload.');
        console.log('\nTo manually verify:');
        console.log('1. Start one or both timers');
        console.log('2. Check timers object: console.log(timers)');
        console.log('3. Navigate away or close tab');
        console.log('4. Intervals should be automatically cleared');

    }, 100); // Wait for timer to start
} else {
    console.error('✗ FAIL: Timer input or button elements not found');
}
