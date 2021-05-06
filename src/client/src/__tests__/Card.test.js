import React from 'react';
import { shallow } from 'enzyme';
import Card  from '../components/Card';
import { render, screen, fireEvent, act} from "../test-utils";
import '@testing-library/jest-dom'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('rendering components', () => {
  it('renders <Card /> without crashing', () => {
    shallow(<Card />);
  });

  it('renders text without crashing', () => {
    const wrapper = shallow(<Card />);
    expect(wrapper.text()).toEqual("See Example ChallengeExample Coding ProblemChallenge TitleArrays: Left RotationProblem DescriptionA left rotation operation on an array shifts each of the array's elements  unit to the left. For example, if  left rotations are performed on array , then the array would become . Note that the lowest index item moves to the highest index in a rotation. This is called a circular array.Given an array  of  integers and a number, , perform  left rotations on the array. Return the updated array to be printed as a single line of space-separated integers. Complete the function rotLeft in the editor below.Input FormatThe first two characters contain two space-separated integers n and d, the size of a and the number of left rotations. The remaining arguments contain n space-separated integers, each an a[i].Return Formatint a'[n]: the rotated arrayConstraints1 ≤ n ≤ 10^51 ≤ d ≤ n1 ≤ a[i] ≤ 10^6Sample Input5 4 1 2 3 4 5Sample Output5 1 2 3 4Example with ExplanationWhen we perform d = 4 left rotations, the array undergoes the following sequence of changes:[1,2,3,4,5] -> [2,3,4,5,1] -> [3,4,5,1,2] -> [4,5,1,2,3] -> [5.1,2,3,4]Close");
  });

  it('renders open button without crashing', async () => {
    render(<Card />);
    expect(screen.queryByTestId("open")).toBeInTheDocument();
    });

    it('open Button click', async ()=> {
    const mockHandleOnClick = jest.fn()
    const  wrapper  = render(<Card onClick={mockHandleOnClick()}/>);

    const button = wrapper.queryByTestId("open");
    act(() => {
    fireEvent.click(button);
     });
     expect(mockHandleOnClick).toHaveBeenCalledTimes(1);
 });
});