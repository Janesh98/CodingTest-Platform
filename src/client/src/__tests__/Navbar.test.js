import React from 'react';
import Navbar  from '../components/Navbar';
import { render, screen, fireEvent, act, cleanup } from "../test-utils";
import '@testing-library/jest-dom'

describe('rendering components', () => {

    it('renders <Create /> without crashing', async () => {
    render(<Navbar />);
    expect(screen.queryByTestId("Navbar-div")).not.toBeNull();
    cleanup();
 }); 

 it('renders button without crashing', async () => {
    render(<Navbar />);
    expect(screen.queryByTestId("dashboard-button")).toBeInTheDocument();
 });

 it('renders edit button without crashing', async () => {
    render(<Navbar />);
    expect(screen.queryByTestId("edit-test-menu")).toBeInTheDocument();
 });

 it('renders setup button without crashing', async () => {
    render(<Navbar />);
    expect(screen.queryByTestId("setup-test-menu")).toBeInTheDocument();
 });

 it('renders results button without crashing', async () => {
    render(<Navbar />);
    expect(screen.queryByTestId("results-test-menu")).toBeInTheDocument();
 });

 it('Dashboard Button click', async ()=> {
    const mockHandleOnClick = jest.fn()
    const  wrapper  = render(<Navbar onClick={mockHandleOnClick()}/>);

    const button = wrapper.queryByTestId("open-menu");
    const button2 = wrapper.queryByTestId("dashboard-button");
    act(() => {
    fireEvent.click(button);
    fireEvent.click(button2);
     });
     expect(mockHandleOnClick).toHaveBeenCalledTimes(1);
 });

 it('results Button click', async ()=> {
    const mockHandleOnClick = jest.fn()
    const  wrapper  = render(<Navbar onClick={mockHandleOnClick()}/>);

    const button = wrapper.queryByTestId("open-menu");
    const button2 = wrapper.queryByTestId("results-test-menu");
    act(() => {
    fireEvent.click(button);
    fireEvent.click(button2);
     });
     expect(mockHandleOnClick).toHaveBeenCalledTimes(1);
 });

 it('edit Button click', async ()=> {
    const mockHandleOnClick = jest.fn()
    const  wrapper  = render(<Navbar onClick={mockHandleOnClick()}/>);

    const button = wrapper.queryByTestId("open-menu");
    const button2 = wrapper.queryByTestId("edit-test-menu");
    act(() => {
    fireEvent.click(button);
    fireEvent.click(button2);
     });
     expect(mockHandleOnClick).toHaveBeenCalledTimes(1);
 });

 it('Setup Button click', async ()=> {
    const mockHandleOnClick = jest.fn()
    const  wrapper  = render(<Navbar onClick={mockHandleOnClick()}/>);

    const button = wrapper.queryByTestId("open-menu");
    const button2 = wrapper.queryByTestId("setup-test-menu");
    act(() => {
    fireEvent.click(button);
    fireEvent.click(button2);
     });
     expect(mockHandleOnClick).toHaveBeenCalledTimes(1);
 });

 it('Logout Button click', async ()=> {
    const mockHandleOnClick = jest.fn()
    const  wrapper  = render(<Navbar onClick={mockHandleOnClick()}/>);

    const button = wrapper.queryByTestId("logout");
    act(() => {
    fireEvent.click(button);
     });
     expect(mockHandleOnClick).toHaveBeenCalledTimes(1);
 });

});
