import React from 'react';

const Signup = React.createClass({
  getInitialState() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: ''
    }
  },

  handleSubmit(event) {
    event.preventDefault();
    return this.props.signup(this.state);
  },

  handleChange(event) {
    const nextState = { [event.target.name]: event.target.value };

    this.setState(nextState);
  },

  render() {
    return (

      <div id="sign-up" >
        <div className="container">
          <h3>SignUp</h3>
          <form className="col s12" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-field col s8">
                <input id="first_name"
                  placeholder="Enter First Name"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.firstName}
                  name="firstName"
                />
                <label>First Name</label>
              </div>
              <div className="input-field col s8">
                <input id="last_name"
                  placeholder="Enter Last Name"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.lastName}
                  name="lastName"
                />
                <label>Last Name</label>
              </div>
              <div className="input-field col s8">
                <input id="username"
                  placeholder="Enter User Name"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.username}
                  name="username"
                />
                <label>Username</label>
              </div>
            </div>
            <div className="row">

              <div className="input-field inline col s8">
                <input id="email"
                  type="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                  name="email"
                />
                <label>Email</label>
              </div>

              <div className="input-field col s8">
                <label>Password</label>
                <input id="password"
                  type="password"
                  onChange={this.handleChange}
                  value={this.state.password}
                  name="password"
                />
              </div>
            </div>
            <button className="btn waves-effect waves-light" type="submit" name="action">
              Submit
            </button>

          </form>
        </div>
      </div>
    );
  }
});

export default Signup;
