import React from 'react';
import ParticipantsResults from '../components/ParticipantsResults';
import { createBrowserHistory } from "history";
import { render, screen } from "../test-utils";
import '@testing-library/jest-dom'

describe('rendering components', () => {

    const history = createBrowserHistory();
    const state = { id: 1, email: 'test@testmail.com'}
    history.push("/", state);
  it('renders <AddParticipants /> without crashing', () => {
    render(<ParticipantsResults history={createBrowserHistory(history.push("/", state))}/>);
  });

  it('renders text', () => {
    render(<ParticipantsResults history={createBrowserHistory(history.push("/", state))}/>);
    expect(screen.getByText("Coding Test Results for: test@testmail.com")).toBeInTheDocument();
 });

 it('renders coding challenges text', () => {
    render(<ParticipantsResults history={createBrowserHistory(history.push("/", state))}/>);
    expect(screen.getByText("Coding Challenges")).toBeInTheDocument();
 });

  it('renders Title table column without crashing', () => {
    render(<ParticipantsResults history={createBrowserHistory(history.push("/", state))} />);
    expect(screen.getByText("Title")).toBeInTheDocument();
   });

   it('renders test cases table column without crashing', () => {
    render(<ParticipantsResults history={createBrowserHistory(history.push("/", state))} />);
    expect(screen.getByText("Test Cases Passed")).toBeInTheDocument();
   });

    it('renders question responses text', () => {
    render(<ParticipantsResults history={createBrowserHistory(history.push("/", state))}/>);
    expect(screen.getByText("Question Responses")).toBeInTheDocument();
 });
 it('renders number table column without crashing', () => {
    render(<ParticipantsResults history={createBrowserHistory(history.push("/", state))} />);
    expect(screen.getByText("No.")).toBeInTheDocument();
   });

   it('renders questions table column without crashing', () => {
    render(<ParticipantsResults history={createBrowserHistory(history.push("/", state))} />);
    expect(screen.getByText("Question")).toBeInTheDocument();
   });


});