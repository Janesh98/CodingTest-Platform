const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const challengeSchema = new Schema({
  googleId: { type: String, required: true },
  testName: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  title: { type: String, required: true },
  problemDescription: { type: String, required: true },
  inputFormat: { type: String, required: true },
  returnFormat: { type: String, required: true },
  constraints: { type: String, required: true },
  sampleInput: { type: String, required: true },
  sampleOutput: { type: String, required: true },
  exampleExplanation: { type: String, required: true },
  testInput1: { type: String, required: true },
  testOutput1: { type: String, required: true },
  testInput2: { type: String, required: false },
  testOutput2: { type: String, required: false },
  testInput3: { type: String, required: false },
  testOutput3: { type: String, required: false },
  testInput4: { type: String, required: false },
  testOutput4: { type: String, required: false },
  testInput5: { type: String, required: false },
  testOutput5: { type: String, required: false },
});

const CodingChallengeDB = mongoose.model('CodingChallengeDB', challengeSchema);

module.exports = CodingChallengeDB;