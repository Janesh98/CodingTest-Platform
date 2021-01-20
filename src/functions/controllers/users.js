const { db } = require('../utilities/admin');
let NewUserDB = require('../models/UserModel')
const config = require('../config/config')

const firebase = require('firebase');
firebase.initializeApp(config);

const {validateRegistrationData, validateLoginData} = require('../utilities/validation')

exports.register = (req, res) => {
    const newUser = {
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      company: req.body.company
    };
  
    const {valid, errors} = validateRegistrationData(newUser);

    if(!valid) return res.status(400).json(errors)

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
        const company = newUser.company;
        const email = newUser.email;
        const createdAt = new Date().toISOString();

        const newUserEntry = new NewUserDB({
          company,
          email,
          createdAt,
          userId,
        });

        newUserEntry.save()
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
  }

  exports.login = (req, res) => {
    const user = {
      email: req.body.email,
      password: req.body.password
    };

    const {valid, errors} = validateLoginData(user);

    if(!valid) return res.status(400).json(errors);
  
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(data => {
        return data.user.getIdToken();
      })
      .then(token => {
        return res.json({token});
      })
      .catch((err) => {
        console.error(err);
        if(err.code == 'auth/wrong-password'){
          return res.status(403).json('Email or Password incorrect')
        }
        else return res.status(500).json({ error: err.code});
      });
  }