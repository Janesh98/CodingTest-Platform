const functions = require('firebase-functions');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
// ALLOW CORS
app.use(cors());
// SET CORS for PREFLIGHT OPTIONS
app.options('*', cors());

const API_PREFIX = 'api';
// Rewrite Firebase hosting requests: /api/:path => /:path
app.use((req, res, next) => {
  if (req.url.indexOf(`/${API_PREFIX}/`) === 0) {
    req.url = req.url.substring(API_PREFIX.length + 1);
  }
  next();
});

const {
  register,
  company,
  addCompany,
  newTest,
  newChallenge,
  addQs,
  getTests,
  getParticipants,
  deleteTest,
  getChallenges,
  getCodingTest,
  getQuestions,
  deleteChallenge,
  deleteQuestions,
  updateChallenge,
  updateQuestions,
  submitCodingTest,
} = require('./controllers/users');
const { executeCode } = require('./controllers/code');
const { sendEmail } = require('./controllers/email');

const uri = functions.config().app.atlas_uri;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established');
});

// all firebase functions must be a post request
// Registration route
app.post('/register', register);
app.post('/company/all', company);
app.post('/company', addCompany);
app.post('/code', executeCode);
app.post('/test', newTest);
app.post('/challenge', newChallenge);
app.post('/questions', addQs);
app.post('/tests', getTests);
app.post('/getParticipants', getParticipants);
app.post('/delete', deleteTest);
app.post('/challenges', getChallenges);
app.post('/codingtest/:codingTestId/:participantId', getCodingTest);
app.post('/codingtest/submit', submitCodingTest);
app.post('/getQuestions', getQuestions);
app.post('/deleteChallenge', deleteChallenge);
app.post('/deleteQuestions', deleteQuestions);
app.post('/updateChallenge', updateChallenge);
app.post('/updateQuestions', updateQuestions);
app.post('/email', sendEmail);

exports[API_PREFIX] = functions.https.onRequest(app);
