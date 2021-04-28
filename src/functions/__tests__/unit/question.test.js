const { getQuestions, updateQuestions } = require('../../controllers/question');

jest.mock('../../models/QuestionsModel');

describe('/getQuestions', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  it('POST /, should return questions for particular coding challenge', async () => {
    let responseObject = {};
    let status = null;
    const req = {
      body: {
        data: {
          googleId: '123',
          testName: '123',
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

    const expected = {
      data: undefined,
    };

    await getQuestions(req, res);
    expect(status).toBe(200);
    expect(responseObject).toEqual(expected);
  });
});
describe('/getQuestions', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  it('POST /, should return questions for particular coding challenge', async () => {
    let responseObject = {};
    let status = null;
    const req = {
      body: {
        data: {
          googleId: '123',
          testName: '123',
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

    const expected = {
      data: null,
      status: 'success',
    };

    await updateQuestions(req, res);
    expect(status).toBe(200);
    expect(responseObject).toEqual(expected);
  });
});
