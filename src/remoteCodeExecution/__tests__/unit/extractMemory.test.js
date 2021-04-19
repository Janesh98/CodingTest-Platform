const { extractMemory } = require('../../utils/extractMemory');

describe('Utility functions - extract memory', () => {
  it('should extract memory and stderr correctly', () => {
    const stderr =
      'IndentationError: expected an indented block\nCommand exited with non-zero status\nMEM: 123';
    result = extractMemory(stderr);
    const expected = {
      stderr:
        'IndentationError: expected an indented block\nCommand exited with non-zero status',
      memory: '123',
    };
    expect(result).toEqual(expected);
  });
  it('should return an empty string and memory as 0', () => {
    const stderr = '';
    result = extractMemory(stderr);
    const expected = {
      stderr: '',
      memory: '0',
    };
    expect(result).toEqual(expected);
  });
  it('should not change stderr', () => {
    const stderr = 'Error 123';
    result = extractMemory(stderr);
    const expected = {
      stderr: 'Error 123',
      memory: '0',
    };
    expect(result).toEqual(expected);
  });
});
