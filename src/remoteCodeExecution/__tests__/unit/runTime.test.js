const Runtime = require('../../utils/runTime');

describe('Utility functions - runTime', () => {
  it('should calculate difference between two datetimes', () => {
    startDt = '2021-03-31T21:34:44.0019025Z';
    endDt = '2021-03-31T21:34:44.4301028Z';
    result = Runtime.getRunTime(startDt, endDt);
    expect(result).toBe(0.429);
  });
  it('should be no difference between same dateimes', () => {
    startDt = '2021-03-31T21:34:44.0019025Z';
    result = Runtime.getRunTime(startDt, startDt);
    expect(result).toBe(0);
  });
  it('difference should not be negative between two datetimes', () => {
    startDt = '2021-03-31T21:34:44.0019025Z';
    endDt = '2021-03-31T21:34:44.4301028Z';
    result = Runtime.getRunTime(endDt, startDt);
    expect(result).toBe(0.429);
  });
});
