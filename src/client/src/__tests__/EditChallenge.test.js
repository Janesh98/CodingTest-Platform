import React from 'react';
import EditChallenge  from '../components/EditChallenge';
import { render, screen, fireEvent, act, cleanup,} from "../test-utils";
import '@testing-library/jest-dom'
import { createBrowserHistory } from "history";

describe('rendering components', () => {

    const history = createBrowserHistory();
    const state = { TestName: 'testName1',
                    index: 0,
                    challengeData: [{ _id: 1,
          title: "test title",
          problemDescription: "test prob",
          inputFormat: "1 2 3",
          returnFormat: "5",
          constraints: "1 < n < 10",
          sampleInput: "1 2 3",
          sampleOutput: '5',
          exampleExplanation: "test example",
          testInput1: 1,
          testOutput1: 1,
          testInput2: 2,
          testOutput2: 2,
          testInput3: 3,
          testOutput3: 3,
          testInput4: 4,
          testOutput4: 4,
          testInput5: 5,
          testOutput5: 5,
          createdAt: "1/2/3",
        } ]}
    history.push("/", state);
    it('renders <EditChallenge /> without crashing', () => {
        render(<EditChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.queryByTestId("setup-container")).not.toBeNull();
 });

 it('renders setup test text', () => {
        render(<EditChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.getByText("Setup A New Coding Test")).toBeInTheDocument();
 });

 it('renders title text', () => {
        render(<EditChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.getByText("Challenge Title")).toBeInTheDocument();
 });
 it('renders problem text', () => {
        render(<EditChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.queryByTestId("Problem Description typography")).toHaveTextContent("Problem Description");
 });
 it('renders input format test text', () => {
        render(<EditChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.queryByTestId("Input Format typography")).toHaveTextContent("Input Format");
 });

 it('renders return format text', () => {
        render(<EditChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.queryByTestId("Return Format typography")).toHaveTextContent("Return Format");
 });
 it('renders constraints text', () => {
        render(<EditChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.queryByTestId("Constraints typography")).toHaveTextContent("Constraints");
 });
 it('renders sample input text', () => {
        render(<EditChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.queryByTestId("Sample Input typography")).toHaveTextContent("Sample Input");
 });

 it('renders sample output text', () => {
        render(<EditChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.queryByTestId("Sample Output typography")).toHaveTextContent("Sample Output");
 });

 it('renders example text', () => {
        render(<EditChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.queryByTestId("Example with Explanation typography")).toHaveTextContent("Example with Explanation");
 });

  it('renders test cases text', () => {
        render(<EditChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.getByText("Test Cases (Please provide at least 1 test case)")).toBeInTheDocument();
 });

 it('renders save button', () => {
        render(<EditChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.queryByTestId("save")).toBeInTheDocument();
 });

 it('renders exit button', () => {
        render(<EditChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.queryByTestId("exit")).toBeInTheDocument();
 });

 it('renders problem box without crashing', () => {
        render(<EditChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.getByLabelText("Problem Description")).toBeInTheDocument();
 });

 it('renders input format text box without crashing', () => {
        render(<EditChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.getByLabelText("Input Format")).toBeInTheDocument();
 });
 it('renders return format text box without crashing', () => {
        render(<EditChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.getByLabelText("Return Format")).toBeInTheDocument();
 });
 it('renders constraints text box without crashing', () => {
        render(<EditChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.getByLabelText("Constraints")).toBeInTheDocument();
 });
 it('renders sample input text box without crashing', () => {
        render(<EditChallenge history={createBrowserHistory(history.push("/", state))}/>)
        expect(screen.getByLabelText("Sample Input")).toBeInTheDocument();
 });
 it('renders sample output text box without crashing', () => {
        render(<EditChallenge history={createBrowserHistory(history.push("/", state))}/>);

        expect(screen.getByLabelText("Sample Output")).toBeInTheDocument();
 });
 it('renders example text box without crashing', () => {
        render(<EditChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.getByLabelText("Example with Explanation")).toBeInTheDocument();
 });

 it('Problem TextField have correct value', async ()=> {
    const wrapper = render(<EditChallenge />);
    const problem = wrapper.queryByTestId("Problem Description");

    expect(problem.value).toBe('test prob');
    cleanup();
});

it('input TextField have correct value', async ()=> {
    const wrapper = render(<EditChallenge />);
    const input = wrapper.queryByTestId("Input Format");
    expect(input.value).toBe('1 2 3');

    cleanup();
});
it('return TextField have correct value', async ()=> {
    const wrapper = render(<EditChallenge />);
    const returnFormat = wrapper.queryByTestId("Return Format");
    expect(returnFormat.value).toBe('5');
    cleanup();
});
it('Constraints TextField have correct value', async ()=> {
    const wrapper = render(<EditChallenge />);
    const constraints = wrapper.queryByTestId("Constraints");

    expect(constraints.value).toBe('1 < n < 10');
    cleanup();
});
it('Sample input TextField have correct value', async ()=> {
    const wrapper = render(<EditChallenge />);
    const sampleIn = wrapper.queryByTestId("Sample Input");

    expect(sampleIn.value).toBe('1 2 3');
    cleanup();
});
it('Sample output have correct value', async ()=> {
    const wrapper = render(<EditChallenge />);
    const sampleOut = wrapper.queryByTestId("Sample Output");

   expect(sampleOut.value).toBe('5');
    cleanup();
});
it('example have correct value', async ()=> {
    const wrapper = render(<EditChallenge />);
    const example = wrapper.queryByTestId("Example with Explanation");

   expect(example.value).toBe('test example');
    cleanup();
});

it('test case in 1 TextField have correct value', async ()=> {
    const wrapper = render(<EditChallenge />);
    const in1 = wrapper.queryByTestId("test input 1");

   expect(in1.value).toBe('1');
    cleanup();
});

it('test case in 2 TextField have correct value', async ()=> {
    const wrapper = render(<EditChallenge />);
    const in2 = wrapper.queryByTestId("test input 2");

   expect(in2.value).toBe('2');
    cleanup();
});
it('test case in 3 TextField have correct value', async ()=> {
    const wrapper = render(<EditChallenge />);
    const in3 = wrapper.queryByTestId("test input 3");

   expect(in3.value).toBe('3');
    cleanup();
});
it('test case in 4 TextField have correct value', async ()=> {
    const wrapper = render(<EditChallenge />);
    const in4 = wrapper.queryByTestId("test input 4");

   expect(in4.value).toBe('4');
    cleanup();
});
it('test case in 5 TextField have correct value', async ()=> {
    const wrapper = render(<EditChallenge />);
    const in5 = wrapper.queryByTestId("test input 5");
   expect(in5.value).toBe('5');
    cleanup();
});

it('test case out 1 TextField have correct value', async ()=> {
    const wrapper = render(<EditChallenge />);
    const out1 = wrapper.queryByTestId("test output 1");

   expect(out1.value).toBe('1');
    cleanup();
});

it('test case out 2 TextField have correct value', async ()=> {
    const wrapper = render(<EditChallenge />);
    const out2 = wrapper.queryByTestId("test output 2");

   expect(out2.value).toBe('2');
    cleanup();
});
it('test case out 3 TextField have correct value', async ()=> {
    const wrapper = render(<EditChallenge />);
    const out3 = wrapper.queryByTestId("test output 3");

   expect(out3.value).toBe('3');
    cleanup();
});
it('test case out 4 TextField have correct value', async ()=> {
    const wrapper = render(<EditChallenge />);
    const out4 = wrapper.queryByTestId("test input 4");

   expect(out4.value).toBe('4');
    cleanup();
});
it('test case out 5 TextField have correct value', async ()=> {
    const wrapper = render(<EditChallenge />);
    const out5 = wrapper.queryByTestId("test input 5");
   expect(out5.value).toBe('5');
    cleanup();
});

it('Problem TextField update', async ()=> {
    const wrapper = render(<EditChallenge />);
    const problem = wrapper.queryByTestId("Problem Description");

    act(() => {
        fireEvent.change(problem, { target: { value: 'test problem' } })
    });

    expect(problem.value).toBe('test problem');
    cleanup();
});

it('input format TextField update', async ()=> {
    const wrapper = render(<EditChallenge />);
    const input = wrapper.queryByTestId("Input Format");
   

    act(() => {
        fireEvent.change(input, { target: { value: 'test input' } })
    });

    expect(input.value).toBe('test input');


    cleanup();
});

it('return format TextField update', async ()=> {
    const wrapper = render(<EditChallenge />);
    const returnFormat = wrapper.queryByTestId("Return Format");

    act(() => {
        fireEvent.change(returnFormat, { target: { value: 'test return' } })
    });

    expect(returnFormat.value).toBe('test return');
    cleanup();
});

it('Constraints TextField update', async ()=> {
    const wrapper = render(<EditChallenge />);
    const constraints = wrapper.queryByTestId("Constraints");

    act(() => {
        fireEvent.change(constraints, { target: { value: 'test constraints' } })
    });
    expect(constraints.value).toBe('test constraints');
    cleanup();
});


it('Sample Input TextField update', async ()=> {
    const wrapper = render(<EditChallenge />);
    const sampleIn = wrapper.queryByTestId("Sample Input");   

    act(() => {
        fireEvent.change(sampleIn, { target: { value: 'test sample input' } })
    });

    expect(sampleIn.value).toBe('test sample input');
    cleanup();
});


it('Sample Output TextField update', async ()=> {
    const wrapper = render(<EditChallenge />);
    const sampleOut = wrapper.queryByTestId("Sample Output");

    act(() => {
        fireEvent.change(sampleOut, { target: { value: 'test sample output' } })
    });

    expect(sampleOut.value).toBe('test sample output');
    cleanup();
});


it('Example update', async ()=> {
    const wrapper = render(<EditChallenge />);
    const example = wrapper.queryByTestId("Example with Explanation");

    act(() => {
        fireEvent.change(example, { target: { value: 'test example' } })
    });

    expect(example.value).toBe('test example');
    cleanup();
});


it('Test input 1 update', async ()=> {
    const wrapper = render(<EditChallenge />);
    const in1 = wrapper.queryByTestId("test input 1");

    act(() => {
        fireEvent.change(in1, { target: { value: '5' } })
    });

    expect(in1.value).toBe('5');
    cleanup();
});

it('Test input 2 update', async ()=> {
    const wrapper = render(<EditChallenge />);
    const in2 = wrapper.queryByTestId("test input 2");

    act(() => {
        fireEvent.change(in2, { target: { value: '4' } })
    });

    expect(in2.value).toBe('4');
    cleanup();
});

it('Test input 3 update', async ()=> {
    const wrapper = render(<EditChallenge />);
    const in3 = wrapper.queryByTestId("test input 3");

    act(() => {
        fireEvent.change(in3, { target: { value: '3' } })
    });

    expect(in3.value).toBe('3');
    cleanup();
});

it('Test input 4 update', async ()=> {
    const wrapper = render(<EditChallenge />);
    const in4 = wrapper.queryByTestId("test input 4");

    act(() => {
        fireEvent.change(in4, { target: { value: '2' } })
    });

    expect(in4.value).toBe('2');
    cleanup();
});

it('Test input 5 update', async ()=> {
    const wrapper = render(<EditChallenge />);
    const in5 = wrapper.queryByTestId("test input 5");

    act(() => {
        fireEvent.change(in5, { target: { value: '1' } })
    });

    expect(in5.value).toBe('1');
    cleanup();
});

it('test output 1 update', async ()=> {
    const wrapper = render(<EditChallenge />);
    const out1 = wrapper.queryByTestId("test output 1");

    act(() => {
        fireEvent.change(out1, { target: { value: '5' } })
    });

    expect(out1.value).toBe('5');
    cleanup();
});

it('test output 2 update', async ()=> {
    const wrapper = render(<EditChallenge />);
    const out2 = wrapper.queryByTestId("test output 2");
    act(() => {
        fireEvent.change(out2, { target: { value: '4' } })
    });

    expect(out2.value).toBe('4');
    cleanup();
});

it('test output 3 update', async ()=> {
    const wrapper = render(<EditChallenge />);
    const out3 = wrapper.queryByTestId("test output 3");

    act(() => {
        fireEvent.change(out3, { target: { value: '3' } })
    });
    expect(out3.value).toBe('3');
    cleanup();
});

it('test output 4 update', async ()=> {
    const wrapper = render(<EditChallenge />);
    const out4 = wrapper.queryByTestId("test output 4");

    act(() => {
        fireEvent.change(out4, { target: { value: '2' } })
    });
    expect(out4.value).toBe('2');

    cleanup();
});

it('test output 5 update', async ()=> {
    const wrapper = render(<EditChallenge />);
    const out5 = wrapper.queryByTestId("test output 5");

    act(() => {
        fireEvent.change(out5, { target: { value: '1' } })
    });
    expect(out5.value).toBe('1');

    cleanup();
});

});