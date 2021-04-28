var nodemailer = require('nodemailer');
let ParticipantsDB = require('../models/ParticipantsModel');
let CodingTestDB = require('../models/CodingTestModel');

exports.sendEmail = async (req, res) => {
  const email = req.body.data.email;
  const TestId = req.body.data._id;
  const googleId = req.body.data.googleId;

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'codingtestplatform@gmail.com',
      pass: 'VeryMoist69',
    },
  });

  const newParticipantsEntry = new ParticipantsDB({
    email,
    TestId,
    googleId,
  });

  const result = await newParticipantsEntry.save();
  const participantsId = result._id;

  await CodingTestDB.updateOne(
    { _id: TestId },
    { $push: { participants: participantsId } }
  );

  var mailOptions = {
    from: 'codingtestplatform@gmail.com',
    to: email,
    subject: 'Coding Test Invitation',
    text:
      'You have been invited to attempt a coding test, you can access the test by clicking the following link: \n https://coding-test-platform.web.app/codingtest/' +
      TestId +
      '/' +
      participantsId,
  };

  await transporter.sendMail(mailOptions);

  return res.status(200).json({
    data: null,
  });
};
