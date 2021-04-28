// const ParticipantDB = require('../../models/ParticipantsModel');
const {
  getParticipants,
  getParticipantResults,
} = require('../../controllers/participant');

jest.mock('../../models/ParticipantsModel');

describe('/getParticipants', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  it('POST /, should return all participants', async () => {
    let responseObject = {};
    let status = null;
    const req = {
      body: {
        data: {
          TestId: '123',
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

    await getParticipants(req, res);
    expect(status).toBe(200);
    expect(responseObject).toEqual(expected);
  });
});

describe('/getParticipantResults', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  it('POST /, should return participant results', async () => {
    let responseObject = {};
    let status = null;
    const mockData = { valid: true, errors: false };
    const req = {
      body: {
        data: {
          _id: '123',
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

    await getParticipantResults(req, res);
    expect(status).toBe(200);
    expect(responseObject).toEqual(expected);
  });
});
