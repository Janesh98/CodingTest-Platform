const CodingTestDB = require('../models/CodingTestModel');
const CodingChallengeDB = require('../models/CodingChallengeModel');
const QuestionsDB = require('../models/QuestionsModel');
const ParticipantDB = require('../models/ParticipantsModel');
const NewUserDB = require('../models/UserModel');
const mongoose = require('mongoose');

exports.deleteTest = async (req, res) => {
  const test = {
    googleId: req.body.data.googleId,
    testName: req.body.data.testName,
    _id: req.body.data._id,
  };

  var query = {
    googleId: test.googleId,
    testName: test.testName,
  };
  await CodingTestDB.deleteOne(query);

  await CodingChallengeDB.deleteMany(query);

  await QuestionsDB.deleteMany(query);

  var newQuery = {
    googleId: test.googleId,
  };

  await ParticipantDB.deleteMany(newQuery);

  await NewUserDB.updateOne(
    { googleId: test.googleId },
    { $pull: { codingTests: mongoose.Types.ObjectId(test._id) } });
  return res.status(200).json({
    data: null,
  });
};

exports.deleteChallenge = async (req, res) => {
  const challenge = {
    googleId: req.body.data.googleId,
    testName: req.body.data.testName,
    title: req.body.data.title,
    _id: req.body.data._id,
  };

  var query = {
    googleId: challenge.googleId,
    testName: challenge.testName,
    title: challenge.title,
  };
  await CodingChallengeDB.deleteOne(query);
  await CodingTestDB.updateOne(
    { googleId: challenge.googleId, testName: challenge.testName },
    { $pull: { challenges: mongoose.Types.ObjectId(challenge._id) } });

  return res.status(200).json({
    data: null,
  });
};

exports.deleteQuestions = async (req, res) => {
  const questions = {
    googleId: req.body.data.googleId,
    testName: req.body.data.testName,
    _id: req.body.data._id,
  };

  var query = {
    googleId: questions.googleId,
    testName: questions.testName,
  };

  await QuestionsDB.deleteOne(query);
  await CodingTestDB.updateOne(
    { googleId: questions.googleId, testName: questions.testName },
    { $pull: { questions: mongoose.Types.ObjectId(questions._id) } });

  return res.status(200).json({
    data: null,
  });
};

exports.deleteUserData = async (req, res) => {
  const user = {
    googleId: req.body.data.googleId,
  };

  var query = {
    googleId: user.googleId,
  };

  await NewUserDB.deleteOne(query);

  await CodingTestDB.deleteMany(query);

  await CodingChallengeDB.deleteMany(query);

  await QuestionsDB.deleteMany(query);

  await ParticipantDB.deleteMany(query);

  return res.status(200).json({
    data: null,
  });
};

exports.resetTest = async (req, res) => {
  const test = {
    TestId: req.body.data._id,
  };

  var query = {
    TestId: test.TestId,
  };

  await ParticipantDB.deleteMany(query);
  await CodingTestDB.updateOne(
    { _id: test.TestId },
    {
      participants: [],
    },
  );
  return res.status(200).json({
    data: null,
  });
};