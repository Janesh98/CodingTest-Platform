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
          testInput6: 6,
          testOutput6: 6,
          testInput7: 7,
          testOutput7: 7,
          testInput8: 8,
          testOutput8: 8,
          testInput9: 9,
          testOutput9: 9,
          testInput10: 10,
          testOutput10: 10,
          timeout: 15,
          createdAt: "1/2/3",
        } ]}
    history.push("/", state);
    it('renders <EditChallenge /> without crashing', () => {
        render(<EditChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.queryByTestId("setup-grid")).not.toBeNull();
 });

 it('renders setup test text', () => {
        render(<EditChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.getByText("Edit Coding Challenge")).toBeInTheDocument();
 });

 it('renders timeout text', () => {
        render(<EditChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.getByText("Timeout for test cases (Minimum and default is 15 seconds)")).toBeInTheDocument();
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
        expect(screen.queryByTestId("Sample Input typography")).toHaveTextContent("Sample Input(Input is passed in as command line arguments)");
 });

 it('renders sample output text', () => {
        render(<EditChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.queryByTestId("Sample Output typography")).toHaveTextContent("Sample Output(Ouptut is expected to be printed to std out to allow verification of test cases)");
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

 it('renders timeout text box without crashing', () => {
        render(<EditChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.queryByTestId("timeout")).toBeInTheDocument();
 });

 it('timeout TextField have correct value', async ()=> {
    const wrapper = render(<EditChallenge history={createBrowserHistory(history.push("/", state))}/>);
    const timeout = wrapper.queryByTestId("timeout");

   expect(timeout.value).toBe('15');
    cleanup();
});

it('timeout TextField update', async ()=> {
    const wrapper = render(<EditChallenge history={createBrowserHistory(history.push("/", state))}/>);
    const input = wrapper.queryByTestId("timeout");
   

    act(() => {
        fireEvent.change(input, { target: { value: '1' } })
    });

    expect(input.value).toBe('1');


    cleanup();
});

  it('Test input 1 check', async ()=> {
    const wrapper = render(<EditChallenge />);
    const in1 = wrapper.queryByTestId("test input 1");
    expect(in1).toBeInTheDocument();
    cleanup();
});

 it('Test input 2 check', async ()=> {
    const wrapper = render(<EditChallenge />);
    const in2 = wrapper.queryByTestId("test input 2");
    expect(in2).toBeInTheDocument();
    cleanup();
});

it('Test input 3 check', async ()=> {
    const wrapper = render(<EditChallenge />);
    const in3 = wrapper.queryByTestId("test input 3");
    expect(in3).toBeInTheDocument();
    cleanup();
});

it('Test input 4 check', async ()=> {
    const wrapper = render(<EditChallenge />);
    const in4 = wrapper.queryByTestId("test input 4");
    expect(in4).toBeInTheDocument();
    cleanup();
});

it('Test input 5 check', async ()=> {
    const wrapper = render(<EditChallenge />);
    const in5 = wrapper.queryByTestId("test input 5");
    expect(in5).toBeInTheDocument();
    cleanup();
});

it('Test input 6 check', async ()=> {
    const wrapper = render(<EditChallenge />);
    const in6 = wrapper.queryByTestId("test input 6");
    expect(in6).toBeInTheDocument();
    cleanup();
});

it('Test input 7 check', async ()=> {
    const wrapper = render(<EditChallenge />);
    const in7 = wrapper.queryByTestId("test input 7");
    expect(in7).toBeInTheDocument();
    cleanup();
});

it('Test input 8 check', async ()=> {
    const wrapper = render(<EditChallenge />);
    const in8 = wrapper.queryByTestId("test input 8");
    expect(in8).toBeInTheDocument();
    cleanup();
});

it('Test input 9 check', async ()=> {
    const wrapper = render(<EditChallenge />);
    const in9 = wrapper.queryByTestId("test input 9");
    expect(in9).toBeInTheDocument();
    cleanup();
});

it('Test input 10 check', async ()=> {
    const wrapper = render(<EditChallenge />);
    const in10 = wrapper.queryByTestId("test input 10");
    expect(in10).toBeInTheDocument();
    cleanup();
});

it('test output 1 check', async ()=> {
    const wrapper = render(<EditChallenge />);
    const out1 = wrapper.queryByTestId("test output 1");
    expect(out1).toBeInTheDocument();
    cleanup();
});

it('test output 2 check', async ()=> {
    const wrapper = render(<EditChallenge />);
    const out2 = wrapper.queryByTestId("test output 2");
    expect(out2).toBeInTheDocument();
    cleanup();
});

it('test output 3 check', async ()=> {
    const wrapper = render(<EditChallenge />);
    const out3 = wrapper.queryByTestId("test output 3");
    expect(out3).toBeInTheDocument();
    cleanup();
});

it('test output 4 check', async ()=> {
    const wrapper = render(<EditChallenge />);
    const out4 = wrapper.queryByTestId("test output 4");
    expect(out4).toBeInTheDocument();
    cleanup();
});

it('test output 5 check', async ()=> {
    const wrapper = render(<EditChallenge />);
    const out5 = wrapper.queryByTestId("test output 5");
    expect(out5).toBeInTheDocument();
    cleanup();
});

it('test output 6 check', async ()=> {
    const wrapper = render(<EditChallenge />);
    const out6 = wrapper.queryByTestId("test output 6");
    expect(out6).toBeInTheDocument();
    cleanup();
});

it('test output 7 check', async ()=> {
    const wrapper = render(<EditChallenge />);
    const out7 = wrapper.queryByTestId("test output 7");
    expect(out7).toBeInTheDocument();
    cleanup();
});

it('test output 8 check', async ()=> {
    const wrapper = render(<EditChallenge />);
    const out8 = wrapper.queryByTestId("test output 8");
    expect(out8).toBeInTheDocument();
    cleanup();
});

it('test output 9 check', async ()=> {
    const wrapper = render(<EditChallenge />);
    const out9 = wrapper.queryByTestId("test output 9");
    expect(out9).toBeInTheDocument();
    cleanup();
});

it('test output 10 check', async ()=> {
    const wrapper = render(<EditChallenge />);
    const out5 = wrapper.queryByTestId("test output 10");
    expect(out5).toBeInTheDocument();
    cleanup();
});

  it('renders add button without crashing', async () => {
    
    render(<EditChallenge history={createBrowserHistory(history.push("/", state))} />);
 
    expect(screen.queryByTestId("add")).toBeInTheDocument();

    });

    it('renders remove button without crashing', async () => {
    
    render(<EditChallenge history={createBrowserHistory(history.push("/", state))} />);

    expect(screen.queryByTestId("remove")).toBeInTheDocument();

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

it('test case in 6 TextField have correct value', async ()=> {
    const wrapper = render(<EditChallenge />);
    const in6 = wrapper.queryByTestId("test input 6");
   expect(in6.value).toBe('6');
    cleanup();
});

it('test case in 7 TextField have correct value', async ()=> {
    const wrapper = render(<EditChallenge />);
    const in7 = wrapper.queryByTestId("test input 7");
   expect(in7.value).toBe('7');
    cleanup();
});

it('test case in 8 TextField have correct value', async ()=> {
    const wrapper = render(<EditChallenge />);
    const in8 = wrapper.queryByTestId("test input 8");
   expect(in8.value).toBe('8');
    cleanup();
});

it('test case in 9 TextField have correct value', async ()=> {
    const wrapper = render(<EditChallenge />);
    const in9 = wrapper.queryByTestId("test input 9");
   expect(in9.value).toBe('9');
    cleanup();
});

it('test case in 10 TextField have correct value', async ()=> {
    const wrapper = render(<EditChallenge />);
    const in10 = wrapper.queryByTestId("test input 10");
   expect(in10.value).toBe('10');
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
it('test case out 6 TextField have correct value', async ()=> {
    const wrapper = render(<EditChallenge />);
    const out6 = wrapper.queryByTestId("test input 6");
   expect(out6.value).toBe('6');
    cleanup();
});
it('test case out 7 TextField have correct value', async ()=> {
    const wrapper = render(<EditChallenge />);
    const out7 = wrapper.queryByTestId("test input 7");
   expect(out7.value).toBe('7');
    cleanup();
});
it('test case out 8 TextField have correct value', async ()=> {
    const wrapper = render(<EditChallenge />);
    const out8 = wrapper.queryByTestId("test input 8");
   expect(out8.value).toBe('8');
    cleanup();
});
it('test case out 9 TextField have correct value', async ()=> {
    const wrapper = render(<EditChallenge />);
    const out9 = wrapper.queryByTestId("test input 9");
   expect(out9.value).toBe('9');
    cleanup();
});
it('test case out 10 TextField have correct value', async ()=> {
    const wrapper = render(<EditChallenge />);
    const out10 = wrapper.queryByTestId("test input 10");
   expect(out10.value).toBe('10');
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

it('Test input 6 update', async ()=> {
    const wrapper = render(<EditChallenge />);
    const in6 = wrapper.queryByTestId("test input 6");

    act(() => {
        fireEvent.change(in6, { target: { value: '1' } })
    });

    expect(in6.value).toBe('1');
    cleanup();
});

it('Test input 7 update', async ()=> {
    const wrapper = render(<EditChallenge />);
    const in7 = wrapper.queryByTestId("test input 7");

    act(() => {
        fireEvent.change(in7, { target: { value: '1' } })
    });

    expect(in7.value).toBe('1');
    cleanup();
});

it('Test input 8 update', async ()=> {
    const wrapper = render(<EditChallenge />);
    const in8 = wrapper.queryByTestId("test input 8");

    act(() => {
        fireEvent.change(in8, { target: { value: '1' } })
    });

    expect(in8.value).toBe('1');
    cleanup();
});

it('Test input 9 update', async ()=> {
    const wrapper = render(<EditChallenge />);
    const in9 = wrapper.queryByTestId("test input 9");

    act(() => {
        fireEvent.change(in9, { target: { value: '1' } })
    });

    expect(in9.value).toBe('1');
    cleanup();
});

it('Test input 10 update', async ()=> {
    const wrapper = render(<EditChallenge />);
    const in10 = wrapper.queryByTestId("test input 10");

    act(() => {
        fireEvent.change(in10, { target: { value: '1' } })
    });

    expect(in10.value).toBe('1');
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

it('test output 6 update', async ()=> {
    const wrapper = render(<EditChallenge />);
    const out6 = wrapper.queryByTestId("test output 6");

    act(() => {
        fireEvent.change(out6, { target: { value: '1' } })
    });
    expect(out6.value).toBe('1');

    cleanup();
});

it('test output 7 update', async ()=> {
    const wrapper = render(<EditChallenge />);
    const out7 = wrapper.queryByTestId("test output 7");

    act(() => {
        fireEvent.change(out7, { target: { value: '1' } })
    });
    expect(out7.value).toBe('1');

    cleanup();
});

it('test output 8 update', async ()=> {
    const wrapper = render(<EditChallenge />);
    const out8 = wrapper.queryByTestId("test output 8");

    act(() => {
        fireEvent.change(out8, { target: { value: '1' } })
    });
    expect(out8.value).toBe('1');

    cleanup();
});

it('test output 9 update', async ()=> {
    const wrapper = render(<EditChallenge />);
    const out9 = wrapper.queryByTestId("test output 9");

    act(() => {
        fireEvent.change(out9, { target: { value: '1' } })
    });
    expect(out9.value).toBe('1');

    cleanup();
});

it('test output 10 update', async ()=> {
    const wrapper = render(<EditChallenge />);
    const out10 = wrapper.queryByTestId("test output 10");

    act(() => {
        fireEvent.change(out10, { target: { value: '1' } })
    });
    expect(out10.value).toBe('1');

    cleanup();
});

it('remove Button click', async ()=> {
    const mockHandleOnClick = jest.fn()
    const  wrapper  = render(<EditChallenge onClick={mockHandleOnClick()}/>);

    const button = wrapper.queryByTestId("remove");
    act(() => {
    fireEvent.click(button);
     });
     expect(mockHandleOnClick).toHaveBeenCalledTimes(1);
 });

it('Save Button click', async ()=> {
    const mockHandleOnClick = jest.fn()
    const  wrapper  = render(<EditChallenge onClick={mockHandleOnClick()}/>);

    const button = wrapper.queryByTestId("save");
    act(() => {
    fireEvent.click(button);
     });
     expect(mockHandleOnClick).toHaveBeenCalledTimes(1);
 });

  it('Exit Button click', async ()=> {
    const mockHandleOnClick = jest.fn()
    const  wrapper  = render(<EditChallenge onClick={mockHandleOnClick()}/>);

    const button = wrapper.queryByTestId("exit");
    act(() => {
    fireEvent.click(button);
     });
     expect(mockHandleOnClick).toHaveBeenCalledTimes(1);
 });

});