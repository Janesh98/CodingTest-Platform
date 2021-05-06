import React from 'react';
import NewChallenge  from '../components/NewChallenge';
import { render, screen, fireEvent, act, cleanup} from "../test-utils";
import { createBrowserHistory } from "history";
import '@testing-library/jest-dom'

describe('rendering components', () => {
    const history = createBrowserHistory();
    const state = { testName: 'testName1' }
    history.push("/", state);
    it('renders <NewChallenge /> without crashing', () => {
        render(<NewChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.queryByTestId("setup-grid")).not.toBeNull();
 });

 it('renders setup test text', () => {
        render(<NewChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.getByText("Add A New Coding Challenge")).toBeInTheDocument();
 });

 it('renders timeout text', () => {
        render(<NewChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.getByText("Timeout for test cases (Minimum and default is 15 seconds)")).toBeInTheDocument();
 });

 it('renders title text', () => {
        render(<NewChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.getByText("Challenge Title")).toBeInTheDocument();
 });
 it('renders problem text', () => {
        render(<NewChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.queryByTestId("Problem Description typography")).toHaveTextContent("Problem Description");
 });
 it('renders input format test text', () => {
        render(<NewChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.queryByTestId("Input Format typography")).toHaveTextContent("Input Format");
 });

 it('renders return format text', () => {
        render(<NewChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.queryByTestId("Return Format typography")).toHaveTextContent("Return Format");
 });
 it('renders constraints text', () => {
        render(<NewChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.queryByTestId("Constraints typography")).toHaveTextContent("Constraints");
 });
 it('renders sample input text', () => {
        render(<NewChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.queryByTestId("Sample Input typography")).toHaveTextContent("Sample Input(Input is passed in as command line arguments)");
 });

 it('renders sample output text', () => {
        render(<NewChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.queryByTestId("Sample Output typography")).toHaveTextContent("Sample Output(Ouptut is expected to be printed to std out to allow verification of test cases)");
 });

 it('renders example text', () => {
        render(<NewChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.queryByTestId("Example with Explanation typography")).toHaveTextContent("Example with Explanation");
 });

  it('renders test cases text', () => {
        render(<NewChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.getByText("Test Cases (Please provide at least 1 test case)")).toBeInTheDocument();
 });

   it('renders problem box without crashing', () => {
        render(<NewChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.getByLabelText("Problem Description")).toBeInTheDocument();
 });

 it('renders input format text box without crashing', () => {
        render(<NewChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.getByLabelText("Input Format")).toBeInTheDocument();
 });
 it('renders return format text box without crashing', () => {
        render(<NewChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.getByLabelText("Return Format")).toBeInTheDocument();
 });
 it('renders constraints text box without crashing', () => {
        render(<NewChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.getByLabelText("Constraints")).toBeInTheDocument();
 });
 it('renders sample input text box without crashing', () => {
        render(<NewChallenge history={createBrowserHistory(history.push("/", state))}/>)
        expect(screen.getByLabelText("Sample Input")).toBeInTheDocument();
 });
 it('renders sample output text box without crashing', () => {
        render(<NewChallenge history={createBrowserHistory(history.push("/", state))}/>);

        expect(screen.getByLabelText("Sample Output")).toBeInTheDocument();
 });
 it('renders example text box without crashing', () => {
        render(<NewChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.getByLabelText("Example with Explanation")).toBeInTheDocument();
 });

  it('renders timeout text box without crashing', () => {
        render(<NewChallenge history={createBrowserHistory(history.push("/", state))}/>);
        expect(screen.queryByTestId("timeout")).toBeInTheDocument();
 });

 it('timeout TextField have correct value', async ()=> {
    const wrapper = render(<NewChallenge history={createBrowserHistory(history.push("/", state))}/>);
    const timeout = wrapper.queryByTestId("timeout");

   expect(timeout.value).toBe('15');
    cleanup();
});

it('timeout TextField update', async ()=> {
    const wrapper = render(<NewChallenge history={createBrowserHistory(history.push("/", state))}/>);
    const input = wrapper.queryByTestId("timeout");
   

    act(() => {
        fireEvent.change(input, { target: { value: '1' } })
    });

    expect(input.value).toBe('1');


    cleanup();
});

    it('renders save button without crashing', async () => {
    
    render(<NewChallenge history={createBrowserHistory(history.push("/", state))} />);
 
    expect(screen.queryByTestId("save")).toBeInTheDocument();

    });


    it('renders exit button without crashing', async () => {
    
    render(<NewChallenge history={createBrowserHistory(history.push("/", state))} />);
 
    expect(screen.queryByTestId("exit")).toBeInTheDocument();

    });

    it('renders add button without crashing', async () => {
    
    render(<NewChallenge history={createBrowserHistory(history.push("/", state))} />);
 
    expect(screen.queryByTestId("add")).toBeInTheDocument();

    });

    it('renders remove button without crashing', async () => {
    
    render(<NewChallenge history={createBrowserHistory(history.push("/", state))} />);
 
    expect(screen.queryByTestId("remove")).toBeInTheDocument();

    });

it('Problem TextField update', async ()=> {
    const wrapper = render(<NewChallenge />);
    const problem = wrapper.queryByTestId("Problem Description");

    act(() => {
        fireEvent.change(problem, { target: { value: 'test problem' } })
    });

    expect(problem.value).toBe('test problem');
    cleanup();
});

it('input format TextField update', async ()=> {
    const wrapper = render(<NewChallenge />);
    const input = wrapper.queryByTestId("Input Format");
   

    act(() => {
        fireEvent.change(input, { target: { value: 'test input' } })
    });

    expect(input.value).toBe('test input');


    cleanup();
});

it('return format TextField update', async ()=> {
    const wrapper = render(<NewChallenge />);
    const returnFormat = wrapper.queryByTestId("Return Format");

    act(() => {
        fireEvent.change(returnFormat, { target: { value: 'test return' } })
    });

    expect(returnFormat.value).toBe('test return');
    cleanup();
});

it('Constraints TextField update', async ()=> {
    const wrapper = render(<NewChallenge />);
    const constraints = wrapper.queryByTestId("Constraints");

    act(() => {
        fireEvent.change(constraints, { target: { value: 'test constraints' } })
    });
    expect(constraints.value).toBe('test constraints');
    cleanup();
});


it('Sample Input TextField update', async ()=> {
    const wrapper = render(<NewChallenge />);
    const sampleIn = wrapper.queryByTestId("Sample Input");   

    act(() => {
        fireEvent.change(sampleIn, { target: { value: 'test sample input' } })
    });

    expect(sampleIn.value).toBe('test sample input');
    cleanup();
});


it('Sample Output TextField update', async ()=> {
    const wrapper = render(<NewChallenge />);
    const sampleOut = wrapper.queryByTestId("Sample Output");

    act(() => {
        fireEvent.change(sampleOut, { target: { value: 'test sample output' } })
    });

    expect(sampleOut.value).toBe('test sample output');
    cleanup();
});


it('Example update', async ()=> {
    const wrapper = render(<NewChallenge />);
    const example = wrapper.queryByTestId("Example with Explanation");

    act(() => {
        fireEvent.change(example, { target: { value: 'test example' } })
    });

    expect(example.value).toBe('test example');
    cleanup();
});


it('Test input 1 update', async ()=> {
    const wrapper = render(<NewChallenge />);
    const in1 = wrapper.queryByTestId("test input 1");

    act(() => {
        fireEvent.change(in1, { target: { value: '1' } })
    });

    expect(in1.value).toBe('1');
    cleanup();
});

it('Test input 2 check', async ()=> {
    const wrapper = render(<NewChallenge />);
    const in2 = wrapper.queryByTestId("test input 2");
    expect(in2).toBeNull();
    cleanup();
});

it('Test input 3 check', async ()=> {
    const wrapper = render(<NewChallenge />);
    const in3 = wrapper.queryByTestId("test input 3");
    expect(in3).toBeNull();
    cleanup();
});

it('Test input 4 check', async ()=> {
    const wrapper = render(<NewChallenge />);
    const in4 = wrapper.queryByTestId("test input 4");
    expect(in4).toBeNull();
    cleanup();
});

it('Test input 5 check', async ()=> {
    const wrapper = render(<NewChallenge />);
    const in5 = wrapper.queryByTestId("test input 5");
    expect(in5).toBeNull();
    cleanup();
});

it('Test input 6 check', async ()=> {
    const wrapper = render(<NewChallenge />);
    const in6 = wrapper.queryByTestId("test input 6");
    expect(in6).toBeNull();
    cleanup();
});

it('Test input 7 check', async ()=> {
    const wrapper = render(<NewChallenge />);
    const in7 = wrapper.queryByTestId("test input 7");
    expect(in7).toBeNull();
    cleanup();
});

it('Test input 8 check', async ()=> {
    const wrapper = render(<NewChallenge />);
    const in8 = wrapper.queryByTestId("test input 8");
    expect(in8).toBeNull();
    cleanup();
});

it('Test input 9 check', async ()=> {
    const wrapper = render(<NewChallenge />);
    const in9 = wrapper.queryByTestId("test input 9");
    expect(in9).toBeNull();
    cleanup();
});

it('Test input 10 check', async ()=> {
    const wrapper = render(<NewChallenge />);
    const in10 = wrapper.queryByTestId("test input 10");
    expect(in10).toBeNull();
    cleanup();
});

it('test output 1 update', async ()=> {
    const wrapper = render(<NewChallenge />);
    const out1 = wrapper.queryByTestId("test output 1");

    act(() => {
        fireEvent.change(out1, { target: { value: '1' } })
    });

    expect(out1.value).toBe('1');
    cleanup();
});

it('test output 2 check', async ()=> {
    const wrapper = render(<NewChallenge />);
    const out2 = wrapper.queryByTestId("test output 2");
    expect(out2).toBeNull();
    cleanup();
});

it('test output 3 check', async ()=> {
    const wrapper = render(<NewChallenge />);
    const out3 = wrapper.queryByTestId("test output 3");
    expect(out3).toBeNull();
    cleanup();
});

it('test output 4 check', async ()=> {
    const wrapper = render(<NewChallenge />);
    const out4 = wrapper.queryByTestId("test output 4");
    expect(out4).toBeNull();
    cleanup();
});

it('test output 5 check', async ()=> {
    const wrapper = render(<NewChallenge />);
    const out5 = wrapper.queryByTestId("test output 5");
    expect(out5).toBeNull();
    cleanup();
});

it('test output 6 check', async ()=> {
    const wrapper = render(<NewChallenge />);
    const out6 = wrapper.queryByTestId("test output 6");
    expect(out6).toBeNull();
    cleanup();
});

it('test output 7 check', async ()=> {
    const wrapper = render(<NewChallenge />);
    const out7 = wrapper.queryByTestId("test output 7");
    expect(out7).toBeNull();
    cleanup();
});

it('test output 8 check', async ()=> {
    const wrapper = render(<NewChallenge />);
    const out8 = wrapper.queryByTestId("test output 8");
    expect(out8).toBeNull();
    cleanup();
});

it('test output 9 check', async ()=> {
    const wrapper = render(<NewChallenge />);
    const out9 = wrapper.queryByTestId("test output 9");
    expect(out9).toBeNull();
    cleanup();
});

it('test output 10 check', async ()=> {
    const wrapper = render(<NewChallenge />);
    const out5 = wrapper.queryByTestId("test output 10");
    expect(out5).toBeNull();
    cleanup();
});

it('add Button click', async ()=> {
    const mockHandleOnClick = jest.fn()
    const  wrapper  = render(<NewChallenge onClick={mockHandleOnClick()}/>);

    const button = wrapper.queryByTestId("add");
    act(() => {
    fireEvent.click(button);
     });
     expect(mockHandleOnClick).toHaveBeenCalledTimes(1);
 });

it('Save Button click', async ()=> {
    const mockHandleOnClick = jest.fn()
    const  wrapper  = render(<NewChallenge onClick={mockHandleOnClick()}/>);

    const button = wrapper.queryByTestId("save");
    act(() => {
    fireEvent.click(button);
     });
     expect(mockHandleOnClick).toHaveBeenCalledTimes(1);
 });

  it('Exit Button click', async ()=> {
    const mockHandleOnClick = jest.fn()
    const  wrapper  = render(<NewChallenge onClick={mockHandleOnClick()}/>);

    const button = wrapper.queryByTestId("exit");
    act(() => {
    fireEvent.click(button);
     });
     expect(mockHandleOnClick).toHaveBeenCalledTimes(1);
 });
});