import React from 'react';
import Create  from '../components/Create';
import { render, screen, fireEvent, act, cleanup } from "../test-utils";
import '@testing-library/jest-dom'

//const mockHistoryPush = jest.fn();
//
//jest.mock('react-router-dom', () => ({
//  ...jest.requireActual('react-router-dom'),
//  useHistory: () => ({
//    push: mockHistoryPush,
//  }),
//}));
//
//const successResult = "Some data";
//const getSuccess = jest.fn(() => Promise.resolve(successResult));
//const getFail = jest.fn(() => Promise.reject(new Error()));

describe('rendering components', () => {

    it('renders <Create /> without crashing', async () => {
    render(<Create />);
    expect(screen.queryByTestId("create-container")).not.toBeNull();
    cleanup();
 });

 it('renders text without crashing', async () => {
    render(<Create />);
    expect(screen.getByText("New Coding Test Name")).toBeInTheDocument();
    cleanup();
 });

 it('renders button and button text without crashing', async () => {
    render(<Create />);
    expect(screen.getByText("Continue to Setup")).toBeInTheDocument();
    expect(screen.queryByTestId("continue")).toBeInTheDocument();
    cleanup();
 });


    it('TextField update', async ()=> {
    const wrapper = render(<Create />);
    const input = wrapper.queryByTestId("name")
    act(() => {
        fireEvent.change(input, { target: { value: 'company' } })
    });
    expect(input.value).toBe('company')
    cleanup();
});

// it('Button click', async ()=> {
//    const wrapper = render(<Create/>);
//   // const logSpy = jest.spyOn(wrapper.prototype, 'handleOnClick');
//    
//
//
//    const button = wrapper.queryByTestId("continue");
//    act(() => {
//    fireEvent.click(button);
//     });
//    expect(jest.fn()).toHaveBeenCalledTimes(1);
//
// });

// it('Button click', async ()=> {
//  //   const historyMock = { push: jest.fn() };
//     const wrapper = render(<Create />);
//   //  const mockedEvent = { target: {}, preventDefault: () => {} }
//    //  const spy = jest.spyOn(wrapper, 'continue')
//
//     await new Promise((resolve) => setTimeout(resolve))
//     const mockHandleOnClick = jest.fn()
//
//    const button = wrapper.queryByTestId("continue")
//    waitFor(() => fireEvent.click(button))
//
//    await new Promise((resolve) => setTimeout(resolve))
//    expect(mockHandleOnClick.mock.calls.length).toBe(1);
   // expect(spy).toHaveBeenCalled()
    //console.log(historyMock.push.mock.calls[0]);
   // expect(historyMock.push.mock.calls[0]).toBeCalledWith( "/setup ");
   // expect(historyMock.push.mock.calls[0]).toEqual([ "/setup "]);
    //expect(mockHistoryPush).toHaveBeenCalledWith('/setup')
// });
// it('Button click', async ()=> {
//     const wrapper = render(<Create />);
//
//     const labelBeforeGet = wrapper.queryByLabelText(/created/i);
//     expect(labelBeforeGet).toBeNull()
//
//     const button = wrapper.queryByLabelText(/continue/i);
//     fireEvent.click(button);
//
//     const labelAfterGet = await waitFor(() => wrapper.queryByLabelText(/created/i));
//
//     
//     expect(labelAfterGet.textContent).toEqual(successResult); 
// });

});

