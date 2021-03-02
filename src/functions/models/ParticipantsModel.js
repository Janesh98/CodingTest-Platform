const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const participantSchema = new Schema({
  email: { type: String, required: true },
  TestId: { type: String, required: true },
});

const ParticipantDB = mongoose.model('ParticipantDB', participantSchema);

module.exports = ParticipantDB;