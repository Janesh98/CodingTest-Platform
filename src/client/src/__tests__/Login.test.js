import React from 'react';
import Login  from '../components/Login';
import { render, screen, cleanup, act, fireEvent } from "../test-utils";
import '@testing-library/jest-dom'

describe('rendering components', () => {

 it('renders <Login /> without crashing', () => {
  render(<Login />);
  expect(screen.queryByTestId("login-container")).not.toBeNull();
 });

 it('renders sign in text', () => {
        render(<Login/>);
        expect(screen.queryByTestId("Sign in typography")).toHaveTextContent("Sign In");
 });

 it('renders need an account text', () => {
        render(<Login/>);
        expect(screen.getByText("Need an account?")).toBeInTheDocument();
 });

 it('renders email address text box without crashing', () => {
        render(<Login />);
        expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
 });

 it('renders password text box without crashing', () => {
        render(<Login/>);
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
 });

 it('renders sign in button', () => {
        render(<Login />);
        expect(screen.queryByTestId("sign-in")).toBeInTheDocument();
 });

 it('renders sign in with google button', () => {
        render(<Login/>);
        expect(screen.queryByTestId("sign-in-google")).toBeInTheDocument();
 });

 it('Email address TextField update', async ()=> {
    const wrapper = render(<Login />);
    const input = wrapper.queryByTestId("Email Address");

    act(() => {
        fireEvent.change(input, { target: { value: 'email@email.com' } })
    });

    expect(input.value).toBe('email@email.com');
    cleanup();
});

it('Password TextField update', async ()=> {
    const wrapper = render(<Login />);
    const input = wrapper.queryByTestId("Password");

    act(() => {
        fireEvent.change(input, { target: { value: '123456' } })
    });

    expect(input.value).toBe('123456');
    cleanup();
});

 it('Sign in Button click', async ()=> {
    const promise = Promise.resolve()
    const mockHandleOnClick = jest.fn(() => promise)
    const  wrapper  = render(<Login onClick={mockHandleOnClick()}/>);
    const button = wrapper.queryByTestId("sign-in");
    act(() => {
    fireEvent.click(button);
     });
     expect(mockHandleOnClick).toHaveBeenCalledTimes(1);
     await act(() => promise)
 });

  it('Sign in with Google Button click', async ()=> {
    const promise = Promise.resolve()
    const mockHandleOnClick = jest.fn(() => promise)
    const  wrapper  = render(<Login onClick={mockHandleOnClick()}/>);

    const button = wrapper.queryByTestId("sign-in-google");
  
    act(() => {
    fireEvent.click(button);
     });
     expect(mockHandleOnClick).toHaveBeenCalledTimes(1);
     await act(() => promise)
 });
});