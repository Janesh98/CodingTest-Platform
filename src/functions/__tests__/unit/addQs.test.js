const { addQs } = require('../../controllers/question');
const CodingTestDB = require('../../models/CodingTestModel');
const QuestionsDB = require('../../models/QuestionsModel');
jest.mock('../../models/CodingTestModel');

describe('/questions', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  it('POST /, should add questions to coding test', async () => {
    let responseObject = {};
    let status = null;
    const mockData = { _id: '123' };
    await jest
      .spyOn(QuestionsDB.prototype, 'save')
      .mockReturnValue(Promise.resolve(mockData));
    const req = {
      body: {
        data: {
          googleId: '123',
          testName: '123',
          questions: ['who', 'what', 'where'],
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

    await addQs(req, res);
    expect(status).toBe(200);
    expect(responseObject).toEqual(expected);
  });
});
