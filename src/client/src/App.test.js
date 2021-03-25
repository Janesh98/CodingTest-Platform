import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import Signup  from './components/Signup';
import Edit  from './components/Edit';
import Dashboard  from './components/Dashboard';
import AuthProvider from './contexts/AuthContext';
import firebase from 'firebase/app';
import { useAuth } from './contexts/AuthContext';
import { act, render, screen, getTestById } from "./test-utils";

//////////////////
describe('rendering components', () => {
  it('renders <App /> without crashing', () => {
    shallow(<App />);
  });

 it('renders <Dashboard /> without crashing', () => {
  
   const wrapper = shallow(<Dashboard />);
   expect(wrapper.find('#dashboard-container').length).toBe(1);
 });


 it('renders <Edit /> without crashing', () => {

  render(<Edit />);
  //console.log(wrapper);
  //expect(getTestById("edit-container")).toBeInTheDocument();
  //const wrapper = shallow(render(<Edit />));

   ///expect(wrapper.length).toBe(1);
 });

 it('renders <Signup /> without crashing', () => {

  render(<Signup />);
 });
});
