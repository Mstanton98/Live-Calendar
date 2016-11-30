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

          <div className="twelve columns">
            <div className="input-field">
              <label
                data-error="wrong"
                data-success="right"
              >
              Email</label>
              <input id="email"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
          </div>
        </div>

        <div className="twelve columns">
          <div className="input-field">
            <label >Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <button
          className="button"
          type="submit"
          name="action">
        Submit
        </button>
        </div>
        </form>

        </div>

    );
  }
});

export default Login;
