const functions = require('firebase-functions');
const mongoose = require('mongoose')
const express = require('express');

require('dotenv').config();

const app = express();

const { register, login } = require('./controllers/users');

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB connection established");
})

// Registration route
app.post('/register', register);

//Login Route
app.post('/login', login);

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