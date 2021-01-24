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

  // TODO Check if user account for company already exists in the DB
//  NewUserDB.countDocuments({company: company}, function (err, count){
//    if (count > 0){
//      return res
//        .status(400)
//        .json({ company: 'This company is already registered' });
//    }
//  });
};

  exports.company = (req, res) => {
    const newUser = {
      email: req.body.email,
      googleId: req.body.googleId,
      company: req.body.company
    };

    const googleId = newUser.googleId;
    const email = newUser.email;
    const newCompany = newUser.company;
    let companyExists;
    NewUserDB.find(({}), function(err, result){
      if (err) throw err;
      var comp = "company";
      var companiesArray = [];
      var i;
      for (i = 0; i < result.length; i++) {
        companiesArray.push(result[i][comp])
      }
      companyExists = companiesArray.includes(newCompany);
     if(companiesArray.includes(newCompany)){
       console.log("Company is already registered");
      }; 
    });

    return res.status(201).json({ email });
    

  };