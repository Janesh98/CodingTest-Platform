import React, { useContext, useState } from 'react';
import app, { auth } from '../firebase';
import firebase from 'firebase/app';

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  const signup = (email, password) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(provider);
  };

  const value = {
    currentUser,
  };
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};
