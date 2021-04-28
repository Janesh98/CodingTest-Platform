const CodingTestDB = require('../models/CodingTestModel');
const CodingChallengeDB = require('../models/CodingChallengeModel');
const QuestionsDB = require('../models/QuestionsModel');
const ParticipantDB = require('../models/ParticipantsModel');
const NewUserDB = require('../models/UserModel');

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
  });

  CodingChallengeDB.deleteMany(query, function (err, obj) {
    if (err) throw err;
  });

  QuestionsDB.deleteMany(query, function (err, obj) {
    if (err) throw err;
  });

  var newQuery = {
    googleId: test.googleId,
  };

  ParticipantDB.deleteMany(newQuery, function (err, obj) {
    if (err) throw err;
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