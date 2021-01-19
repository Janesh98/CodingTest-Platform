const functions = require('firebase-functions');
const express = require('express');
const app = express();

const {register, login} = require('./controllers/users');


// Registration route
app.post('/register', register);

//Login Route
app.post('/login', login);

app.get(('/'), (req, res) => {
  res.send('homepage');
});

app.get('/test', (req, res) => {
  res.send('Test output');
});

app.get('/auth', (req, res) => {
  res.send('Authenticated');
});

exports.api = functions.https.onRequest(app);