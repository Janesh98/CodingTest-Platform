import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/analytics';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyC3A8sAfhVlfmDx97uLqRvlZh_3bPnbrS8',
  authDomain: 'coding-test-platform.firebaseapp.com',
  projectId: 'coding-test-platform',
  storageBucket: 'coding-test-platform.appspot.com',
  messagingSenderId: '775556965560',
  appId: '1:775556965560:web:15dea13deddf9f91bf404d',
  measurementId: 'G-G17N859T23',
});

export const analytics = app.analytics();

export const storage = app.storage();

export const auth = app.auth();

export default app;
