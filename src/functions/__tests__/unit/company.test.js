const { company, addCompany } = require('../../controllers/company');
const NewUserDB = require('../../models/UserModel');

describe('/company', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  it('POST /all, should return all companies', async () => {
    let responseObject = {};
    let status = null;
    const mockData = { data: ['company1', 'company2'] };
    await jest
      .spyOn(NewUserDB, 'find')
      .mockReturnValue(Promise.resolve(mockData));
    const req = {};
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
      data: mockData,
    };

    await company(req, res);
    expect(status).toBe(200);
    expect(responseObject).toEqual(expected);
  });
  it('POST /all, should return 404 Error', async () => {
    let responseObject = {};
    let status = null;
    const mockData = null;
    await jest
      .spyOn(NewUserDB, 'find')
      .mockReturnValue(Promise.resolve(mockData));
    const req = {};
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
      data: 'No companies available',
      status: 'failed',
    };

    await company(req, res);
    expect(status).toBe(404);
    expect(responseObject).toEqual(expected);
  });
  it('POST /, should add company', async () => {
    let responseObject = {};
    let status = null;
    const mockData = { data: ['company1', 'company2'] };
    await jest
      .spyOn(NewUserDB, 'find')
      .mockReturnValue(Promise.resolve(mockData));
    await jest
      .spyOn(NewUserDB, 'updateOne')
      .mockReturnValue(Promise.resolve(mockData));
    const req = {
      body: {
        data: { googleId: '123', company: 'spaceX' },
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
      data: null,
    };

    await addCompany(req, res);
    expect(status).toBe(200);
    expect(responseObject).toEqual(expected);
  });
  it('POST /, should return 404 Error as google id does not exist', async () => {
    let responseObject = {};
    let status = null;
    const mockData = [];
    await jest
      .spyOn(NewUserDB, 'find')
      .mockReturnValue(Promise.resolve(mockData));
    await jest
      .spyOn(NewUserDB, 'updateOne')
      .mockReturnValue(Promise.resolve(mockData));
    const req = {
      body: {
        data: { googleId: '123', company: 'spaceX' },
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
      data: 'Account for googleId does not exist',
    };

    await addCompany(req, res);
    expect(status).toBe(404);
    expect(responseObject).toEqual(expected);
  });
});
