const submissionQueue = require('../../config/queueSetup');
const {
  addSubmission,
  getSubmission,
} = require('../../controllers/submission');

describe('/submission', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('GET /, Add Submission', async () => {
    let responseObject = {};
    const mockData = { id: 123 };
    jest.spyOn(submissionQueue, 'add').mockResolvedValueOnce(mockData);
    const req = { body: { data: {} } };
    const res = {
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
    };
    await addSubmission(req, res);
    expect(responseObject).toEqual(mockData);
  });

  it('GET /:id, Get Submission, status completed', async () => {
    let responseObject = {};
    const mockData = {
      getState: jest.fn().mockImplementation(() => {
        return 'completed';
      }),
      _progress: 'completed',
      failedReason: '',
      data: {},
    };
    jest.spyOn(submissionQueue, 'getJob').mockResolvedValueOnce(mockData);
    const req = { params: { id: 123 } };
    const res = {
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
    };
    const expected = {
      id: req.params.id,
      progress: 'completed',
      reason: '',
      state: 'completed',
      data: {},
    };
    await getSubmission(req, res);
    expect(responseObject).toEqual(expected);
  });
  it('GET /:id, Get Submission, status waiting', async () => {
    let responseObject = {};
    const mockData = {
      getState: jest.fn().mockImplementation(() => {
        return 'waiting';
      }),
      _progress: 'waiting',
      failedReason: '',
      data: {},
    };
    jest.spyOn(submissionQueue, 'getJob').mockResolvedValueOnce(mockData);
    const req = { params: { id: 123 } };
    const res = {
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
    };
    const expected = {
      id: req.params.id,
      progress: 'waiting',
      reason: '',
      state: 'waiting',
      data: null,
    };
    await getSubmission(req, res);
    expect(responseObject).toEqual(expected);
  });
  it('GET /:id, Get Submission, does not exist', async () => {
    let responseObject = {};
    let status = null;
    jest.spyOn(submissionQueue, 'getJob').mockResolvedValueOnce(null);
    const req = { params: { id: 123 } };
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
      data: { error: `Submission with id ${req.params.id} does not exist` },
    };
    await getSubmission(req, res);
    expect(status).toBe(404);
    expect(responseObject).toEqual(expected);
  });
});
