import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Signup  from './components/Signup';
import Edit  from './components/Edit';
import Dashboard  from './components/Dashboard';
import { render} from "./test-utils";

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

  const wrapper = render(<Edit />);
  //console.log(wrapper);
  //expect(wrapper("edit-container")).toBeInTheDocument();
  //const wrapper = shallow(render(<Edit />));

   ///expect(wrapper.length).toBe(1);
 });

 it('renders <Signup /> without crashing', () => {

  render(<Signup />);
 });
});
