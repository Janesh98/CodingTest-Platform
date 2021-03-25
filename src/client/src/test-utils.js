import React, { createContext } from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from './contexts/AuthContext';

const AuthContex = AuthContext

const currentUser = {
  email: "abc@abc.com",
  uid: 1
};

const signup = jest.fn();
const login = jest.fn();
const logout = jest.fn();
const signInWithGoogle = jest.fn();


const AllTheProviders = ({ children }) => {
  return (
    <Router>
      <AuthContex.Provider value={{ currentUser, signup, login, logout, signInWithGoogle }}>
        {children}
      </AuthContex.Provider>
    </Router>
  );
};

const customRender = (ui, options) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};

export * from "@testing-library/react";

export { customRender as render };