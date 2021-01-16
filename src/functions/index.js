const functions = require('firebase-functions');
const express = require('express');
const app = express();

app.get('/api', (req, res) => {
  res.send('API output');
});

app.get('/admin', (req, res) => {
  res.send('This is the admin page');
});

exports.api = functions.https.onRequest(app);
