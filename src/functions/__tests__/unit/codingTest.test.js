const { getCodingTest } = require('../../controllers/codingTest');
const CodingTestDB = require('../../models/CodingTestModel');
const CodingChallengeDB = require('../../models/CodingChallengeModel');
const QuestionsDB = require('../../models/QuestionsModel');
const ParticipantDB = require('../../models/ParticipantsModel');
var mongoose = require('mongoose');
var id = mongoose.mongo.ObjectId('4eb6e7e7e9b7f4194e000001');

jest.setTimeout(30000);

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
  // it('POST /:codingTestId/:participantId, should return coding test with 200 OK', async () => {
  //   let responseObject = {};
  //   let status = null;
  //   const mockData = { challenges: [{}, {}, {}], questions: [{}, {}, {}] };
  //   await jest
  //     .spyOn(ParticipantDB, 'exists')
  //     .mockReturnValue(Promise.resolve(mockData));
  //   await jest
  //     .spyOn(CodingChallengeDB, 'find')
  //     .mockReturnValue(Promise.resolve(mockData));
  //   await jest
  //     .spyOn(CodingTestDB, 'findOne')
  //     .mockReturnValue(Promise.resolve(mockData));
  //   await jest
  //     .spyOn(QuestionsDB, 'find')
  //     .mockReturnValue(Promise.resolve(mockData));
  //   const req = {
  //     params: {
  //       codingTestId: id,
  //       participantId: id,
  //     },
  //   };
  //   const res = {
  //     status: jest.fn().mockImplementation((result) => {
  //       status = result;
  //       return {
  //         json: jest.fn().mockImplementation((result) => {
  //           responseObject = result;
  //         }),
  //       };
  //     }),
  //   };

  //   const expected = {
  //     data: {
  //       challenges: null,
  //       questions: null,
  //     },
  //   };

  //   await getCodingTest(req, res);
  //   expect(status).toBe(200);
  //   expect(responseObject).toEqual(expected);
  // });
  it('POST /:codingTestId/:participantId, should catch Error and return 404', async () => {
    let responseObject = {};
    let status = null;
    const mockData = { data: { data: 'hello world' } };
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

    await getCodingTest(req, res);
    expect(status).toBe(400);
    expect(responseObject).toBeTruthy();
  });
});
