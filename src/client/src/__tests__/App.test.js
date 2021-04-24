import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import Signup  from '../components/Signup';
import Login  from '../components/Login';
import Dashboard  from '../components/Dashboard';
import { render } from "../test-utils";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('rendering components', () => {
  it('renders <App /> without crashing', () => {
    shallow(<App />);
  });

  it('renders <Signup /> without crashing', () => {
  const wrapper = render(<Signup />);
  expect(wrapper.queryByTestId("signup")).not.toBeNull();
 });

 it('renders <Login /> without crashing', () => {
  const wrapper = render(<Login />);
  expect(wrapper.queryByTestId("login-container")).not.toBeNull();
 });

 it('renders <Dashboard /> without crashing', () => { 
   const wrapper = render(<Dashboard />);
   expect(wrapper.queryByTestId('dashboard-grid')).not.toBeNull();
 });

});
