const {
  newChallenge,
  updateChallenge,
  getChallenges,
} = require('../../controllers/challenges');
const CodingTestDB = require('../../models/CodingTestModel');
const CodingChallengeDB = require('../../models/CodingChallengeModel');
var mongoose = require('mongoose');
var id = mongoose.mongo.ObjectId('4eb6e7e7e9b7f4194e000001');

describe('/newChallenge', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  it('POST /, should post a new challenge', async () => {
    let responseObject = {};
    let status = null;
    const mockData = { _id: '123' };
    await jest
      .spyOn(CodingChallengeDB.prototype, 'save')
      .mockReturnValue(Promise.resolve(mockData));
    const req = {
      body: {
        data: {
          googleId: '123',
          testName: 'the test',
          title: 'test title',
          problemDescription: 'test prob',
          inputFormat: '1 2 3',
          returnFormat: '5',
          constraints: '1 < n < 10',
          sampleInput: '1 2 3',
          sampleOutput: '5',
          exampleExplanation: 'test example',
          testInput1: 1,
          testOutput1: 1,
          testInput2: 2,
          testOutput2: 2,
          testInput3: 3,
          testOutput3: 3,
          testInput4: 4,
          testOutput4: 4,
          testInput5: 5,
          testOutput5: 5,
          testInput6: 6,
          testOutput6: 6,
          testInput7: 7,
          testOutput7: 7,
          testInput8: 8,
          testOutput8: 8,
          testInput9: 9,
          testOutput9: 9,
          testInput10: 10,
          testOutput10: 10,
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

    await newChallenge(req, res);
    expect(status).toBe(200);
    expect(responseObject).toEqual(expected);
  });
});

describe('/updateChallenge', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  it('POST /, should update challenge', async () => {
    let responseObject = {};
    let status = null;
    const req = {
      body: {
        data: {
          _id: id,
          googleId: '123',
          testName: 'the test',
          title: 'test title',
          problemDescription: 'test prob',
          inputFormat: '1 2 3',
          returnFormat: '5',
          constraints: '1 < n < 10',
          sampleInput: '1 2 3',
          sampleOutput: '5',
          exampleExplanation: 'test example',
          testInput1: 1,
          testOutput1: 1,
          testInput2: 2,
          testOutput2: 2,
          testInput3: 3,
          testOutput3: 3,
          testInput4: 4,
          testOutput4: 4,
          testInput5: 5,
          testOutput5: 5,
          testInput6: 6,
          testOutput6: 6,
          testInput7: 7,
          testOutput7: 7,
          testInput8: 8,
          testOutput8: 8,
          testInput9: 9,
          testOutput9: 9,
          testInput10: 10,
          testOutput10: 10,
        },
      },
    };

    await jest.spyOn(CodingChallengeDB, 'updateOne').mockReturnValue(
      Promise.resolve(
        { _id: req.body.data._id },
        {
          title: req.body.data.title,
          problemDescription: req.body.data.problemDescription,
          inputFormat: req.body.data.inputFormat,
          returnFormat: req.body.data.returnFormat,
          constraints: req.body.data.constraints,
          sampleInput: req.body.data.sampleInput,
          sampleOutput: req.body.data.sampleOutput,
          exampleExplanation: req.body.data.exampleExplanation,
          testInput1: req.body.data.testInput1,
          testOutput1: req.body.data.testOutput1,
          testInput2: req.body.data.testInput2,
          testOutput2: req.body.data.testOutput2,
          testInput3: req.body.data.testInput3,
          testOutput3: req.body.data.testOutput3,
          testInput4: req.body.data.testInput4,
          testOutput4: req.body.data.testOutput4,
          testInput5: req.body.data.testInput5,
          testOutput5: req.body.data.testOutput5,
          testInput6: req.body.data.testInput6,
          testOutput6: req.body.data.testOutput6,
          testInput7: req.body.data.testInput7,
          testOutput7: req.body.data.testOutput7,
          testInput8: req.body.data.testInput8,
          testOutput8: req.body.data.testOutput8,
          testInput9: req.body.data.testInput9,
          testOutput9: req.body.data.testOutput9,
          testInput10: req.body.data.testInput10,
          testOutput10: req.body.data.testOutput10,
          testCases: [
            {
              input: '0',
              output: '0',
            },
          ],
        }
      )
    );

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

    await updateChallenge(req, res);
    expect(status).toBe(200);
    expect(responseObject).toEqual(expected);
  });
});

describe('/getChallenges', () => {
  beforeEach(() => {});
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('POST get challenges, should return challegnes with 200 OK', async () => {
    let responseObject = {};
    let status = null;
    const mockData = { googleId: id, testName: 'test name' };
    await jest
      .spyOn(CodingTestDB, 'find')
      .mockReturnValue(
        Promise.resolve(
          { googleId: mockData.googleId, testName: mockData.testName },
          { __v: 0, googleId: 0, testName: 0 }
        )
      );
    const req = {
      body: {
        data: { googleId: id, testName: 'test name' },
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

    const expected = {};

    await getChallenges(req, res);
    expect(responseObject).toEqual(expected);
  });
});
