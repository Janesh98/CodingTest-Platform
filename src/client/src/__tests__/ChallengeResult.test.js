import React from 'react';
import ChallengeResult from '../components/ChallengeResult';
import { createBrowserHistory } from "history";
import { render, screen } from "../test-utils";
import '@testing-library/jest-dom'

describe('rendering components', () => {

    const history = createBrowserHistory();
    const state = { challengeData: {code: "aW1wb3J0IHN5cw0KDQp0b3RhbCA9IDANCmZvciBsaW5lIGluIHN5cy5hcmd2WzE6XToNCiAgICBmb3IgbiBpbiBsaW5lOg0KICAgICAgICB0b3RhbCArPSBpbnQobikNCg0KcHJpbnQodG90YWwp",
                    codeOutput:[{time: 0.53, memory: "30752", stdout: "Mg==", stderr: ""},{time: 0.53, memory: "30752", stdout: "Mg==", stderr: ""},{time: 0.53, memory: "30752", stdout: "Mg==", stderr: ""},{time: 0.53, memory: "30752", stdout: "Mg==", stderr: ""},{time: 0.53, memory: "30752", stdout: "Mg==", stderr: ""}],
                    constraints: "String will always contain digits",
                    exampleExplanation: "1 + 2 + 3 = 6",
                    inputFormat: "String",
                    language: "Python",
                    problemDescription: "Given a string of digits, print the sum of the digits to stdout",
                    returnFormat: "Integer",
                    sampleInput: "123",
                    sampleOutput: "6",
                    testCases:[{input: "11", output: "21"},{input: "111", output: "211"},{input: "113", output: "23"},{input: "114", output: "24"},{input: "115", output: "25"}],
                    testInput1: "11",
                    testInput2: "345",
                    testInput3: "23",
                    testInput4: "1234",
                    testInput5: "54321",
                    testOutput1: "2",
                    testOutput2: "12",
                    testOutput3: "5",
                    testOutput4: "10",
                    testOutput5: "15",
                    testResults: [true, true, true, true, true],
                    title: "Sum Digits"} }
    history.push("/", state);
  it('renders <ChallengeResults /> without crashing', () => {
    render(<ChallengeResult history={createBrowserHistory(history.push("/", state))}/>);
  });

  it('renders text without crashing', () => {
    render(<ChallengeResult history={createBrowserHistory(history.push("/", state))}/>);
    expect(screen.getByText("Code for Solution:")).toBeInTheDocument();
  });

  it('renders input table column without crashing', () => {
    render(<ChallengeResult history={createBrowserHistory(history.push("/", state))} />);
    expect(screen.getByText("Input")).toBeInTheDocument();
   });

   it('renders expected output table column without crashing', () => {
    render(<ChallengeResult history={createBrowserHistory(history.push("/", state))} />);
    expect(screen.getByText("Expected Output")).toBeInTheDocument();
   });

   it('renders actual output table column without crashing', () => {
    render(<ChallengeResult history={createBrowserHistory(history.push("/", state))} />);
    expect(screen.getByText("Actual Output")).toBeInTheDocument();
   });

   it('renders passed table column without crashing', () => {
    render(<ChallengeResult history={createBrowserHistory(history.push("/", state))} />);
    expect(screen.getByText("Passed?")).toBeInTheDocument();
   });

   it('renders runtime table column without crashing', () => {
    render(<ChallengeResult history={createBrowserHistory(history.push("/", state))} />);
    expect(screen.getByText("Runtime")).toBeInTheDocument();
   });

   it('renders memory table column without crashing', () => {
    render(<ChallengeResult history={createBrowserHistory(history.push("/", state))} />);
    expect(screen.getByText("Memory")).toBeInTheDocument();
   });



});