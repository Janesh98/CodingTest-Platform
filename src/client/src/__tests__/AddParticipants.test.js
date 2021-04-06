import React from 'react';
import AddParticipants from '../components/AddParticipants';
import { createBrowserHistory } from "history";
import { render, screen, fireEvent, act, cleanup,} from "../test-utils";
import '@testing-library/jest-dom'

describe('rendering components', () => {

    const history = createBrowserHistory();
    const state = { TestName: 'testName1',
                    id: 1 }
    history.push("/", state);
  it('renders <AddParticipants /> without crashing', () => {
    render(<AddParticipants history={createBrowserHistory(history.push("/", state))}/>);
  });

  it('renders text', () => {
        render(<AddParticipants history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.getByText("Send Participants Email Invitation")).toBeInTheDocument();
 });

 it('renders textField without crashing', () => {
        render(<AddParticipants history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
 });

 it('renders send button without crashing', async () => {
    render(<AddParticipants history={createBrowserHistory(history.push("/", state))} />);
    expect(screen.queryByTestId("send")).toBeInTheDocument();
    });

it('TextField update', async ()=> {
    const wrapper = render(<AddParticipants />);
    const problem = wrapper.queryByTestId("send");

    act(() => {
        fireEvent.change(problem, { target: { value: 'email@test.com' } })
    });

    expect(problem.value).toBe('email@test.com');
    cleanup();
});

it('Email Button click', async ()=> {
    const mockHandleOnClick = jest.fn()
    const  wrapper  = render(<AddParticipants onClick={mockHandleOnClick()}/>);

    const button = wrapper.queryByTestId("send");
    act(() => {
    fireEvent.click(button);
     });
     expect(mockHandleOnClick).toHaveBeenCalledTimes(1);
 });

});