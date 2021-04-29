const { executeCode } = require('../../controllers/code');
const CodeService = require('../../services/CodeService');

describe('/code', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('POST /, Execute Code in Python', async () => {
    let responseObject = {};
    let status = null;
    const mockData = { data: { data: 'hello world' } };
    await jest.spyOn(CodeService, 'submitCode').mockImplementation(async () => {
      return mockData;
    });
    const req = {
      body: {
        data: {
          code: 'print("hello world")',
          language: 'python',
          stdin: '1 2 3 4 5',
        },
      },
    };
    const res = {
      status: jest.fn().mockImplementation((result) => {
        status = result;
        return {
          json: jest.fn().mockImplementation((result) => {
            responseObject = result;
          }),
        };
      }),
    };

    await executeCode(req, res);
    expect(status).toBe(200);
    expect(responseObject).toEqual(mockData);
  });
});
