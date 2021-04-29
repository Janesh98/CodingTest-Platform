const ParticipantDB = require('../models/ParticipantsModel');

exports.getParticipants = async (req, res) => {
  const test = {
    TestId: req.body.data.TestId,
  };

  const result = await ParticipantDB.find({ TestId: test.TestId }, { __v: 0 });
  return res.status(200).json({
    data: result,
  });
};

exports.getParticipantResults = async (req, res) => {
  const participant = {
    _id: req.body.data._id,
  };

  const result = await ParticipantDB.find({ _id: participant._id }, { __v: 0 });
  return res.status(200).json({
    data: result,
  });
};
