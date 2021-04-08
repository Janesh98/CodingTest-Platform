import React from 'react';
import EditTest  from '../components/EditTest';
import { render, screen, fireEvent, act } from "../test-utils";
import '@testing-library/jest-dom'
import { createBrowserHistory } from "history";

describe('rendering components', () => {

    const history = createBrowserHistory();
    const state = { testName: 'testName1' }
    history.push("/", state);
    it('renders <EditTest /> without crashing', () => {
        render(<EditTest history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.queryByTestId("editTest-container")).not.toBeNull();
 });

 it('renders coding test text', () => {
        render(<EditTest history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.getByText("Coding Test: testName1")).toBeInTheDocument();
 });

 it('renders coding challenges text', () => {
        render(<EditTest history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.getByText("Coding Challenges for this test")).toBeInTheDocument();
 });

 it('renders questions text', () => {
        render(<EditTest history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.getByText("Video Interview Questions for this test")).toBeInTheDocument();
 });

 it('renders title table column without crashing', () => {
  render(<EditTest history={createBrowserHistory(history.push("/", state))}/>);
  expect(screen.getByText("Title")).toBeInTheDocument();
 });

 it('renders Description table column without crashing', () => {
  render(<EditTest history={createBrowserHistory(history.push("/", state))}/>);
  expect(screen.getByText("Description")).toBeInTheDocument();
 });

 it('renders Date Created table column without crashing', () => {
  render(<EditTest history={createBrowserHistory(history.push("/", state))}/>);
  expect(screen.getByText("Date Created")).toBeInTheDocument();
 });

 it('renders Question table column without crashing', () => {
  render(<EditTest history={createBrowserHistory(history.push("/", state))}/>);
  expect(screen.getByText("Question")).toBeInTheDocument();
 });


 it('renders add participants button without crashing', async () => {
    render(<EditTest history={createBrowserHistory(history.push("/", state))} />);
    expect(screen.queryByTestId("addParticipants")).toBeInTheDocument();
});

it('renders add challenge without crashing', async () => {
    render(<EditTest history={createBrowserHistory(history.push("/", state))} />);
    expect(screen.queryByTestId("addChallenge")).toBeInTheDocument();
});

it('Add Challenge Button click', async ()=> {
    const mockHandleOnClick = jest.fn()
    const  wrapper  = render(<EditTest onClick={mockHandleOnClick()}/>);

    const button = wrapper.queryByTestId("addChallenge");
    act(() => {
    fireEvent.click(button);
     });
     expect(mockHandleOnClick).toHaveBeenCalledTimes(1);
 });

  it('Add Participants Button click', async ()=> {
    const mockHandleOnClick = jest.fn()
    const  wrapper  = render(<EditTest onClick={mockHandleOnClick()}/>);

    const button = wrapper.queryByTestId("addParticipants");
    act(() => {
    fireEvent.click(button);
     });
     expect(mockHandleOnClick).toHaveBeenCalledTimes(1);
 });
});