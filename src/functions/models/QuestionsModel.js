const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionsSchema = new Schema({
    googleId: { type: String, required: true },
    testName: { type: String, required: true },
    question1: { type: String, required: false },
    question2: { type: String, required: false },
    question3: { type: String, required: false },
  });

  const QuestionsDB = mongoose.model('QuestionsDB', questionsSchema);

  module.exports = QuestionsDB;