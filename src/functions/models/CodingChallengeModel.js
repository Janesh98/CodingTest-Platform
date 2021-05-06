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
  testInput1: { type: String, required: false },
  testOutput1: { type: String, required: false },
  testInput2: { type: String, required: false },
  testOutput2: { type: String, required: false },
  testInput3: { type: String, required: false },
  testOutput3: { type: String, required: false },
  testInput4: { type: String, required: false },
  testOutput4: { type: String, required: false },
  testInput5: { type: String, required: false },
  testOutput5: { type: String, required: false },
  testInput6: { type: String, required: false },
  testOutput6: { type: String, required: false },
  testInput7: { type: String, required: false },
  testOutput7: { type: String, required: false },
  testInput8: { type: String, required: false },
  testOutput8: { type: String, required: false },
  testInput9: { type: String, required: false },
  testOutput9: { type: String, required: false },
  testInput10: { type: String, required: false },
  testOutput10: { type: String, required: false },
  testCases: {type: Array, required: false},
  timeout: {type: Number, required: true}
});

const CodingChallengeDB = mongoose.model('CodingChallengeDB', challengeSchema);

module.exports = CodingChallengeDB;