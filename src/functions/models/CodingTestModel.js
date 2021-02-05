const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const testSchema = new Schema({
  googleId: { type: String, required: true },
  testName: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CodingTestDB = mongoose.model('CodingTestDB', testSchema);

module.exports = CodingTestDB;