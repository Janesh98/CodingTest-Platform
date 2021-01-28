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

const { register, company, addCompany } = require('./controllers/users');

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

exports[API_PREFIX] = functions.https.onRequest(app);
