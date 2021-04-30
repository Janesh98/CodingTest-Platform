const { sendEmail } = require('../../controllers/email');
const ParticipantsDB = require('../../models/ParticipantsModel');
jest.mock('../../models/CodingTestModel');
const { db } = require('../../utilities/admin');

describe('/test', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  it('POST /, should send email', async () => {
    let responseObject = {};
    let status = null;
    const mockData = { _id: '123' };
    const adminMock = {
      add: jest.fn().mockImplementation(({ result }) => {
        return {};
      }),
    };
    await jest
      .spyOn(ParticipantsDB.prototype, 'save')
      .mockReturnValue(Promise.resolve(mockData));
    await jest.spyOn(db, 'collection').mockReturnValue(adminMock);
    const req = {
      body: {
        data: {
          email: 'test@gmail.com',
          googleId: '123',
          TestId: 'test123',
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
    };
    await sendEmail(req, res);
    expect(status).toBe(200);
    expect(responseObject).toEqual(expected);
  });
});
