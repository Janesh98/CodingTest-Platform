import firebase from 'firebase/app';
import 'firebase/functions';

if (process.env.REACT_APP_ENV === 'development')
  firebase.functions().useEmulator('localhost', 5000);

export const callCompany = firebase
  .functions()
  .httpsCallable('api/company/all');
export const updateCompany = firebase.functions().httpsCallable('api/company');
export const callRegister = firebase.functions().httpsCallable('api/register');
export const executeCode = firebase.functions().httpsCallable('api/code');
export const addTest = firebase.functions().httpsCallable('api/test');
export const addChallenge = firebase.functions().httpsCallable('api/challenge');
export const addQs = firebase.functions().httpsCallable('api/questions');
export const getTests = firebase.functions().httpsCallable('api/tests');
export const deleteTest = firebase.functions().httpsCallable('api/delete');

