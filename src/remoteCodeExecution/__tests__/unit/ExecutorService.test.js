const ExecutorService = require('../../services/ExecutorService');
const Docker = require('dockerode');
const { Base64 } = require('js-base64');

describe('Create correct language context for Docker image and command', () => {
  it('Should create python context', () => {
    const code = Base64.encode('print("hello world")');
    const input = Base64.encode('1 2 3');
    const language = 'python';
    const result = new ExecutorService().createContext(code, input, language);
    expected = {
      image: 'python:3-alpine',
      cmd:
        'echo "print(\\"hello world\\")" > test.py && time -f \'MEM: %M\' python3 test.py 1 2 3',
    };
    expect(result).toEqual(expected);
  });
  it('Should create java context', () => {
    const code = Base64.encode('System.out.println("hello world")');
    const input = Base64.encode('1 2 3');
    const language = 'java';
    const result = new ExecutorService().createContext(code, input, language);
    expected = {
      image: 'openjdk:8-alpine',
      cmd:
        'echo "System.out.println(\\"hello world\\")" > Main.java && javac Main.java && time -f \'MEM: %M\' java Main 1 2 3',
    };
    expect(result).toEqual(expected);
  });
  it('Should throw Error as language does not exist', () => {
    const code = Base64.encode('System.out.println("hello world")');
    const input = Base64.encode('1 2 3');
    const language = 'doesNotExist';
    expect(() => {
      new ExecutorService().createContext(code, input, language);
    }).toThrow();
  });
  // it('Should execute code and return output', async () => {
  //   const mockData = [{}, {}, {}];
  //   jest.spyOn(Docker, 'run').mockResolvedValueOnce(mockData);
  //   const code = Base64.encode('System.out.println("hello world")');
  //   const input = Base64.encode('1 2 3');
  //   const language = 'java';
  //   const result = await new ExecutorService().execute(code, input, language);
  //   expect(result).toEqual({});
  // });
});
