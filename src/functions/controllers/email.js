var nodemailer = require('nodemailer');
let ParticipantsDB = require('../models/ParticipantsModel');
let CodingTestDB = require('../models/CodingTestModel');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'codingtestplatform@gmail.com',
    pass: 'VeryMoist69'
  }
});


exports.sendEmail = (req, res) => {
    const email = req.body.data.email;
    const TestId = req.body.data._id;

    const newParticipantsEntry = new ParticipantsDB({
      email,
      TestId,
    });

    newParticipantsEntry.save(function (err, room) {
      const participantsId = room.id;
      CodingTestDB.updateOne(
        { _id: TestId },
        { $push: { participants: participantsId } },
        function (err, res) {
          if (err) throw err;
        }
      );
      var mailOptions = {
        from: 'codingtestplatform@gmail.com',
        to: email,
        subject: 'Coding Test Invitation',
        text: 'You have been invited to attempt a coding test, you can access the test by clicking the following link: \n https://coding-test-platform.web.app/codingtest/' + TestId + '/' + participantsId
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    });

      return res.status(200).json({
        data: null,
      });   
}