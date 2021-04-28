const { validateRegistrationData } = require('../utilities/validation');
const NewUserDB = require('../models/UserModel');

exports.register = async (req, res) => {
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
  await newUserEntry.save();
  return res.status(201).json({
    googleId,
    data: null,
  });
};

exports.checkRegister = async (req, res) => {
  const newUser = {
    email: req.body.data.email,
  };
  const result = await NewUserDB.find({ email: newUser.email });
  if (!result) {
    return res.status(403).json({
      status: 'failed',
      data: `${newUser.email} is not registered`,
    });
  }
  return res.status(200).json({
    status: 'success',
    data: result,
  });
};
