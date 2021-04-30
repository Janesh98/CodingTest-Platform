const { db } = require('../utilities/admin');
let ParticipantsDB = require('../models/ParticipantsModel');
let CodingTestDB = require('../models/CodingTestModel');

exports.sendEmail = async (req, res) => {
  const email = req.body.data.email;
  const TestId = req.body.data._id;
  const googleId = req.body.data.googleId;
  const attemptedTest = req.body.data.attemptedTest;

  const newParticipantsEntry = new ParticipantsDB({
    email,
    TestId,
    googleId,
    attemptedTest,
  });

  const result = await newParticipantsEntry.save();
  const participantsId = result._id;

  await CodingTestDB.updateOne(
    { _id: TestId },
    { $push: { participants: participantsId } }
  );

  await db.collection('mail').add({
    to: email,
    message: {
      subject: 'Coding Test Invitation',
      text:
        'You have been invited to attempt a coding test, you can access the test by clicking the following link: \n https://coding-test-platform.web.app/codingtest/' +
        TestId +
        '/' +
        participantsId,
    },
  });

  return res.status(200).json({
    data: null,
  });
};
