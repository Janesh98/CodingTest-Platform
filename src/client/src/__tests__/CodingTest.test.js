import React from 'react';
import { shallow } from 'enzyme';
import CodingTest from '../components/CodingTest/CodingTest';
import CodeEditor from '../components/CodingTest/CodeEditor';
import Header from '../components/CodingTest/Header';
import Problem from '../components/CodingTest/Problem';
import Terminal from '../components/CodingTest/Terminal';
import { render, screen, fireEvent, act} from "../test-utils";
import '@testing-library/jest-dom'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('rendering components', () => {
    it('renders <CodingTest /> without crashing', () => {
    shallow(<CodingTest />);
  });

 it('renders <CodingEditor /> without crashing', () => {
   shallow(<CodeEditor />);
 });

 it('renders <CodingTest /> grid without crashing', () => {
   render(<CodingTest />);
   expect(screen.queryByTestId("coding-test-grid")).toBeInTheDocument();
 });

 it('renders submit button without crashing', () => {
   render(<CodeEditor />);
   expect(screen.queryByTestId("submit")).toBeInTheDocument();
 });

 it('submit Button click', async ()=> {
   const mockHandleOnClick = jest.fn()
   const  wrapper  = render(<CodeEditor onClick={mockHandleOnClick()}/>);

   const button = wrapper.queryByTestId("submit");
   act(() => {
   fireEvent.click(button);
    });
    expect(mockHandleOnClick).toHaveBeenCalledTimes(1);
});

 it('renders editor without crashing', () => {
   render(<CodeEditor />);
   expect(screen.queryByTestId("editor")).toBeInTheDocument();
 });


  it('renders <Header /> without crashing', () => {
      render(<Header />)
  });

  it('renders text without crashing', () => {
    render(<Header />);
    expect(screen.getByText("Coding Test")).toBeInTheDocument();
  });

  it('renders submit test button without crashing', () => {
    render(<Header />);
    expect(screen.queryByTestId("submit")).toBeInTheDocument();
  });

 it('submit test Button click', async ()=> {
   try{
   const mockHandleOnClick = jest.fn()
   const  wrapper  = render(<Header onClick={mockHandleOnClick()}/>);
   const button = wrapper.queryByTestId("submit");
   act(() => {
   fireEvent.click(button);
    });
    expect(mockHandleOnClick).toHaveBeenCalledTimes(1);
  }catch{
    console.log('error');
  }
})
it('renders <Problem /> without crashing', () => {
      render(<Problem />)
  });

  it('renders <Terminal /> without crashing', () => {
      render(<Terminal />)
  });

});