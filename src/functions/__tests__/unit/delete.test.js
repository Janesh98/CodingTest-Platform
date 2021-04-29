const {
  deleteTest,
  deleteChallenge,
  deleteQuestions,
  deleteUserData,
  resetTest
} = require('../../controllers/delete');
const CodingTestDB = require('../../models/CodingTestModel');
const CodingChallengeDB = require('../../models/CodingChallengeModel');
const QuestionsDB = require('../../models/QuestionsModel');
const ParticipantDB = require('../../models/ParticipantsModel');
const NewUserDB = require('../../models/UserModel');
var mongoose = require('mongoose');
var id = mongoose.mongo.ObjectId('4eb6e7e7e9b7f4194e000001');


describe('/deleteTest', () => {
  beforeEach(() => {});
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

it('POST delete test, should return 200 OK', async () => {
    let responseObject = {};
    let status = null;
    const mockData = { googleId: id, testName: id, };
    await jest
      .spyOn(CodingTestDB, 'deleteOne')
      .mockReturnValue(Promise.resolve(mockData));
    await jest
      .spyOn(CodingChallengeDB, 'deleteMany')
      .mockReturnValue(Promise.resolve(mockData));
    await jest
      .spyOn(QuestionsDB, 'deleteMany')
      .mockReturnValue(Promise.resolve(mockData));
    const newMockData = { googleId: id };
    await jest
      .spyOn(ParticipantDB, 'deleteMany')
      .mockReturnValue(Promise.resolve(newMockData));
    await jest
      .spyOn(ParticipantDB, 'deleteMany')
      .mockReturnValue(Promise.resolve(newMockData));
    await jest
      .spyOn(NewUserDB, 'updateOne')
      .mockReturnValue(Promise.resolve(newMockData,{ $pull: { codingTests: id } }));
    const req = {
      body: {
        data: { googleId: id, testName: id, _id: id, }
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
      data: null
    };

    await deleteTest(req, res);
    expect(status).toBe(200);
    expect(responseObject).toEqual(expected);
  });

});

describe('/deleteChallenge', () => {
  beforeEach(() => {});
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

it('POST delete challenge, should return 200 OK', async () => {
    let responseObject = {};
    let status = null;
    const mockData = { googleId: id, testName: id, title: 'hello world!'};
    await jest
      .spyOn(CodingChallengeDB, 'deleteOne')
      .mockReturnValue(Promise.resolve(mockData));

    const newMockData = { googleId: id, testName: id, };
    await jest
      .spyOn(CodingTestDB, 'updateOne')
      .mockReturnValue(Promise.resolve(newMockData,{ $pull: { challenges: id } }));
    const req = {
      body: {
        data: { googleId: id, testName: id, title: "hello world!", _id: id,}
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
      data: null
    };

    await deleteChallenge(req, res);
    expect(status).toBe(200);
    expect(responseObject).toEqual(expected);
  });

});

describe('/deleteQuestions', () => {
  beforeEach(() => {});
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

it('POST delete questions, should return 200 OK', async () => {
    let responseObject = {};
    let status = null;
    const mockData = { googleId: id, testName: id };
    await jest
      .spyOn(QuestionsDB, 'deleteOne')
      .mockReturnValue(Promise.resolve(mockData));
    await jest
      .spyOn(CodingTestDB, 'updateOne')
      .mockReturnValue(Promise.resolve(mockData,{ $pull: { questions: id } }));
    const req = {
      body: {
        data: { googleId: id, testName: id, _id: id,}
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
      data: null
    };

    await deleteQuestions(req, res);
    expect(status).toBe(200);
    expect(responseObject).toEqual(expected);
  });

});

describe('/deleteUserData', () => {
  beforeEach(() => {});
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

it('POST delete user data, should return 200 OK', async () => {
    let responseObject = {};
    let status = null;
    const mockData = { googleId: id, };
    await jest
      .spyOn(NewUserDB, 'deleteOne')
      .mockReturnValue(Promise.resolve(mockData));
    await jest
      .spyOn(CodingTestDB, 'deleteMany')
      .mockReturnValue(Promise.resolve(mockData));
    await jest
      .spyOn(CodingChallengeDB, 'deleteMany')
      .mockReturnValue(Promise.resolve(mockData));
    await jest
      .spyOn(QuestionsDB, 'deleteMany')
      .mockReturnValue(Promise.resolve(mockData));
    await jest
      .spyOn(ParticipantDB, 'deleteMany')
      .mockReturnValue(Promise.resolve(mockData));
    const req = {
      body: {
        data: { googleId: id,}
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
      data: null
    };

    await deleteUserData(req, res);
    expect(status).toBe(200);
    expect(responseObject).toEqual(expected);
  });

});

describe('/resetTest', () => {
  beforeEach(() => {});
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

it('POST reset test, should return 200 OK', async () => {
    let responseObject = {};
    let status = null;
    const mockData = { TestId: id, };
    await jest
      .spyOn(ParticipantDB, 'deleteMany')
      .mockReturnValue(Promise.resolve(mockData));
    await jest
      .spyOn(CodingTestDB, 'updateOne')
      .mockReturnValue(Promise.resolve(mockData,{ participants: [],}));
    const req = {
      body: {
        data: { TestId: id,}
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
      data: null
    };

    await resetTest(req, res);
    expect(status).toBe(200);
    expect(responseObject).toEqual(expected);
  });

});