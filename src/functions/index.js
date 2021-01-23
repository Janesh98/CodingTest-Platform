const functions = require('firebase-functions');
const mongoose = require('mongoose');
const express = require('express');

require('dotenv').config();

const app = express();

const { register, company } = require('./controllers/users');

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established');
});

// Registration route
app.post('/register', register);


app.post('/company', company);

app.get('/', (req, res) => {
  res.send('homepage');
});

app.get('/test', (req, res) => {
  res.send('Test output');
});

app.get('/auth', (req, res) => {
  res.send('Authenticated');
});

exports.api = functions.https.onRequest(app);
