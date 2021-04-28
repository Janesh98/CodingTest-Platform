const QuestionsDB = require('../models/QuestionsModel');

exports.getQuestions = async (req, res) => {
  const user = {
    googleId: req.body.data.googleId,
    testName: req.body.data.testName,
  };

  const result = await QuestionsDB.find(
    { googleId: user.googleId, testName: user.testName },
    { __v: 0, googleId: 0, testName: 0 }
  );
  return res.status(200).json({
    data: result,
  });
};

exports.updateQuestions = async (req, res) => {
  const Qs = {
    _id: req.body.data._id,
    questions: req.body.data.questions,
  };

  await QuestionsDB.updateOne(
    { _id: Qs._id },
    {
      questions: Qs.questions,
    }
  );
  return res.status(200).json({
    status: 'success',
    data: null,
  });
};
