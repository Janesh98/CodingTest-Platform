const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const participantSchema = new Schema({
  email: { type: String, required: true },
  TestId: { type: String, required: true },
  googleId: {type: String, required: true},
  codingTestResults: { type: Array, required: false },
  questionResults: { type: Array, required: false },
});

const ParticipantDB = mongoose.model('ParticipantDB', participantSchema);

module.exports = ParticipantDB;
