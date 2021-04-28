let NewUserDB = require('../models/UserModel');
let CodingTestDB = require('../models/CodingTestModel');
let CodingChallengeDB = require('../models/CodingChallengeModel');
let QuestionsDB = require('../models/QuestionsModel');

exports.newTest = (req, res) => {
  const test = {
    googleId: req.body.data.googleId,
    testName: req.body.data.testName,
  };

  const googleId = test.googleId;
  const testName = test.testName;
  // Add test to MongoDB
  const newTestEntry = new CodingTestDB({
    googleId,
    testName,
  });

  newTestEntry.save(function (err, room) {
    const testId = room.id;
    NewUserDB.updateOne(
      { googleId: test.googleId },
      { $push: { codingTests: testId } },
      function (err, res) {
        if (err) throw err;
      }
    );
    return res.status(200).json({
      status: 'success',
      data: null,
    });
  });
};


exports.addQs = (req, res) => {
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

  newQuestionsEntry.save(function (err, room) {
    const questionsId = room.id;
    CodingTestDB.updateOne(
      { testName: Qs.testName },
      { $push: { questions: questionsId } },
      function (err, res) {
        if (err) throw err;
      }
    );
    return res.status(200).json({
      status: 'success',
      data: null,
    });
  });
};

exports.getTests = (req, res) => {
  const user = {
    googleId: req.body.data.googleId,
  };

  CodingTestDB.find(
    { googleId: user.googleId },
    { __v: 0, googleId: 0, questions: 0 },
    function (err, result) {
      if (err) throw err;
      return res.status(200).json({
        data: result,
      });
    }
  );
};

exports.getParticipants = (req, res) => {
  const test = {
    TestId: req.body.data.TestId,
  };

  ParticipantDB.find(
    { TestId: test.TestId },
    { __v: 0 },
    function (err, result) {
      if (err) throw err;
      return res.status(200).json({
        data: result,
      });
    }
  );
};

exports.getParticipantResults = (req, res) => {
  const participant = {
    _id: req.body.data._id,
  };

  ParticipantDB.find(
    { _id: participant._id },
    { __v: 0 },
    function (err, result) {
      if (err) throw err;
      return res.status(200).json({
        data: result,
      });
    }
  );
};


exports.getQuestions = (req, res) => {
  const user = {
    googleId: req.body.data.googleId,
    testName: req.body.data.testName,
  };

  QuestionsDB.find(
    { googleId: user.googleId, testName: user.testName },
    { __v: 0, googleId: 0, testName: 0 },
    function (err, result) {
      if (err) throw err;
      return res.status(200).json({
        data: result,
      });
    }
  );
};

exports.updateQuestions = (req, res) => {
  const Qs = {
    _id: req.body.data._id,
    questions: req.body.data.questions,
  };

  QuestionsDB.updateOne(
    { _id: Qs._id },
    {
      questions: Qs.questions,
    },
    function (err, res) {
      if (err) throw err;
    }
  );
  return res.status(200).json({
    status: 'success',
    data: null,
  });
};
