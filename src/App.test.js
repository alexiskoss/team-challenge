import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { mount } from 'enzyme'; 
import sinon from 'sinon';
import SignUpForm from './TeamSignUp'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('<SignUpForm /> component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<SignUpForm />); //render component
    wrapper.find('#resetButton').simulate('click');
  })

  it('should reset the email field', () => {
    var emailField = wrapper.find('EmailInput').get(0); //email field
    expect(emailField.props.value).toEqual('');
  });

  it('should reset the name field', () => {
    var nameField = wrapper.find('RequiredInput').get(0); //name field
    expect(nameField.props.value).toEqual('');
  });

  it('should reset the date of birth field', () => {
    var dobField = wrapper.find('BirthdayInput').get(0); //date of birth field
    expect(dobField.props.value).toEqual('');
  });

  it('should reset the password field', () => {
    var passwordField = wrapper.find('RequiredInput').get(1); //password field
    expect(passwordField.props.value).toEqual('');
  });

  it('should reset the password confirmation field', () => {
    var passwordConField = wrapper.find('PasswordConfirmationInput').get(0); //password confirmation field
    expect(passwordConField.props.value).toEqual('');
  });
});

describe('Submit button', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<App />);
    var emailField = wrapper.find('EmailInput').get(0);
    emailField.simulate('change', {target: {value: 'test@test.com'}});
    
  });

  it('should only enable when all fields are valid', () => {

  });

  it('should show an alert when submit button is clicked', () => {

  });
});
