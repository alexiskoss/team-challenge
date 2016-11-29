import React, { Component } from 'react';
import SignUpForm from './TeamSignUp';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {hideAlert: true};
    this.submitCallback = this.submitCallback.bind(this);
  }

  submitCallback(state) {
    this.setState({hideAlert:false});
  }

  render() {
    return (
      <div>
        <div className="inner-container">
          <h1>Sign Up</h1>
          <h2>Our service is fun and awesome, but you must be 13 years old to join</h2>
          <div className="alert alert-success" hidden={this.state.hideAlert}> 
            <strong>Success!</strong> Thanks for signing up! 
          </div>
          <SignUpForm submitCallback={this.submitCallback}/>
        </div>
      </div>
    );
  }
}

export default App;
