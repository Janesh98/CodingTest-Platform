import React from 'react';
import CompanyInput  from '../components/CompanyInput';
import { render, screen, fireEvent, act, cleanup} from "../test-utils";
import '@testing-library/jest-dom'

describe('rendering components', () => {

 it('renders <CompanyInput /> without crashing', () => {
  render(<CompanyInput />);
  expect(screen.queryByTestId("company input div")).not.toBeNull();
  cleanup();
 });

 it('renders text without crashing', () => {
  render(<CompanyInput />);
  expect(screen.getByText("Enter Company")).toBeInTheDocument();
  cleanup();
 });

 it('renders company text box without crashing', () => {
  render(<CompanyInput />);
  expect(screen.queryByTestId("company")).toBeInTheDocument();
  cleanup();
 });

 it('renders submit button without crashing', () => {
  render(<CompanyInput />);
  expect(screen.getByText("Submit")).toBeInTheDocument();
  cleanup();
 });

 it('TextField update', async ()=> {
    const wrapper = render(<CompanyInput />);
    const input = wrapper.queryByTestId("company")
    act(() => {
        fireEvent.change(input, { target: { value: 'my company' } })
    });
    expect(input.value).toBe('my company')
    cleanup();
});

});