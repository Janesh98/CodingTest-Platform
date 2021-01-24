let NewUserDB = require('../models/UserModel');
const config = require('../config/config');

const firebase = require('firebase');
firebase.initializeApp(config);

const {
  validateRegistrationData,
  validateLoginData,
} = require('../utilities/validation');

exports.register = (req, res) => {
  const newUser = {
    email: req.body.email,
    googleId: req.body.googleId
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
  return res.status(201).json({ googleId });
};

  exports.company = (req, res) => {
    NewUserDB.find(({}), function(err, result){
      if (err) throw err;
      var comp = "company";
      var companiesArray = [];
      var i;
      for (i = 0; i < result.length; i++) {
        companiesArray.push(result[i][comp])
      }
     return res.status(200).json({
       companies: companiesArray});
    });
  };