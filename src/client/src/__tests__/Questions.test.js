import React from 'react';
import Questions from '../components/Questions';
import { render, screen, fireEvent, act, cleanup,} from "../test-utils";
import '@testing-library/jest-dom'
import { createBrowserHistory } from "history";

describe('rendering components', () => {

    const history = createBrowserHistory();
    const state = { TestName: 'testName1' }
    history.push("/", state);
    it('renders <Questions /> without crashing', () => {
        render(<Questions history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.queryByTestId("questions-container")).not.toBeNull();
 });

 it('renders setup questions text', () => {
        render(<Questions history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.getByText("Video Interview Questions(optional)")).toBeInTheDocument();
 });

 it('renders question 1 text', () => {
        render(<Questions history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.queryByTestId("Question 1 typography")).toHaveTextContent("Question 1");
 });
 it('renders question 2 test text', () => {
        render(<Questions history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.queryByTestId("Question 2 typography")).toHaveTextContent("Question 2");
 });

 it('renders question 3 text', () => {
        render(<Questions history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.queryByTestId("Question 3 typography")).toHaveTextContent("Question 3");
 });

 it('renders question 1 box without crashing', () => {
        render(<Questions history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.getByLabelText("Question 1")).toBeInTheDocument();
 });

  it('renders question 2 box without crashing', () => {
        render(<Questions history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.getByLabelText("Question 2")).toBeInTheDocument();
 });

  it('renders question 3 box without crashing', () => {
        render(<Questions history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.getByLabelText("Question 3")).toBeInTheDocument();
 });

 it('renders save button without crashing', async () => {
    render(<Questions history={createBrowserHistory(history.push("/", state))} />);
    expect(screen.queryByTestId("save")).toBeInTheDocument();
    });


    it('renders exit button without crashing', async () => {   
    render(<Questions history={createBrowserHistory(history.push("/", state))} />); 
    expect(screen.queryByTestId("exit")).toBeInTheDocument();
    });


it('Question 1 TextField update', async ()=> {
    const wrapper = render(<Questions />);
    const problem = wrapper.queryByTestId("Question 1");

    act(() => {
        fireEvent.change(problem, { target: { value: 'how?' } })
    });

    expect(problem.value).toBe('how?');
    cleanup();
});

it('Question 2 TextField update', async ()=> {
    const wrapper = render(<Questions />);
    const problem = wrapper.queryByTestId("Question 2");

    act(() => {
        fireEvent.change(problem, { target: { value: 'why?' } })
    });

    expect(problem.value).toBe('why?');
    cleanup();
});

it('Question 3 TextField update', async ()=> {
    const wrapper = render(<Questions />);
    const problem = wrapper.queryByTestId("Question 3");

    act(() => {
        fireEvent.change(problem, { target: { value: 'when?' } })
    });

    expect(problem.value).toBe('when?');
    cleanup();
});


});