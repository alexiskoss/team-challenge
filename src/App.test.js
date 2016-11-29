import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';
import {RequiredInput} from './TeamSignUp';
import SignUpForm from './TeamSignUp'

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

describe('<SignUpForm /> component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<SignUpForm />); //render component
    wrapper.find('#resetButton').simulate('click'); //click the reset button
  })

  it('should reset the email field', () => {
    var emailField = wrapper.find('EmailInput').get(0); //email field
    expect(emailField.props.value).toEqual(''); //checks to see if field is blank
  });

  it('should reset the name field', () => {
    var nameField = wrapper.find('RequiredInput').get(0); //name field
    expect(nameField.props.value).toEqual(''); //checks to see if field is blank
  });

  it('should reset the date of birth field', () => {
    var dobField = wrapper.find('BirthdayInput').get(0); //date of birth field
    expect(dobField.props.value).toEqual(''); //checks to see if field is blank
  });

  it('should reset the password field', () => {
    var passwordField = wrapper.find('RequiredInput').get(1); //password field
    expect(passwordField.props.value).toEqual(''); //checks to see if field is blank
  });

  it('should reset the password confirmation field', () => {
    var passwordConField = wrapper.find('PasswordConfirmationInput').get(0); //password confirmation field
    expect(passwordConField.props.value).toEqual(''); //checks to see if field is blank
  });
});