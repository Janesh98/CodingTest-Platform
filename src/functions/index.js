const functions = require('firebase-functions');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());

const { register, company, addCompany } = require('./controllers/users');

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

// all firebase functions must be a post request
// Registration route
app.post('/register', register);
app.post('/company/all', company);
app.post('/company', addCompany);

exports.api = functions.https.onRequest(app);
