import React from 'react';
import Signup  from '../components/Signup';
import { render, screen, cleanup, act, fireEvent } from "../test-utils";
import '@testing-library/jest-dom'

describe('rendering components', () => {

 it('renders <Signup /> without crashing', () => {
  render(<Signup />);
  expect(screen.queryByTestId("signup")).not.toBeNull();
 });

 it('renders sign up text', () => {
        render(<Signup/>);
        expect(screen.queryByTestId("Sign up typography")).toHaveTextContent("Sign Up");
 });

 it('renders already have an account text', () => {
        render(<Signup/>);
        expect(screen.getByText("Already have an account?")).toBeInTheDocument();
 });

 it('renders email address text box without crashing', () => {
        render(<Signup />);
        expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
 });

 it('renders password text box without crashing', () => {
        render(<Signup/>);
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
 });

 it('renders confirm password text box without crashing', () => {
        render(<Signup/>);
        expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
 });

 it('renders sign up button', () => {
        render(<Signup />);
        expect(screen.queryByTestId("sign-up")).toBeInTheDocument();
 });

 it('renders sign up with google button', () => {
        render(<Signup/>);
        expect(screen.queryByTestId("sign-up-google")).toBeInTheDocument();
 });

 it('Email address TextField update', async ()=> {
    const wrapper = render(<Signup />);
    const input = wrapper.queryByTestId("Email Address");

    act(() => {
        fireEvent.change(input, { target: { value: 'email@email.com' } })
    });

    expect(input.value).toBe('email@email.com');
    cleanup();
});

it('Password TextField update', async ()=> {
    const wrapper = render(<Signup />);
    const input = wrapper.queryByTestId("Password");

    act(() => {
        fireEvent.change(input, { target: { value: '123456' } })
    });

    expect(input.value).toBe('123456');
    cleanup();
});

it('Confirm Password TextField update', async ()=> {
    const wrapper = render(<Signup />);
    const input = wrapper.queryByTestId("Confirm Password");

    act(() => {
        fireEvent.change(input, { target: { value: '123456' } })
    });

    expect(input.value).toBe('123456');
    cleanup();
});

});