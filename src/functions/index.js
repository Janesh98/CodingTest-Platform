const functions = require('firebase-functions');
const express = require('express');
const app = express();

const admin = require('firebase-admin');
admin.initializeApp();

const firebaseConfig = {
  apiKey: "AIzaSyDDuYmhM7TEUlQi2ScdXxN6vu5Y8ynZK-E",
  authDomain: "coding-test-platform.firebaseapp.com",
  projectId: "coding-test-platform",
  storageBucket: "coding-test-platform.appspot.com",
  messagingSenderId: "775556965560",
  appId: "1:775556965560:web:15dea13deddf9f91bf404d"
};

const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);

const db = admin.firestore();

app.get(('/'), (req, res) => {
  res.send('homepage');
});

app.get('/test', (req, res) => {
  res.send('Test output');
});

app.get('/auth', (req, res) => {
  res.send('Authenticated');
});

// Checks if email is valid
const isEmail = (email) => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(email.match(emailRegEx)) return true;
  else return false;
}

const isEmpty = (string) => {
  if(string.trim() == '') return true;
  else return false;
}

// Registration route
app.post('/register', (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    company: req.body.company
  };

  let errors = {};

  if(isEmpty(newUser.email)){
    errors.email = 'Email must be provided';
  } else if(!isEmail(newUser.email)){
    errors.email = 'Must be a valid email address';
  }

  if(isEmpty(newUser.password)) errors.password = 'Cannot be empty';
  if(newUser.password !== newUser.confirmPassword) errors.confirmPassword = 'Passwords must match';
  if(isEmpty(newUser.company)) errors.company = 'Cannot be empty';

  if(Object.keys(errors).length > 0) return res.status(400).json(errors);

  // Register user
  // TODO Replace firestore with MongoDB
  let token, userId;
  db.doc(`/users/${newUser.company}`).get()
    .then(doc => {
      // Check to see if company already registered 
      if(doc.exists){
        return res.status(400).json({ company: 'This company is already registered'})
      } else {
        // Firebase authentication
        return  firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
      }
    })
    .then(data => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    // Will use token whenever we need to access router that is protected
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        company: newUser.company,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId
      };
      return db.doc(`/users/${newUser.company}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch(err => {
      console.error(err);
      if (err.code == 'auth/email-already-in-use'){
        return res.status(400).json({ email: 'Email is already in use' });
      }else{
        return res.status(500).json({ error: err.code});
      }
    });
});

exports.api = functions.https.onRequest(app);
