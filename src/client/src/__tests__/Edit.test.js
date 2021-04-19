import React from 'react';
import Edit  from '../components/Edit';
import { render, screen } from "../test-utils";
import '@testing-library/jest-dom'

describe('rendering components', () => {

 it('renders <Edit /> without crashing', () => {
  render(<Edit />);
  expect(screen.queryByTestId("edit-container")).not.toBeNull();
 });

 it('renders text without crashing', () => {
  render(<Edit />);
  expect(screen.getByText("Edit Existing Coding Test")).toBeInTheDocument();
 });

 it('renders test name table column without crashing', () => {
  render(<Edit />);
  expect(screen.getByText("Test Name")).toBeInTheDocument();
 });

 it('renders date created table column without crashing', () => {
  render(<Edit />);
  expect(screen.getByText("Date Created")).toBeInTheDocument();
 });


});