const CodingTestDB = require('../models/CodingTestModel');
const CodingChallengeDB = require('../models/CodingChallengeModel');
const QuestionsDB = require('../models/QuestionsModel');
const ParticipantDB = require('../models/ParticipantsModel');

// returns coding test challenges and questions based on id url param
exports.getCodingTest = async (req, res) => {
  const codingTest = {
    challenges: null,
    questions: null,
  };

  try {
    const codingTestId = req.params.codingTestId;
    const participantId = req.params.participantId;

    // check if paricipant exists and has permission to access coding test.
    await ParticipantDB.exists(
      {
        _id: participantId,
        TestId: codingTestId,
      },
      async (error, result) => {
        if (!result) {
          return await res.status(400).json({
            data: 'Bad request, the url provided is not valid',
          });
        }
      }
    );

    const codingTestIds = await CodingTestDB.findOne(
      { _id: codingTestId },
      { _id: 0, __v: 0, googleId: 0, createdAt: 0 }
    );

    if (codingTestIds.challenges.length !== 0) {
      codingTest.challenges = await CodingChallengeDB.find(
        {
          _id: { $in: codingTestIds.challenges },
        },
        { _id: 0, testName: 0, googleId: 0, createdAt: 0, __v: 0 }
      );
    }

    if (codingTestIds.questions.length !== 0) {
      codingTest.questions = await QuestionsDB.find(
        {
          _id: { $in: codingTestIds.questions },
        },
        { _id: 0, testName: 0, googleId: 0, createdAt: 0, __v: 0 }
      );
    }

    return await res.status(200).json({
      data: codingTest,
    });
  } catch (err) {
    return await res.status(400).json({
      data: err.message,
    });
  }
};

exports.submitCodingTest = async (req, res) => {
  try {
    const id = req.body.data.participantId;
    const codingTestResults = req.body.data.codingTestResults;
    const attemptedTest = true;

    const filter = { _id: id };
    const update = { codingTestResults, attemptedTest };
    await ParticipantDB.findOneAndUpdate(filter, update);
    return res.status(200).json({
      data: null,
    });
  } catch (err) {
    return await res.status(400).json({
      data: err.message,
    });
  }
};
