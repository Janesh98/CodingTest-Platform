const { newTest, getTests } = require('../../controllers/Test');
const CodingTestDB = require('../../models/CodingTestModel');
jest.mock('../../models/UserModel');

describe('/test', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  it('POST /, should add test to coding challenge', async () => {
    let responseObject = {};
    let status = null;
    const mockData = { _id: '123' };
    await jest
      .spyOn(CodingTestDB.prototype, 'save')
      .mockReturnValue(Promise.resolve(mockData));
    const req = {
      body: {
        data: {
          googleId: '123',
          testName: 'test123',
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

    await newTest(req, res);
    expect(status).toBe(200);
    expect(responseObject).toEqual(expected);
  });
});
describe('/tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  it('POST /, should return coding challenge tests', async () => {
    let responseObject = {};
    let status = null;
    const mockData = { tests: [{}, {}, {}] };
    await jest
      .spyOn(CodingTestDB, 'find')
      .mockReturnValue(Promise.resolve(mockData));
    const req = {
      body: {
        data: {
          googleId: '123',
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
      data: {
        tests: mockData.tests,
      },
    };

    await getTests(req, res);
    expect(status).toBe(200);
    expect(responseObject).toEqual(expected);
  });
});
