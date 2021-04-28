const {
  deleteTest,
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
      .mockReturnValue(Promise.resolve(newMockData,{ $pull: { codingTests: test._id } }));
    const req = {
      body: {
        data: { googleId: id, testName: id,}
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

    await deleteTest(req, res);
    expect(status).toBe(200);
  });

});