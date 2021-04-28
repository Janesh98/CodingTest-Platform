const FirebaseConfig = require('./config/config');
FirebaseConfig.init();
const functions = require('firebase-functions');
const ConnectMongo = require('./config/ConnectMongo');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.options('*', cors());

const {
  newTest,
  addQs,
  getTests,
} = require('./controllers/users');
const { getCodingTest, submitCodingTest } = require('./controllers/codingTest');
const { register, checkRegister } = require('./controllers/register');
const { getQuestions, updateQuestions } = require('./controllers/question');
const {
  getParticipants,
  getParticipantResults,
} = require('./controllers/participant');
const { company, addCompany } = require('./controllers/company');
const { executeCode } = require('./controllers/code');
const { sendEmail } = require('./controllers/email');
const { newChallenge, updateChallenge, getChallenges, } = require('./controllers/challenges');
const { deleteTest, deleteChallenge, deleteQuestions, deleteUserData, resetTest,} = require('./controllers/delete');

// initiliaze MongoDB configuration
ConnectMongo.init();

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
app.post('/getParticipants', getParticipants);
app.post('/getParticipantResults', getParticipantResults);
app.post('/delete', deleteTest);
app.post('/resetTest', resetTest);
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

// module.exports = { app, api: functions.https.onRequest(app) };
exports.api = functions.https.onRequest(app);
