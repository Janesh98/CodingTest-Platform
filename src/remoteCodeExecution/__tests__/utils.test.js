const { escapeQuotes } = require('../utils/escape');
const { getRunTime } = require('../utils/runTime');

describe('Utility functions test', () => {
  it('should escape all quotes', () => {
    testCmd = 'print("hello world")';
    result = escapeQuotes(testCmd);
    expect(result).toBe('print(\\"hello world\\")');
  });
  it('should not escape an empty string', () => {
    testCmd = '';
    result = escapeQuotes(testCmd);
    expect(result).toBe('');
  });
  it('should calculate difference between two datetimes', () => {
    startDt = '2021-03-31T21:34:44.0019025Z';
    endDt = '2021-03-31T21:34:44.4301028Z';
    result = getRunTime(startDt, endDt);
    expect(result).toBe(0.429);
  });
  it('should be no difference between same dateimes', () => {
    startDt = '2021-03-31T21:34:44.0019025Z';
    result = getRunTime(startDt, startDt);
    expect(result).toBe(0);
  });
  it('difference should not be negative between two datetimes', () => {
    startDt = '2021-03-31T21:34:44.0019025Z';
    endDt = '2021-03-31T21:34:44.4301028Z';
    result = getRunTime(endDt, startDt);
    expect(result).toBe(0.429);
  });
});
