const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionsSchema = new Schema({
    googleId: { type: String, required: true },
    testName: { type: String, required: true },
    questions: {type: Array, required: false },
  });

  const QuestionsDB = mongoose.model('QuestionsDB', questionsSchema);

  module.exports = QuestionsDB;