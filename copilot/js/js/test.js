function calculateDaysBetweenDates(begin, end) {    
    const beginDate = new Date(begin);
    const endDate = new Date(end);
    const difference = endDate.getTime() - beginDate.getTime();
    const days = difference / (1000 * 3600 * 24);
    return days;
}

// write test function here
function testCalculateDaysBetweenDates() {
    const begin = new Date('2020-04-02');
    const end = new Date('2020-05-14');
    expect(calculateDaysBetweenDates(begin, end)).toBe(42);
}


// Path: github/programming/copilot/js/js/test.js