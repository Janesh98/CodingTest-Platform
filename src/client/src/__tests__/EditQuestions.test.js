import React from 'react';
import EditQuestions from '../components/EditQuestions';
import { render, screen, fireEvent, act, cleanup,} from "../test-utils";
import '@testing-library/jest-dom'
import { createBrowserHistory } from "history";

describe('rendering components', () => {

    const history = createBrowserHistory();
    const state = { testName: 'testName1',
                    questionsData: [
          {question: "who?"}, {question: "what?"}, {question: "where?"},
         ]}
    history.push("/", state);
    it('renders <EditQuestions /> without crashing', () => {
        render(<EditQuestions history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.queryByTestId("questions-container")).not.toBeNull();
 });

 it('renders setup questions text', () => {
        render(<EditQuestions history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.getByText("Video Interview Questions(optional)")).toBeInTheDocument();
 });

 it('renders question 1 text', () => {
        render(<EditQuestions history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.queryByTestId("Question 1 typography")).toHaveTextContent("Question 1");
 });
 it('renders question 2 test text', () => {
        render(<EditQuestions history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.queryByTestId("Question 2 typography")).toHaveTextContent("Question 2");
 });

 it('renders question 3 text', () => {
        render(<EditQuestions history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.queryByTestId("Question 3 typography")).toHaveTextContent("Question 3");
 });

 it('renders question 1 box without crashing', () => {
        render(<EditQuestions history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.getByLabelText("Question 1")).toBeInTheDocument();
 });

  it('renders question 2 box without crashing', () => {
        render(<EditQuestions history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.getByLabelText("Question 2")).toBeInTheDocument();
 });

  it('renders question 3 box without crashing', () => {
        render(<EditQuestions history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.getByLabelText("Question 3")).toBeInTheDocument();
 });

 it('renders save button without crashing', async () => {
    render(<EditQuestions history={createBrowserHistory(history.push("/", state))} />);
    expect(screen.queryByTestId("save")).toBeInTheDocument();
    });


    it('renders exit button without crashing', async () => {   
    render(<EditQuestions history={createBrowserHistory(history.push("/", state))} />); 
    expect(screen.queryByTestId("exit")).toBeInTheDocument();
    });

 it('Question 1 TextField have correct value', async ()=> {
    const wrapper = render(<EditQuestions />);
    const problem = wrapper.queryByTestId("Question 1");

    expect(problem.value).toBe('who?');
    cleanup();
});

it('Question 2 TextField have correct value', async ()=> {
    const wrapper = render(<EditQuestions />);
    const problem = wrapper.queryByTestId("Question 2");

    expect(problem.value).toBe('what?');
    cleanup();
});

it('Question 3 TextField have correct value', async ()=> {
    const wrapper = render(<EditQuestions />);
    const problem = wrapper.queryByTestId("Question 3");

    expect(problem.value).toBe('where?');
    cleanup();
})
it('Question 1 TextField update', async ()=> {
    const wrapper = render(<EditQuestions />);
    const problem = wrapper.queryByTestId("Question 1");

    act(() => {
        fireEvent.change(problem, { target: { value: 'how?' } })
    });

    expect(problem.value).toBe('how?');
    cleanup();
});

it('Question 2 TextField update', async ()=> {
    const wrapper = render(<EditQuestions />);
    const problem = wrapper.queryByTestId("Question 2");

    act(() => {
        fireEvent.change(problem, { target: { value: 'why?' } })
    });

    expect(problem.value).toBe('why?');
    cleanup();
});

it('Question 3 TextField update', async ()=> {
    const wrapper = render(<EditQuestions />);
    const problem = wrapper.queryByTestId("Question 3");

    act(() => {
        fireEvent.change(problem, { target: { value: 'when?' } })
    });

    expect(problem.value).toBe('when?');
    cleanup();
});

it('Save Button click', async ()=> {
    const mockHandleOnClick = jest.fn()
    const  wrapper  = render(<EditQuestions onClick={mockHandleOnClick()}/>);

    const button = wrapper.queryByTestId("save");
    act(() => {
    fireEvent.click(button);
     });
     expect(mockHandleOnClick).toHaveBeenCalledTimes(1);
 });

  it('Exit Button click', async ()=> {
    const mockHandleOnClick = jest.fn()
    const  wrapper  = render(<EditQuestions onClick={mockHandleOnClick()}/>);

    const button = wrapper.queryByTestId("exit");
    act(() => {
    fireEvent.click(button);
     });
     expect(mockHandleOnClick).toHaveBeenCalledTimes(1);
 });

});