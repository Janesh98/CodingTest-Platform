const NewUserDB = require('../models/UserModel');

exports.company = async (req, res) => {
  const result = await NewUserDB.find(
    { company: { $ne: null } },
    { _id: 0, company: 1 }
  );

  if (!result)
    return res
      .status(404)
      .json({ status: 'failed', data: 'No companies available' });
  // need to return data as key in response for firebase functions
  return res.status(200).json({
    status: 'success',
    data: result,
  });
};

exports.addCompany = async (req, res) => {
  const newCompany = {
    googleId: req.body.data.googleId,
    company: req.body.data.company,
  };
  var query = { googleId: newCompany.googleId };

  const result = await NewUserDB.find(
    { googleId: newCompany.googleId },
    { _id: 0, googleId: 1 }
  );

  if (result.length === 0) {
    return res.status(404).json({
      status: 'failed',
      data: 'Account for googleId does not exist',
    });
  } else {
    var companyToBeAdded = { $set: { company: newCompany.company } };
    await NewUserDB.updateOne(query, companyToBeAdded);
    return res.status(200).json({
      status: 'success',
      data: null,
    });
  }
};
