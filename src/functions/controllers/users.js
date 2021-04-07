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
  NewUserDB.find(
    { email: newUser.email },
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
  console.log(req);
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
  ];

  var testCases = unfilteredTestCases.filter(function (el) {
    return el.input != null || el.output != null;
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
      console.log(result);
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
      console.log(result);
      return res.status(200).json({
        data: result,
      });
    }
  );
};
exports.deleteTest = (req, res) => {
  const test = {
    googleId: req.body.data.googleId,
    testName: req.body.data.testName,
    _id: req.body.data._id,
  };

  var query = {
    googleId: test.googleId,
    testName: test.testName,
  };
  CodingTestDB.deleteOne(query, function (err, obj) {
    if (err) throw err;
    console.log('1 document deleted');
  });

  CodingChallengeDB.deleteMany(query, function (err, obj) {
    if (err) throw err;
    console.log('Many document(s) deleted');
  });

  QuestionsDB.deleteMany(query, function (err, obj) {
    if (err) throw err;
    console.log('Many document(s) deleted');
  });

  NewUserDB.updateOne(
    { googleId: test.googleId },
    { $pull: { codingTests: test._id } },
    function (err, res) {
      if (err) throw err;
    }
  );
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
      if (err) throw err;
      return res.status(200).json({
        data: result,
      });
    }
  );
};

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
    console.error(err);
    return await res.status(400).json({
      data: err.message,
    });
  }
};

exports.submitCodingTest = async (req, res) => {
  console.log('code submission');
  try {
    const id = req.body.data.participantId;
    const codingTestResults = req.body.data.codingTestResults;

    const filter = { _id: id };
    const update = { codingTestResults };
    await ParticipantDB.findOneAndUpdate(filter, update);
    return res.status(200).json({
      data: null,
    });
  } catch (error) {
    console.error(error);
  }
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
    console.log('1 document deleted');
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
    console.log('1 document deleted');
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
  ];

  var testCases = unfilteredTestCases.filter(function (el) {
    return el.input != null || el.output != null;
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
    question1: req.body.data.question1,
    question2: req.body.data.question2,
    question3: req.body.data.question3,
  };

  QuestionsDB.updateOne(
    { _id: Qs._id },
    {
      question1: Qs.question1,
      question2: Qs.question2,
      question3: Qs.question3,
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
