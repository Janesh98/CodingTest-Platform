const express = require('express');
const cors = require('cors');
// const dotenv = require('dotenv');
// dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.options('*', cors());

const { newTest, getTests } = require('./controllers/Test');
const { register, checkRegister } = require('./controllers/register');
const {
  getQuestions,
  updateQuestions,
  addQs,
} = require('./controllers/question');
const { getCodingTest, submitCodingTest } = require('./controllers/codingTest');
const {
  getParticipants,
  getParticipantResults,
} = require('./controllers/participant');
const { company, addCompany } = require('./controllers/company');
const { executeCode } = require('./controllers/code');
const { sendEmail } = require('./controllers/email');
const {
  newChallenge,
  updateChallenge,
  getChallenges,
} = require('./controllers/challenges');
const {
  deleteTest,
  deleteChallenge,
  deleteQuestions,
  deleteUserData,
  resetTest,
} = require('./controllers/delete');

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
