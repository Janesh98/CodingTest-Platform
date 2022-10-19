const ExecutorService = require('../../services/ExecutorService');
const { Base64 } = require('js-base64');
const crypto = require('crypto');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

describe('Create correct command to execute the given code in the specified language', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  it('Should create python context', () => {
    jest.spyOn(crypto, 'randomBytes').mockReturnValue('abc');

    const code = Base64.encode('print("hello world")');
    const input = Base64.encode('1 2 3');
    const language = 'python';
    const result = new ExecutorService().createContext(code, input, language);
    expected = {
      folder: '/tmp/code/abc',
      cmd: 'mkdir -p /tmp/code/abc/ && echo "print(\\"hello world\\")" > /tmp/code/abc/test.py && /usr/bin/time -f \'MEM: %M\' /usr/bin/timeout 15s python3 /tmp/code/abc/test.py 1 2 3',
    };
    expect(result).toEqual(expected);
  });
  it('Should create java context', () => {
    jest.spyOn(crypto, 'randomBytes').mockReturnValue('abc');

    const code = Base64.encode('System.out.println("hello world")');
    const input = Base64.encode('1 2 3');
    const language = 'java';
    const result = new ExecutorService().createContext(code, input, language);
    expected = {
      folder: '/tmp/code/abc',
      cmd: 'mkdir -p /tmp/code/abc/ && echo "System.out.println(\\"hello world\\")" > /tmp/code/abc/Main.java && javac /tmp/code/abc/Main.java && /usr/bin/time -f \'MEM: %M\' java /tmp/code/abc/Main.java 1 2 3',
    };
    expect(result).toEqual(expected);
  });

  it('Should create javascript context', () => {
    jest.spyOn(crypto, 'randomBytes').mockReturnValue('abc');

    const code = Base64.encode('console.log("hello world")');
    const input = Base64.encode('1 2 3');
    const language = 'javascript';
    const result = new ExecutorService().createContext(code, input, language);
    expected = {
      folder: '/tmp/code/abc',
      cmd: 'mkdir -p /tmp/code/abc/ && echo "console.log(\\"hello world\\")" > /tmp/code/abc/test.js && node /tmp/code/abc/test.js 1 2 3',
    };
    expect(result).toEqual(expected);
  });

  it('Should throw Error as language does not exist', () => {
    jest.spyOn(crypto, 'randomBytes').mockReturnValue('abc');

    const code = Base64.encode('System.out.println("hello world")');
    const input = Base64.encode('1 2 3');
    const language = 'doesNotExist';
    expect(() => {
      new ExecutorService().createContext(code, input, language);
    }).toThrow();
  });
  it('Should execute code and return output', async () => {
    const service = new ExecutorService();
    const expected = {
      memory: '0',
      stderr: '',
      stdout: '',
      time: null,
    };
    const mockData = {
      stdout: '',
      stderr: '',
    };
    jest.spyOn(service, 'executeShellCommand').mockResolvedValue(mockData);

    const code = Base64.encode('System.out.println("hello world")');
    const input = Base64.encode('1 2 3');
    const language = 'java';
    const result = await service.execute(code, input, language);

    expect(result).toEqual(expected);
  });
  it('Should change timeout limit to minimum allowed value if too low', async () => {
    const service = new ExecutorService();
    const expected = {
      memory: '0',
      stderr: '',
      stdout: '',
      time: null,
    };
    const mockData = {
      stdout: '',
      stderr: '',
    };
    jest.spyOn(service, 'executeShellCommand').mockResolvedValue(mockData);

    const code = Base64.encode('System.out.println("hello world")');
    const input = Base64.encode('1 2 3');
    const language = 'java';
    const maxTimeLimit = 2;
    const result = await service.execute(code, input, language, maxTimeLimit);

    expect(result).toEqual(expected);
  });
  it('Should not change timeout limit as it is above the allowed minimum', async () => {
    const service = new ExecutorService();
    const expected = {
      memory: '0',
      stderr: '',
      stdout: '',
      time: null,
    };
    const mockData = {
      stdout: '',
      stderr: '',
    };
    jest.spyOn(service, 'executeShellCommand').mockResolvedValue(mockData);

    const code = Base64.encode('System.out.println("hello world")');
    const input = Base64.encode('1 2 3');
    const language = 'java';
    const maxTimeLimit = 22;
    const result = await service.execute(
      code,
      input,
      language,
      maxTimeLimit
    );

    expect(result).toEqual(expected);
  });
  it('Should return True as stderr contains timeout error', () => {
    const stderr = 'hello world Command terminated by signal 15';
    const result = new ExecutorService().isTimeoutError(stderr);
    expect(result).toBeTruthy();
  });
  it('Should return False as stderr does not contain timeout error', () => {
    const stderr = 'hello world';
    const result = new ExecutorService().isTimeoutError(stderr);
    expect(result).toBeFalsy();
  });
});
