import React from 'react';

const Login = React.createClass({
  getInitialState() {
    return {
      email: '',
      password: ''
    }
  },

  handleSubmit(event) {
    event.preventDefault();

    return this.props.login(this.state);
  },

  handleChange(event) {
    const nextState = { [event.target.name]: event.target.value };

    this.setState(nextState);
  },

  render() {
    return (
      <div className="container">
        <h3>Login</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s8">
              <input id="email"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <label data-error="wrong" data-success="right">
                Email
              </label>
            </div>
            <div className="input-field col s8">
              <input id="password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <label >Password</label>
            </div>
          </div>
          <button className="btn waves-effect waves-light" type="submit" name="action">
            Submit
          </button>
        </form>
      </div>

    );
  }
});

export default Login;
