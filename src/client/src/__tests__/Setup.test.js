import React from 'react';
import Setup  from '../components/Setup';
import { render, screen, fireEvent, act, cleanup} from "../test-utils";
import { createBrowserHistory } from "history";
import '@testing-library/jest-dom'

describe('rendering components', () => {
    const history = createBrowserHistory();
    const state = { testName: 'testName1' }
    history.push("/", state);
    it('renders <Create /> without crashing', async () => {
    
    render(<Setup history={createBrowserHistory(history.push("/", state))} />);
 
    expect(screen.queryByTestId("setup-container")).not.toBeNull();
    expect(screen.getByText("Setup A New Coding Test")).toBeInTheDocument();
    expect(screen.getByText("Challenge Title")).toBeInTheDocument();
    expect(screen.queryByTestId("Problem Description typography")).toHaveTextContent("Problem Description");
    expect(screen.queryByTestId("Input Format typography")).toHaveTextContent("Input Format");
    expect(screen.queryByTestId("Return Format typography")).toHaveTextContent("Return Format");
    expect(screen.queryByTestId("Constraints typography")).toHaveTextContent("Constraints");
    expect(screen.queryByTestId("Sample Input typography")).toHaveTextContent("Sample Input");
    expect(screen.queryByTestId("Sample Output typography")).toHaveTextContent("Sample Output");
    expect(screen.queryByTestId("Example with Explanation typography")).toHaveTextContent("Example with Explanation");
    expect(screen.queryByTestId("continue")).toBeInTheDocument();
    expect(screen.queryByTestId("save")).toBeInTheDocument();
    expect(screen.queryByTestId("exit")).toBeInTheDocument();

    expect(screen.getByLabelText("Problem Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Input Format")).toBeInTheDocument();
    expect(screen.getByLabelText("Return Format")).toBeInTheDocument();
    expect(screen.getByLabelText("Constraints")).toBeInTheDocument();
    expect(screen.getByLabelText("Sample Input")).toBeInTheDocument();
    expect(screen.getByLabelText("Sample Output")).toBeInTheDocument();
    expect(screen.getByLabelText("Example with Explanation")).toBeInTheDocument();
    expect(screen.getByText("Test Cases (Please provide at least 1 test case)")).toBeInTheDocument();

    });

    it('TextFields update', async ()=> {
    const wrapper = render(<Setup />);
    const problem = wrapper.queryByTestId("Problem Description");
    const input = wrapper.queryByTestId("Input Format");
    const returnFormat = wrapper.queryByTestId("Return Format");
    const constraints = wrapper.queryByTestId("Constraints");
    const sampleIn = wrapper.queryByTestId("Sample Input");
    const sampleOut = wrapper.queryByTestId("Sample Output");
    const example = wrapper.queryByTestId("Example with Explanation");
    const in1 = wrapper.queryByTestId("test input 1");
    const in2 = wrapper.queryByTestId("test input 2");
    const in3 = wrapper.queryByTestId("test input 3");
    const in4 = wrapper.queryByTestId("test input 4");
    const in5 = wrapper.queryByTestId("test input 5");
    const out1 = wrapper.queryByTestId("test output 1");
    const out2 = wrapper.queryByTestId("test output 2");
    const out3 = wrapper.queryByTestId("test output 3");
    const out4 = wrapper.queryByTestId("test output 4");
    const out5 = wrapper.queryByTestId("test output 5");

    act(() => {
        fireEvent.change(problem, { target: { value: 'test problem' } })
        fireEvent.change(input, { target: { value: 'test input' } })
        fireEvent.change(returnFormat, { target: { value: 'test return' } })
        fireEvent.change(constraints, { target: { value: 'test constraints' } })
        fireEvent.change(sampleIn, { target: { value: 'test sample input' } })
        fireEvent.change(sampleOut, { target: { value: 'test sample output' } })
        fireEvent.change(example, { target: { value: 'test example' } })
        fireEvent.change(in1, { target: { value: '1' } })
        fireEvent.change(in2, { target: { value: '2' } })
        fireEvent.change(in3, { target: { value: '3' } })
        fireEvent.change(in4, { target: { value: '4' } })
        fireEvent.change(in5, { target: { value: '5' } })
        fireEvent.change(out1, { target: { value: '1' } })
        fireEvent.change(out2, { target: { value: '2' } })
        fireEvent.change(out3, { target: { value: '3' } })
        fireEvent.change(out4, { target: { value: '4' } })
        fireEvent.change(out5, { target: { value: '5' } })

    });
    expect(problem.value).toBe('test problem');
    expect(input.value).toBe('test input');
    expect(returnFormat.value).toBe('test return');
    expect(constraints.value).toBe('test constraints');
    expect(sampleIn.value).toBe('test sample input');
    expect(sampleOut.value).toBe('test sample output');
    expect(example.value).toBe('test example');
    expect(in1.value).toBe('1');
    expect(in2.value).toBe('2');
    expect(in3.value).toBe('3');
    expect(in4.value).toBe('4');
    expect(in5.value).toBe('5');
    expect(out1.value).toBe('1');
    expect(out2.value).toBe('2');
    expect(out3.value).toBe('3');
    expect(out4.value).toBe('4');
    expect(out5.value).toBe('5');

    cleanup();
});
});