import React from 'react';
import { shallow } from 'enzyme';
import PlayerCard  from '../components/PlayerCard';
import { render, screen, fireEvent, act} from "../test-utils";
import '@testing-library/jest-dom'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('rendering components', () => {
  it('renders <Card /> without crashing', () => {
    shallow(<PlayerCard />);
  });

  it('renders open button without crashing', async () => {
    render(<PlayerCard />);
    expect(screen.queryByTestId("open")).toBeInTheDocument();
    });

    it('open Button click', async ()=> {
    const mockHandleOnClick = jest.fn()
    const  wrapper  = render(<PlayerCard onClick={mockHandleOnClick()}/>);

    const button = wrapper.queryByTestId("open");
    act(() => {
    fireEvent.click(button);
     });
     expect(mockHandleOnClick).toHaveBeenCalledTimes(1);
 });

});