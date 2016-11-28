import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Enzyme from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('Submit button', () => {
  it('should only enable when all fields are valid', () => {

  });

  it('should show an alert when submit button is clicked', () => {

  });
});
