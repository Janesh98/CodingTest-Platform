// const FirebaseConfig = require('./config/config');
// FirebaseConfig.init();
// const functions = require('firebase-functions');
// const ConnectMongo = require('./config/ConnectMongo');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.options('*', cors());

const {
  newTest,
  newChallenge,
  addQs,
  getTests,
  getParticipants,
  getParticipantResults,
  getChallenges,
  getQuestions,
  updateChallenge,
  updateQuestions,
} = require('./controllers/users');
const { register, checkRegister } = require('./controllers/register');
const { getCodingTest, submitCodingTest } = require('./controllers/codingTest');
const { company, addCompany } = require('./controllers/company');
const { executeCode } = require('./controllers/code');
const { sendEmail } = require('./controllers/email');
const { deleteTest, deleteChallenge, deleteQuestions, deleteUserData, resetTest,} = require('./controllers/delete');

// initialize MongoDB configuration
// ConnectMongo.init();
const uri = 'mongodb://localhost:27017/myapp';
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
app.post('/register', register);
app.post('/checkRegister', checkRegister);
app.post('/company/all', company);
app.post('/company', addCompany);
app.post('/code', executeCode);
app.post('/test', newTest);
app.post('/challenge', newChallenge);
app.post('/questions', addQs);
app.post('/tests', getTests);
app.post('/resetTest', resetTest);
app.post('/getParticipants', getParticipants);
app.post('/getParticipantResults', getParticipantResults);
app.post('/delete', deleteTest);
app.post('/challenges', getChallenges);
app.post('/codingtest/:codingTestId/:participantId', getCodingTest);
app.post('/codingtest/submit', submitCodingTest);
app.post('/getQuestions', getQuestions);
app.post('/deleteChallenge', deleteChallenge);
app.post('/deleteQuestions', deleteQuestions);
app.post('/updateChallenge', updateChallenge);
app.post('/updateQuestions', updateQuestions);
app.post('/deleteUserData', deleteUserData);
app.post('/email', sendEmail);

module.exports = app;
