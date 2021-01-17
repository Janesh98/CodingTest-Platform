const functions = require('firebase-functions');
const express = require('express');
const app = express();

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
