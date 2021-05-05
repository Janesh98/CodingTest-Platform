const CodingTestDB = require('../models/CodingTestModel');
const CodingChallengeDB = require('../models/CodingChallengeModel');
const QuestionsDB = require('../models/QuestionsModel');
const ParticipantDB = require('../models/ParticipantsModel');

// returns coding test challenges and questions based on id url param
exports.getCodingTest = async (req, res) => {
  const codingTest = {
    challenges: null,
    questions: null,
    attemptedTest: false,
    timeLimit: 60,
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

    const attemptedOrNot = await ParticipantDB.findOne(
      { _id: participantId, TestId: codingTestId },
      { _id: 0, __v: 0, googleId: 0, codingTestResults: 0, questionResults: 0, TestId: 0, email: 0}
    );


    codingTest.attemptedTest = attemptedOrNot.attemptedTest;

    const codingTestIds = await CodingTestDB.findOne(
      { _id: codingTestId },
      { _id: 0, __v: 0, googleId: 0, createdAt: 0 }
    );

    codingTest.timeLimit = codingTestIds.timeLimit;

    if(!attemptedOrNot.timeStarted){
      await ParticipantDB.updateOne(
        { _id: participantId},
        {timeStarted: new Date()}
      )
    }else if(attemptedOrNot.timeStarted){
      var CurrentDate = new Date();
      codingTest.timeLimit = codingTest.timeLimit - ((CurrentDate.getTime() - attemptedOrNot.timeStarted.getTime())/1000)/60;
    }

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
