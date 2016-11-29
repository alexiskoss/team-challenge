import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';
import {RequiredInput, PasswordConfirmationInput} from './TeamSignUp';
import SignUpForm from './TeamSignUp'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

/* Tests RequiredInput component for valid and invalid cases. */
describe('<RequiredInput /> component', () => {
  /* Verifies that field has required input. */
  it('should check if name/password field has required input', () => {
    var validateSpy = sinon.spy(RequiredInput.prototype, 'validate');
    const wrapper = shallow(<RequiredInput value="display words" />); // input given to text field

    expect(validateSpy.called).toEqual(true); // check that the callback was executed
    expect(validateSpy.getCall(0).args[0]).toEqual("display words"); // checks that parameter given to the callback matches input
    expect(validateSpy.returnValues[0].isValid).toEqual(true); // contains input
    validateSpy.restore();
  });

  /* Verifies that field does not have required input. */
  it('should check if name/password field shows appropriate error message', () => {
    var validateSpy = sinon.spy(RequiredInput.prototype, 'validate');
    const wrapper = shallow(<RequiredInput value="" />); // empty text field

    expect(validateSpy.called).toEqual(true); // check that the callback was executed
    expect(validateSpy.getCall(0).args[0]).toEqual(""); // checks that parameter given to the callback matches input
    expect(validateSpy.returnValues[0].isValid).toEqual(false); // missing input
    validateSpy.restore();
  });
});

/* Tests PasswordConfirminationInput component for valid and invalid cases. */
describe('<PasswordConfirmationInput /> component', () => {
  /* Verifies that passwords match. */
  it('should check if passwords match', () => {
    var validateSpy = sinon.spy(PasswordConfirmationInput.prototype, 'validate');
    const wrapper = shallow(<PasswordConfirmationInput value="testpassword" password="testpassword" />); // input given to pass & confirm fields

    expect(validateSpy.called).toEqual(true); // check that the callback was executed
    expect(validateSpy.getCall(0).args[0]).toEqual("testpassword"); // checks that parameter given to the confirm field matches password field
    expect(validateSpy.returnValues[0].isValid).toEqual(true); // passwords match
    validateSpy.restore();
  });

  /* Verifies that passwords do not match. */
  it('should check if passwords do not match', () => {
    var validateSpy = sinon.spy(PasswordConfirmationInput.prototype, 'validate');
    const wrapper = shallow(<PasswordConfirmationInput value="PASS2" password="pass1" />); // input given to pass & confirm fields

    expect(validateSpy.called).toEqual(true); // check that the callback was executed
    expect(validateSpy.getCall(0).args[0]).not.toEqual("pass1"); // checks that parameter given to the confirm field doesn't match password field
    expect(validateSpy.returnValues[0].isValid).toEqual(false); // passwords don't match
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