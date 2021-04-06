import React from 'react';
import Dashboard from '../components/Dashboard';
import { render, screen, fireEvent, act} from "../test-utils";
import '@testing-library/jest-dom'

describe('rendering components', () => {
  it('renders <Dashboard /> without crashing', () => {
    render(<Dashboard />);
  });

 it('renders text 1', () => {
        render(<Dashboard />);
        expect(screen.queryByTestId("Dashboard typography")).toHaveTextContent("Dashboard");
 });
 it('renders text 2', () => {
        render(<Dashboard />);
        expect(screen.getByText("Setup a New Coding Test")).toBeInTheDocument();
 });
 it('renders text 3', () => {
        render(<Dashboard />);
        expect(screen.getByText("Create a new coding test with challenges and the option of adding video interview questions")).toBeInTheDocument();
 });
 it('renders text 4', () => {
        render(<Dashboard />);
        expect(screen.getByText("Edit Existing Coding Test")).toBeInTheDocument();
 });
 it('renders text 5', () => {
        render(<Dashboard />);
        expect(screen.getByText("Edit or add new challenges and questions to an existing coding test and send email invites to participants")).toBeInTheDocument();
 });

 it('renders text 6', () => {
        render(<Dashboard />);
        expect(screen.getByText("View Previous Tests History/Results")).toBeInTheDocument();
 });

 it('renders text 7', () => {
        render(<Dashboard />);
        expect(screen.getByText("See the results from coding tests taken by participants including analytics")).toBeInTheDocument();
 });

 it('renders setup button without crashing', async () => {
    render(<Dashboard />);
    expect(screen.queryByTestId("setup-test")).toBeInTheDocument();
    });

it('renders edit button without crashing', async () => {
    render(<Dashboard />);
    expect(screen.queryByTestId("edit-test")).toBeInTheDocument();
    });

    it('renders results button without crashing', async () => {
    render(<Dashboard />);
    expect(screen.queryByTestId("history-results")).toBeInTheDocument();
    });

it('setup Button click', async ()=> {
    const mockHandleOnClick = jest.fn()
    const  wrapper  = render(<Dashboard onClick={mockHandleOnClick()}/>);

    const button = wrapper.queryByTestId("setup-test");
    act(() => {
    fireEvent.click(button);
     });
     expect(mockHandleOnClick).toHaveBeenCalledTimes(1);
 });

 it('edit Button click', async ()=> {
    const mockHandleOnClick = jest.fn()
    const  wrapper  = render(<Dashboard onClick={mockHandleOnClick()}/>);

    const button = wrapper.queryByTestId("edit-test");
    act(() => {
    fireEvent.click(button);
     });
     expect(mockHandleOnClick).toHaveBeenCalledTimes(1);
 });

 it('history Button click', async ()=> {
    const mockHandleOnClick = jest.fn()
    const  wrapper  = render(<Dashboard onClick={mockHandleOnClick()}/>);

    const button = wrapper.queryByTestId("history-results");
    act(() => {
    fireEvent.click(button);
     });
     expect(mockHandleOnClick).toHaveBeenCalledTimes(1);
 });

});