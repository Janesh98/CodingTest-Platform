let NewUserDB = require('../models/UserModel');
const config = require('../config/config');
let CodingTestDB = require('../models/CodingTestModel');
let CodingChallengeDB = require('../models/CodingChallengeModel');
let QuestionsDB = require('../models/QuestionsModel');

// const firebase = require('firebase');
// firebase.initializeApp(config);

const {
  validateRegistrationData,
  validateLoginData,
} = require('../utilities/validation');

exports.register = (req, res) => {
  const newUser = {
    email: req.body.data.email,
    googleId: req.body.data.googleId,
  };

  const { valid, errors } = validateRegistrationData(newUser);

  if (!valid) return res.status(400).json(errors);

  // Register user
  const googleId = newUser.googleId;
  const email = newUser.email;
  // Add user to MongoDB
  const newUserEntry = new NewUserDB({
    email,
    googleId,
  });
  newUserEntry.save();
  return res.status(201).json({
    googleId,
    data: null,
  });
};

exports.company = (req, res) => {
  NewUserDB.find(
    { company: { $ne: null } },
    { _id: 0, company: 1 },
    function (err, result) {
      if (err) throw err;
      // need to return data as key in response for firebase functions
      return res.status(200).json({
        status: 'success',
        data: result,
      });
    }
  );
};

exports.addCompany = (req, res) => {
  const newCompany = {
    googleId: req.body.data.googleId,
    company: req.body.data.company,
  };
  var query = { googleId: newCompany.googleId };

  NewUserDB.find(
    { googleId: newCompany.googleId },
    { _id: 0, googleId: 1 },
    function (err, result) {
      if (err) throw err;

      if (result.length == 0) {
        return res.status(200).json({
          googleId: 'Account for googleId does not exist',
        });
      } else {
        var companyToBeAdded = { $set: { company: newCompany.company } };
        NewUserDB.updateOne(query, companyToBeAdded, function (err, res) {
          if (err) throw err;
        });
        return res.status(200).send({
          status: 'success',
          data: null,
        });
      }
    }
  );
};

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

exports.newChallenge = (req, res) => {
  const challenge = {
    googleId: req.body.data.googleId,
    testName: req.body.data.testName,
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
  };

  const googleId = challenge.googleId;
  const testName = challenge.testName;
  const title = challenge.title;
  const problemDescription = challenge.problemDescription;
  const inputFormat = challenge.inputFormat;
  const returnFormat = challenge.returnFormat;
  const constraints = challenge.constraints;
  const sampleInput = challenge.sampleInput;
  const sampleOutput = challenge.sampleOutput;
  const exampleExplanation = challenge.exampleExplanation;
  const testInput1 = challenge.testInput1;
  const testOutput1 = challenge.testOutput1;
  const testInput2 = challenge.testInput2;
  const testOutput2 = challenge.testOutput2;
  const testInput3 = challenge.testInput3;
  const testOutput3 = challenge.testOutput3;
  const testInput4 = challenge.testInput4;
  const testOutput4 = challenge.testOutput4;
  const testInput5 = challenge.testInput5;
  const testOutput5 = challenge.testOutput5;

  // Add CHallenge to MongoDB
  const newChallengeEntry = new CodingChallengeDB({
    googleId,
    testName,
    title,
    problemDescription,
    inputFormat,
    returnFormat,
    constraints,
    sampleInput,
    sampleOutput,
    exampleExplanation,
    testInput1,
    testOutput1,
    testInput2,
    testOutput2,
    testInput3,
    testOutput3,
    testInput4,
    testOutput4,
    testInput5,
    testOutput5,
  });

  newChallengeEntry.save(function (err, room) {
    const challengeId = room.id;
    CodingTestDB.updateOne(
      { testName: challenge.testName },
      { $push: { challenges: challengeId } },
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
    question1: req.body.data.question1,
    question2: req.body.data.question2,
    question3: req.body.data.question3,
  };

  const googleId = Qs.googleId;
  const testName = Qs.testName;
  const question1 = Qs.question1;
  const question2 = Qs.question2;
  const question3 = Qs.question3;

  const newQuestionsEntry = new QuestionsDB({
    googleId,
    testName,
    question1,
    question2,
    question3,
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
    { _id: 0, __v: 0, challenges: 0, googleId: 0 },
    function (err, result) {
      if (err) throw err;
      return res.status(200).json({
        data: result,
      });
    }
  );
};
