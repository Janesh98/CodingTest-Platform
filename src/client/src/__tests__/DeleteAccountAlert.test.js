import React from 'react';
import DeleteAccountAlert  from '../components/DeleteAccountAlert';
import { render, screen, fireEvent, act, cleanup } from "../test-utils";
import '@testing-library/jest-dom'

describe('rendering components', () => {

   it('renders <DeleteAccountAlert /> without crashing', async () => {
    render(<DeleteAccountAlert />);
 });

    it('renders text without crashing', async () => {
    render(<DeleteAccountAlert />);
    expect(screen.getByText("Are you sure you want to Delete your account?")).toBeInTheDocument();
    expect(screen.getByText("All coding tests and results data will de deleted")).toBeInTheDocument();
    expect(screen.getByText("Are you sure you want to Delete your account?")).toBeInTheDocument();
    cleanup();
 }); 

  it('renders delete button without crashing', async () => {
    render(<DeleteAccountAlert />);
    expect(screen.queryByTestId("delete")).toBeInTheDocument();
 });

 it('renders yes button without crashing', async () => {
    render(<DeleteAccountAlert />);
    expect(screen.queryByTestId("yes")).toBeInTheDocument();
 });

 it('renders cancel button without crashing', async () => {
    render(<DeleteAccountAlert />);
    expect(screen.queryByTestId("cancel")).toBeInTheDocument();
 });

 it('click delete button without crashing', async () => {
    const mockHandleOnClick = jest.fn()
    const  wrapper  = render(<DeleteAccountAlert onClick={mockHandleOnClick()}/>);

    const button = wrapper.queryByTestId("delete");
    act(() => {
    fireEvent.click(button);
     });
     expect(mockHandleOnClick).toHaveBeenCalledTimes(1);
 });


 it('click yes button without crashing', async () => {
    const mockHandleOnClick = jest.fn()
    const  wrapper  = render(<DeleteAccountAlert onClick={mockHandleOnClick()}/>);

    const button = wrapper.queryByTestId("delete");
    const button2 = wrapper.queryByTestId("yes");
    act(() => {
    fireEvent.click(button);
    fireEvent.click(button2);
     });
     expect(mockHandleOnClick).toHaveBeenCalledTimes(1);
 });

 it('click cancel button without crashing', async () => {
    const mockHandleOnClick = jest.fn()
    const  wrapper  = render(<DeleteAccountAlert onClick={mockHandleOnClick()}/>);

    const button = wrapper.queryByTestId("delete");
    const button2 = wrapper.queryByTestId("cancel");
    act(() => {
    fireEvent.click(button);
    fireEvent.click(button2);
     });
     expect(mockHandleOnClick).toHaveBeenCalledTimes(1);
 });

});