import firebase from 'firebase/app';
import 'firebase/functions';

const development = true;

if (development) firebase.functions().useEmulator('localhost', 5000);

export const callCompany = firebase.functions().httpsCallable('api/company/all');
export const updateCompany = firebase.functions().httpsCallable('api/company');
export const callRegister = firebase.functions().httpsCallable('api/register');