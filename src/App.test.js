import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import {RequiredInput} from './TeamSignUp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

/* Tests RequiredInput component for valid and invalid case. */
describe('<RequiredInput /> component', () => {
  /* Determines that field has required input and returns true. */
  it('should check if name/password field has required input', () => {
    var validateSpy = sinon.spy(RequiredInput.prototype, 'validate');
    const wrapper = shallow(<RequiredInput value="display words" />); // input given to text field

    expect(validateSpy.called).toEqual(true); // check that the callback was executed
    expect(validateSpy.getCall(0).args[0]).toEqual("display words"); // checks that parameter given to the callback matches input
    expect(validateSpy.returnValues[0].isValid).toEqual(true); // true; contains input
    validateSpy.restore();
  });

  /* Determines that field does not have required input and returns false. */
  it('should check if name/password field shows appropriate error message', () => {
    var validateSpy = sinon.spy(RequiredInput.prototype, 'validate');
    const wrapper = shallow(<RequiredInput value="" />); // empty text field

    expect(validateSpy.called).toEqual(true); // check that the callback was executed
    expect(validateSpy.getCall(0).args[0]).toEqual(""); // checks that parameter given to the callback matches input
    expect(validateSpy.returnValues[0].isValid).toEqual(false); // false; missing input
    validateSpy.restore();
  });
});
