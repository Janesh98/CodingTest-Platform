const functions = require('firebase-functions');

module.exports = {
  apiKey: functions.config().app.apikey,
  authDomain: functions.config().app.authdomain,
  projectId: functions.config().app.projectid,
  storageBucket: functions.config().app.storagebucket,
  messagingSenderId: functions.config().app.messagingsenderid,
  appId: functions.config().app.appid,
};
