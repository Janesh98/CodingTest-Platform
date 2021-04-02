const { escapeQuotes } = require('../../utils/escape');

describe('Utility functions - escape quotes', () => {
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
});
