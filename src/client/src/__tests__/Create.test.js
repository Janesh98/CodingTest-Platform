import React from 'react';
import Create  from '../components/Create';
import { render, screen, fireEvent, act, cleanup } from "../test-utils";
import '@testing-library/jest-dom'

describe('rendering components', () => {

    it('renders <Create /> without crashing', async () => {
    render(<Create />);
    expect(screen.queryByTestId("create-container")).not.toBeNull();
    cleanup();
 });

 it('renders text without crashing', async () => {
    render(<Create />);
    expect(screen.getByText("New Coding Test Name")).toBeInTheDocument();
    cleanup();
 });

 it('renders button and button text without crashing', async () => {
    render(<Create />);
    expect(screen.getByText("Continue to Setup")).toBeInTheDocument();
    expect(screen.queryByTestId("continue")).toBeInTheDocument();
    cleanup();
 });


    it('TextField update', async ()=> {
    const wrapper = render(<Create />);
    const input = wrapper.queryByTestId("name")
    act(() => {
        fireEvent.change(input, { target: { value: 'company' } })
    });
    expect(input.value).toBe('company')
    cleanup();
});

 it('Button click', async ()=> {
    const mockHandleOnClick = jest.fn()
    const  wrapper  = render(<Create onClick={mockHandleOnClick()}/>);

    const button = wrapper.queryByTestId("continue");
    act(() => {
    fireEvent.click(button);
     });
     expect(mockHandleOnClick).toHaveBeenCalledTimes(1);
 });

});

