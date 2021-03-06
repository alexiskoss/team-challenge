import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, mount, simulate } from 'enzyme';
import sinon from 'sinon';
import { RequiredInput, PasswordConfirmationInput, BirthdayInput, EmailInput } from './TeamSignUp';
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

/* Tests BirthdayInput component for valid and invalid cases. */
describe('<BirthdayInput /> component', () => {
  /* Verifies that birthday field has required input (13 yrs+). */
  it('should check if birthday field has required input', () => {
    var validateSpy = sinon.spy(BirthdayInput.prototype, 'validate');
    const wrapper = shallow(<BirthdayInput value="01/12/1996" />); // input given to text field

    expect(validateSpy.called).toEqual(true); // check that the callback was executed
    expect(validateSpy.getCall(0).args[0]).toEqual("01/12/1996"); // checks that parameter given to the callback matches input
    expect(validateSpy.returnValues[0].isValid).toEqual(true); // birthday given is older than 13
    validateSpy.restore();
  });

  /* Verifies that birthday field does not have required input (less than 13 yrs). */
  it('should check if birthday field shows appropriate error message', () => {
    var validateSpy = sinon.spy(BirthdayInput.prototype, 'validate');
    const wrapper = shallow(<BirthdayInput value="01/12/2004" />); // empty text field

    expect(validateSpy.called).toEqual(true); // check that the callback was executed
    expect(validateSpy.getCall(0).args[0]).toEqual("01/12/2004"); // checks that parameter given to the callback matches input
    expect(validateSpy.returnValues[0].isValid).toEqual(false); // birthday given is less than 13
    validateSpy.restore();
  });
});

/* Tests EmailInput component for valid and invalid cases. */
describe('<EmailInput /> component', () => {
  /* Verifies that email field has required input. */
  it('should check if email field has required input', () => {
    var validateSpy = sinon.spy(EmailInput.prototype, 'validate');
    const wrapper = shallow(<EmailInput value="test@test.edu" />); // input given to text field

    expect(validateSpy.called).toEqual(true); // check that the callback was executed
    expect(validateSpy.getCall(0).args[0]).toEqual("test@test.edu"); // checks that parameter given to the callback matches input
    expect(validateSpy.returnValues[0].isValid).toEqual(true); // email is valid
    validateSpy.restore();
  });

  /* Verifies that email field has invalid input. */
  it('should check if email field shows appropriate error message when invalid', () => {
    var validateSpy = sinon.spy(EmailInput.prototype, 'validate');
    const wrapper = shallow(<EmailInput value="test@" />); // empty text field

    expect(validateSpy.called).toEqual(true); // check that the callback was executed
    expect(validateSpy.getCall(0).args[0]).toEqual("test@"); // checks that parameter given to the callback matches input
    expect(validateSpy.returnValues[0].isValid).toEqual(false); // email is invaid
    validateSpy.restore();
  });

  /* Verifies that email field does not have required input. */
  it('should check if email field shows appropriate error message when left blank', () => {
    var validateSpy = sinon.spy(EmailInput.prototype, 'validate');
    const wrapper = shallow(<EmailInput value="" />); // empty text field

    expect(validateSpy.called).toEqual(true); // check that the callback was executed
    expect(validateSpy.getCall(0).args[0]).toEqual(""); // checks that parameter given to the callback matches input
    expect(validateSpy.returnValues[0].isValid).toEqual(false); // email is blank
    validateSpy.restore();
  });

});

/* Tests the validity of the reset button */
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

describe('Submit button', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<SignUpForm />);
    wrapper.setState({
      email: { valid: true },
      name: { valid: true },
      dob: { valid: true },
      password: { valid: true },
      passwordConf: { valid: true }
    }); //making all the fields in the form valid to test submit button
  });

  it('should only enable when all fields are valid', () => {
    expect(wrapper.find('#submitButton').simulate('click')); //The button isn't able to be clicked unless fields are valid
  });

  it('should show an alert when submit button is clicked', () => {
      var submitButton = wrapper.find('#submitButton');
      submitButton.simulate('click');
      //expect()
    });
});
