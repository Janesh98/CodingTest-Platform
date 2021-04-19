import React from 'react';
import Results  from '../components/Results';
import { render, screen } from "../test-utils";
import '@testing-library/jest-dom'

describe('rendering components', () => {

 it('renders <Results /> without crashing', () => {
  render(<Results />);
  expect(screen.queryByTestId("results-container")).not.toBeNull();
 });

 it('renders text without crashing', () => {
  render(<Results />);
  expect(screen.getByText("Previous Coding Tests Results")).toBeInTheDocument();
 });

 it('renders test name table column without crashing', () => {
  render(<Results />);
  expect(screen.getByText("Test Name")).toBeInTheDocument();
 });

 it('renders date created table column without crashing', () => {
  render(<Results />);
  expect(screen.getByText("Date Created")).toBeInTheDocument();
 });

 it('renders no. of participants table column without crashing', () => {
  render(<Results />);
  expect(screen.getByText("No. of Participants")).toBeInTheDocument();
 });

 it('renders no of challenges table column without crashing', () => {
  render(<Results />);
  expect(screen.getByText("No. of Challenges")).toBeInTheDocument();
 });


});