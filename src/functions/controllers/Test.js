const NewUserDB = require('../models/UserModel');
const CodingTestDB = require('../models/CodingTestModel');
const mongoose = require('mongoose');

exports.newTest = async (req, res) => {
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

  const result = await newTestEntry.save();
  const testId = result.id;
  await NewUserDB.updateOne(
    { googleId: test.googleId },
    { $push: { codingTests: mongoose.Types.ObjectId(testId) } }
  );
  return res.status(200).json({
    status: 'success',
    data: null,
  });
};

exports.getTests = async (req, res) => {
  const user = {
    googleId: req.body.data.googleId,
  };

  const result = await CodingTestDB.find(
    { googleId: user.googleId },
    { __v: 0, googleId: 0, questions: 0 }
  );
  return res.status(200).json({
    data: result,
  });
};
