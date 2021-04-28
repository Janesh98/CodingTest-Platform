const { register, checkRegister } = require('../../controllers/register');
var { validateRegistrationData } = require('../../utilities/validation');
const NewUserDB = require('../../models/UserModel');

jest.mock('../../models/UserModel');

describe('/register', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  it('POST /, should validate and register a user', async () => {
    let responseObject = {};
    let status = null;
    const mockData = { valid: true, errors: false };
    validateRegistrationData = jest.fn(() => {
      return mockData;
    });
    const req = {
      body: {
        data: {
          email: 'test@gmail.com',
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
      data: null,
      googleId: req.body.data.googleId,
    };

    await register(req, res);
    expect(status).toBe(201);
    expect(responseObject).toEqual(expected);
  });
});

describe('/checkRegister', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  it('POST /, should fail as user is not registered', async () => {
    let responseObject = {};
    let status = null;
    const mockData = { valid: true, errors: false };
    validateRegistrationData = jest.fn(() => {
      return mockData;
    });
    const req = {
      body: {
        data: {
          email: 'test@gmail.com',
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
      status: 'failed',
      data: `${req.body.data.email} is not registered`,
    };

    await checkRegister(req, res);
    expect(status).toBe(403);
    expect(responseObject).toEqual(expected);
  });
  it('POST /, should check if user is registered', async () => {
    let responseObject = {};
    let status = null;
    const mockData = true;
    await jest
      .spyOn(NewUserDB, 'find')
      .mockReturnValue(Promise.resolve(mockData));
    validateRegistrationData = jest.fn(() => {
      return mockData;
    });
    const req = {
      body: {
        data: {
          email: 'test@gmail.com',
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
      status: 'success',
      data: true,
    };

    await checkRegister(req, res);
    expect(status).toBe(200);
    expect(responseObject).toEqual(expected);
  });
});
