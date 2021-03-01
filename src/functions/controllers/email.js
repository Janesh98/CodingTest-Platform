var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'codingtestplatform@gmail.com',
    pass: 'VeryMoist69'
  }
});


exports.sendEmail = (req, res) => {
    const recipient = req.body.data.email;
    const id = req.body.data._id;

    var mailOptions = {
        from: 'codingtestplatform@gmail.com',
        to: recipient,
        subject: 'Coding Test Invitation',
        text: 'You have been invited to attempt a coding test, you can access the test by clicking the following link: \n https://coding-test-platform.web.app/codingtest/' + id
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          return res.status(200).json({
            data: info,
          });
        }
      });
}