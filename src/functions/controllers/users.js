let NewUserDB = require('../models/UserModel');
const config = require('../config/config');
let CodingTestDB = require('../models/CodingTestModel');

const firebase = require('firebase');
firebase.initializeApp(config);

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

    newTestEntry.save(function(err, room) {
    const testId = room.id;
    NewUserDB.updateOne(
      { googleId: test.googleId },
      { $push: { codingTests: testId }}, function (err, res) {
        if (err) throw err;
      });
    return res.status(200).json({
      status: 'success',
      data: null,
    });
 });
};