let NewUserDB = require('../models/UserModel');
let CodingTestDB = require('../models/CodingTestModel');
let CodingChallengeDB = require('../models/CodingChallengeModel');
let QuestionsDB = require('../models/QuestionsModel');

const { validateRegistrationData } = require('../utilities/validation');
const ParticipantDB = require('../models/ParticipantsModel');

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

exports.checkRegister = (req, res) => {
  const newUser = {
    email: req.body.data.email,
  };
  NewUserDB.find({ email: newUser.email }, function (err, result) {
    if (err) throw err;
    // need to return data as key in response for firebase functions
    return res.status(200).json({
      status: 'success',
      data: result,
    });
  });
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

exports.getChallenges = (req, res) => {
  const user = {
    googleId: req.body.data.googleId,
    testName: req.body.data.testName,
  };

  CodingChallengeDB.find(
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

exports.deleteChallenge = (req, res) => {
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
  CodingChallengeDB.deleteOne(query, function (err, obj) {
    if (err) throw err;
  });
  CodingTestDB.updateOne(
    { googleId: challenge.googleId, testName: challenge.testName },
    { $pull: { challenges: challenge._id } },
    function (err, res) {
      if (err) throw err;
    }
  );
  return res.status(200).json({
    data: null,
  });
};

exports.deleteQuestions = (req, res) => {
  const questions = {
    googleId: req.body.data.googleId,
    testName: req.body.data.testName,
    _id: req.body.data._id,
  };

  var query = {
    googleId: questions.googleId,
    testName: questions.testName,
  };

  QuestionsDB.deleteOne(query, function (err, obj) {
    if (err) throw err;
  });
  CodingTestDB.updateOne(
    { googleId: questions.googleId, testName: questions.testName },
    { $pull: { questions: questions._id } },
    function (err, res) {
      if (err) throw err;
    }
  );
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

exports.deleteUserData = (req, res) => {
  const user = {
    googleId: req.body.data.googleId,
  };

  var query = {
    googleId: user.googleId,
  };

  NewUserDB.deleteOne(query, function (err, obj) {
    if (err) throw err;
  });

  CodingTestDB.deleteMany(query, function (err, obj) {
    if (err) throw err;
  });

  CodingChallengeDB.deleteMany(query, function (err, obj) {
    if (err) throw err;
  });

  QuestionsDB.deleteMany(query, function (err, obj) {
    if (err) throw err;
  });

  ParticipantDB.deleteMany(query, function (err, obj) {
    if (err) throw err;
  });
  return res.status(200).json({
    data: null,
  });
};

exports.resetTest = (req, res) => {
  const test = {
    TestId: req.body.data._id,
  };

  var query = {
    TestId: test.TestId,
  };

  ParticipantDB.deleteMany(query, function (err, obj) {
    if (err) throw err;
  });
  CodingTestDB.updateOne(
    { _id: test.TestId },
    {
      participants: [],
    },
    function (err, res) {
      if (err) throw err;
    }
  );
  return res.status(200).json({
    data: null,
  });
};
