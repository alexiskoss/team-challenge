import React, { Component } from 'react';
import SignUpForm from './TeamSignUp';
import './index.css';

class App extends Component {

  render() {
    return (
      <div>
        <div className="inner-container">
          <h1>Sign Up</h1>
          <h2>Our service is fun and awesome, but you must be 13 years old to join</h2>
          <div className="alert alert-success" hidden={<SignUpForm submitCallback />} > 
            <strong>Success!</strong> Thanks for signing up! 
          </div>
          <SignUpForm />
        </div>
      </div>
    );
  }
}

export default App;
