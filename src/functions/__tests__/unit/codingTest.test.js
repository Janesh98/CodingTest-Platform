const {
  getCodingTest,
  submitCodingTest,
} = require('../../controllers/codingTest');
const CodingTestDB = require('../../models/CodingTestModel');
const CodingChallengeDB = require('../../models/CodingChallengeModel');
const QuestionsDB = require('../../models/QuestionsModel');
const ParticipantDB = require('../../models/ParticipantsModel');
var mongoose = require('mongoose');
var id = mongoose.mongo.ObjectId('4eb6e7e7e9b7f4194e000001');

describe('/codingTest', () => {
  beforeEach(() => {});
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  it('POST /:codingTestId/:participantId, should return empty coding test with 200 OK', async () => {
    let responseObject = {};
    let status = null;
    const mockData = { challenges: [], questions: [] };
    await jest
      .spyOn(ParticipantDB, 'exists')
      .mockReturnValue(Promise.resolve(mockData));
    await jest
      .spyOn(ParticipantDB, 'findOne')
      .mockReturnValue(Promise.resolve(mockData));
    await jest
      .spyOn(CodingTestDB, 'findOne')
      .mockReturnValue(Promise.resolve(mockData));
    const req = {
      params: {
        codingTestId: id,
        participantId: id,
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
        challenges: null,
        questions: null,
      },
    };

    await getCodingTest(req, res);
    expect(status).toBe(200);
    expect(responseObject).toEqual(expected);
  });
  it('POST /:codingTestId/:participantId, should return coding test with 200 OK', async () => {
    let responseObject = {};
    let status = null;
    const mockData = {
      challenges: [{ data: 'test' }],
      questions: [{ data: 'test' }],
    };
    await jest
      .spyOn(ParticipantDB, 'exists')
      .mockReturnValue(Promise.resolve(mockData));
    await jest
      .spyOn(ParticipantDB, 'findOne')
      .mockReturnValue(Promise.resolve(mockData));
    await jest
      .spyOn(CodingChallengeDB, 'find')
      .mockReturnValue(Promise.resolve(mockData.challenges));
    await jest
      .spyOn(CodingTestDB, 'findOne')
      .mockReturnValue(Promise.resolve(mockData));
    await jest
      .spyOn(QuestionsDB, 'find')
      .mockReturnValue(Promise.resolve(mockData.questions));
    const req = {
      params: {
        codingTestId: id,
        participantId: id,
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
        challenges: mockData.challenges,
        questions: mockData.questions,
      },
    };

    await getCodingTest(req, res);
    expect(status).toBe(200);
    expect(responseObject).toEqual(expected);
  });
  it('POST /:codingTestId/:participantId, should catch Error and return 400', async () => {
    let responseObject = {};
    let status = null;
    const err = new Error('Error');
    await jest
      .spyOn(ParticipantDB, 'exists')
      .mockReturnValue(Promise.reject(err));
    const req = {
      params: {
        codingTestId: id,
        participantId: id,
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
      data: err.message,
    };

    await getCodingTest(req, res);
    expect(status).toBe(400);
    expect(responseObject).toEqual(expected);
  });
  it('POST /codingtest/submit, should submit coding test', async () => {
    let responseObject = {};
    let status = null;
    await jest
      .spyOn(ParticipantDB, 'findOneAndUpdate')
      .mockReturnValue(Promise.resolve({}));
    const req = {
      body: {
        data: {
          participantId: id,
          codingTestResults: [],
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

    await submitCodingTest(req, res);
    expect(status).toBe(200);
    expect(responseObject.data).toBeNull();
  });
  it('POST /codingtest/submit, should return 404 Error', async () => {
    let responseObject = {};
    let status = null;
    const err = new Error('failure');
    await jest
      .spyOn(ParticipantDB, 'findOneAndUpdate')
      .mockReturnValue(Promise.reject(err));
    const req = {
      body: {
        data: {
          participantId: id,
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

    await submitCodingTest(req, res);
    expect(status).toBe(400);
    expect(responseObject.data).toBe(err.message);
  });
});
