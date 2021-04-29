import React from 'react';
import { shallow } from 'enzyme';
import Header from '../components/CodingTest/Header';
import { render, screen, fireEvent, act} from "../test-utils";
import '@testing-library/jest-dom'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import VideoRecord from '../components/CodingTest/VideoInterview/VideoRecord';
import Questions from '../components/CodingTest/VideoInterview/Questions';
import { Camera } from '@material-ui/icons';

configure({ adapter: new Adapter() });

describe('rendering components', () => {
    it('renders <VideoRecord /> without crashing', () => {
    render(<VideoRecord />);
  });

  it('renders <Questions /> without crashing', () => {
    render(<Questions />);
  });

  it('renders <Camera /> without crashing', () => {
    render(<Camera />);
  });

it('renders <Header /> without crashing', () => {
      render(<Header />)
  });

});