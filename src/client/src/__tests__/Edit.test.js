import React from 'react';
import Edit  from '../components/Edit';
import { render, screen } from "../test-utils";
import '@testing-library/jest-dom'

describe('rendering components', () => {

 it('renders <Edit /> without crashing', () => {
  render(<Edit />);
  expect(screen.queryByTestId("edit-container")).not.toBeNull();
  expect(screen.getByText("Edit Existing Coding Test")).toBeInTheDocument();
  expect(screen.getByText("Test Name")).toBeInTheDocument();
  expect(screen.getByText("Date Created")).toBeInTheDocument();
 });

});