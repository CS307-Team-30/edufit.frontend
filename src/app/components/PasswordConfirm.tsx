import React, { Component } from 'react';

interface State {
  password: string;
  confirmPassword: string;
  passwordMatch: boolean;
}

class PasswordConfirmationForm extends Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      passwordMatch: true,
    };
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleConfirmPasswordChange = (e) => {
    this.setState({ confirmPassword: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // Check if the passwords match
    if (this.state.password === this.state.confirmPassword) {
      // Passwords match, you can proceed with further actions
      console.log('Passwords match:', this.state.password);
    } else {
      // Passwords do not match, display an error
      this.setState({ passwordMatch: false });
    }
  };

  render() {
    return (
      <div>
        <h2>Password Confirmation Form</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={this.state.confirmPassword}
              onChange={this.handleConfirmPasswordChange}
              required
            />
          </div>
          {!this.state.passwordMatch && (
            <div style={{ color: 'red' }}>Passwords do not match.</div>
          )}
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default PasswordConfirmationForm;