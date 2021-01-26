const functions = require('firebase-functions');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const { register, company, addCompany } = require('./controllers/users');

// functions:config:set app.atlas_uri="mongodb+srv://user2:user2@cluster0.qzfyt.mongodb.net/test?retryWrites=true&w=majority"
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

exports.api = functions.https.onRequest(app);
