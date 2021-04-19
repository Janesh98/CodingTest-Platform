import React from 'react';
import ParticipantsList from '../components/ParticipantsList';
import { createBrowserHistory } from "history";
import { render, screen, fireEvent, act, cleanup,} from "../test-utils";
import '@testing-library/jest-dom'

describe('rendering components', () => {

    const history = createBrowserHistory();
    const state = { id: 1 }
    history.push("/", state);
  it('renders <AddParticipants /> without crashing', () => {
    render(<ParticipantsList history={createBrowserHistory(history.push("/", state))}/>);
  });

  it('renders text', () => {
        render(<ParticipantsList history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.getByText("Coding Test Participants")).toBeInTheDocument();
 });

it('renders name table column without crashing', () => {
  render(<ParticipantsList history={createBrowserHistory(history.push("/", state))} />);
  expect(screen.getByText("Participant")).toBeInTheDocument();
 });

});