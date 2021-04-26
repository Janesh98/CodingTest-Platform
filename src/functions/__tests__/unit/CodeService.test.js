const axios = require('axios');
jest.mock('axios');
const CodeService = require('../../services/CodeService');

describe('CodeService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should execute code in Python and return output', async () => {
    const mockData = {};
    jest.spyOn(axios, 'request').mockResolvedValueOnce(mockData);
    const code = 'print("hello world")';
    const language = 'python';
    const stdin = '1 2 3 4 5';
    const result = await CodeService.submitCode(code, language, stdin);
    expect(result).toEqual(mockData);
  });
  it('should execute code in Java and return output', async () => {
    const mockData = {};
    jest.spyOn(axios, 'request').mockResolvedValueOnce(mockData);
    const code = 'print("hello world")';
    const language = 'java';
    const stdin = '1 2 3 4 5';
    const result = await CodeService.submitCode(code, language, stdin);
    expect(result).toEqual(mockData);
  });
  it('should execute code in JavaScript and return output', async () => {
    const mockData = {};
    jest.spyOn(axios, 'request').mockResolvedValueOnce(mockData);
    const code = 'print("hello world")';
    const language = 'javascript';
    const stdin = '1 2 3 4 5';
    const result = await CodeService.submitCode(code, language, stdin);
    expect(result).toEqual(mockData);
  });
  it('should throw Error as language does not exist', async () => {
    const mockData = {};
    jest.spyOn(axios, 'request').mockResolvedValueOnce(mockData);
    const code = 'print("hello world")';
    const language = 'doesNotExist';
    const stdin = '1 2 3 4 5';

    let message = false;
    try {
      await CodeService.submitCode(code, language, stdin);
    } catch (e) {
      message = e.message;
    }
    expect(message).toBe(`Language '${language}' is not supported`);
  });
});
