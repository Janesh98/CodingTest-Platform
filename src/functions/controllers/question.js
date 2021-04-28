const QuestionsDB = require('../models/QuestionsModel');
const CodingTestDB = require('../models/CodingTestModel');

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

exports.addQs = async (req, res) => {
  const Qs = {
    googleId: req.body.data.googleId,
    testName: req.body.data.testName,
    questions: req.body.data.questions,
  };

  const googleId = Qs.googleId;
  const testName = Qs.testName;
  const questions = Qs.questions;

  const newQuestionsEntry = new QuestionsDB({
    googleId,
    testName,
    questions,
  });

  const result = await newQuestionsEntry.save();
  const questionsId = result._id;
  await CodingTestDB.updateOne(
    { testName: Qs.testName },
    { $push: { questions: questionsId } }
  );
  return res.status(200).json({
    status: 'success',
    data: null,
  });
};
