const app = require('./app');
const FirebaseConfig = require('./config/config');
FirebaseConfig.init();
const functions = require('firebase-functions');
const ConnectMongo = require('./config/ConnectMongo');

// initiliaze MongoDB configuration
ConnectMongo.init();

exports.api = functions.https.onRequest(app);
