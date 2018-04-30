import React, { Component } from 'react';
import http from '../http';

class Login extends Component {
  constructor(props) {
    super(props);

    this.inputChanged = this.inputChanged.bind(this);
    this.submit = this.submit.bind(this);

    this.state = {
      identifier: '',
      password: '',
    };
  }

  inputChanged(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  submit(event) {
    event.preventDefault();
    http('auth/local', 'post', this.state)
      .then(data => this.props.onLoggedIn(data));
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="identifier"
            value={this.state.identifier}
            onChange={this.inputChanged}
          />
          <small id="emailHelp" className="form-text text-muted">We&apos;ll never share your email with
            anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.inputChanged}
          />
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>);
  }
}

export default Login;
