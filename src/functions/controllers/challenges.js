const NewUserDB = require('../models/UserModel');
const CodingTestDB = require('../models/CodingTestModel');
const CodingChallengeDB = require('../models/CodingChallengeModel');
const QuestionsDB = require('../models/QuestionsModel');
const ParticipantDB = require('../models/ParticipantsModel');

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
  const testInput6 = challenge.testInput6;
  const testOutput6 = challenge.testOutput6;
  const testInput7 = challenge.testInput7;
  const testOutput7 = challenge.testOutput7;
  const testInput8 = challenge.testInput8;
  const testOutput8 = challenge.testOutput8;
  const testInput9 = challenge.testInput9;
  const testOutput9 = challenge.testOutput9;
  const testInput10 = challenge.testInput10;
  const testOutput10 = challenge.testOutput10;

  const unfilteredTestCases = [
    {
      input: testInput1,
      output: testOutput1,
    },
    {
      input: testInput2,
      output: testOutput2,
    },
    {
      input: testInput3,
      output: testOutput3,
    },
    {
      input: testInput4,
      output: testOutput4,
    },
    {
      input: testInput5,
      output: testOutput5,
    },
    {
      input: testInput6,
      output: testOutput6,
    },
    {
      input: testInput7,
      output: testOutput7,
    },
    {
      input: testInput8,
      output: testOutput8,
    },
    {
      input: testInput9,
      output: testOutput9,
    },
    {
      input: testInput10,
      output: testOutput10,
    },
  ];

  var testCases = unfilteredTestCases.filter(function (el) {
    return el.input != '';
  });

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
    testInput6,
    testOutput6,
    testInput7,
    testOutput7,
    testInput8,
    testOutput8,
    testInput9,
    testOutput9,
    testInput10,
    testOutput10,
    testCases,
  });

  newChallengeEntry.save(function (err, room) {
    const challengeId = room.id;
    CodingTestDB.updateOne(
      { testName: challenge.testName },
      { $push: { challenges: challengeId } });
  });
  return res.status(200).json({
      data: null,
    });
};

exports.updateChallenge = (req, res) => {
  const challenge = {
    _id: req.body.data._id,
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
  };

  const unfilteredTestCases = [
    {
      input: challenge.testInput1,
      output: challenge.testOutput1,
    },
    {
      input: challenge.testInput2,
      output: challenge.testOutput2,
    },
    {
      input: challenge.testInput3,
      output: challenge.testOutput3,
    },
    {
      input: challenge.testInput4,
      output: challenge.testOutput4,
    },
    {
      input: challenge.testInput5,
      output: challenge.testOutput5,
    },
    {
      input: challenge.testInput6,
      output: challenge.testOutput6,
    },
    {
      input: challenge.testInput7,
      output: challenge.testOutput7,
    },
    {
      input: challenge.testInput8,
      output: challenge.testOutput8,
    },
    {
      input: challenge.testInput9,
      output: challenge.testOutput9,
    },
    {
      input: challenge.testInput10,
      output: challenge.testOutput10,
    },
  ];

  var testCases = unfilteredTestCases.filter(function (el) {
    return el.input != '';
  });

  CodingChallengeDB.updateOne(
    { _id: challenge._id },
    {
      title: challenge.title,
      problemDescription: challenge.problemDescription,
      inputFormat: challenge.inputFormat,
      returnFormat: challenge.returnFormat,
      constraints: challenge.constraints,
      sampleInput: challenge.sampleInput,
      sampleOutput: challenge.sampleOutput,
      exampleExplanation: challenge.exampleExplanation,
      testInput1: challenge.testInput1,
      testOutput1: challenge.testOutput1,
      testInput2: challenge.testInput2,
      testOutput2: challenge.testOutput2,
      testInput3: challenge.testInput3,
      testOutput3: challenge.testOutput3,
      testInput4: challenge.testInput4,
      testOutput4: challenge.testOutput4,
      testInput5: challenge.testInput5,
      testOutput5: challenge.testOutput5,
      testInput6: challenge.testInput6,
      testOutput6: challenge.testOutput6,
      testInput7: challenge.testInput7,
      testOutput7: challenge.testOutput7,
      testInput8: challenge.testInput8,
      testOutput8: challenge.testOutput8,
      testInput9: challenge.testInput9,
      testOutput9: challenge.testOutput9,
      testInput10: challenge.testInput10,
      testOutput10: challenge.testOutput10,
      testCases: testCases,
    });
  return res.status(200).json({
    data: null,
  });
};

exports.getChallenges = (req, res) => {
  const user = {
    googleId: req.body.data.googleId,
    testName: req.body.data.testName,
  };

  CodingChallengeDB.find(
    { googleId: user.googleId, testName: user.testName },
    { __v: 0, googleId: 0, testName: 0 },
    function (err, result) {
      return res.status(200).json({
        data: result,
      });
    }
  );
};

