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
export const updateChallenge = firebase.functions().httpsCallable('api/updateChallenge');

export const getChallenges = firebase
  .functions()
  .httpsCallable('api/challenges');
export const getQuestions = firebase
  .functions()
  .httpsCallable('api/getQuestions');
export const deleteChallenge = firebase
  .functions()
  .httpsCallable('api/deleteChallenge');
export const deleteQuestions = firebase
  .functions()
  .httpsCallable('api/deleteQuestions');
export const getCodingTest = async (id) => {
  const data = await firebase.functions().httpsCallable(`api/codingTest/${id}`);
  return await data();
};