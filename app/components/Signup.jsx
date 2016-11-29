import React from 'react';

const Signup = React.createClass({
  handleSubmit(event) {
    event.preventDefault();

  },

  render() {
    return (

      <div id="sign-up" >
        <div className="container">
        <h3>SignUp</h3>
        <form className="col s12" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s8">
              <input id="first_name" placeholder="Enter First Name" type="text" className="validate" />
              <label>First Name</label>
            </div>
            <div className="input-field col s8">
              <input id="last_name" placeholder="Enter Last Name" type="text" className="validate" />
              <label>Last Name</label>
            </div>
            <div className="input-field col s8">
              <input id="username" placeholder="Enter User Name" type="text" className="validate" />
              <label>Username</label>
            </div>
          </div>
          <div className="row">

              <div className="input-field inline col s8">
                <input id="email" type="email" className="validate" />
                <label>Email</label>
              </div>

            <div className="input-field col s8">
              <label>Password</label>
              <input id="password" type="password" className="validate" />

            </div>
          </div>
          <button className="btn waves-effect waves-light" type="submit" name="action">Submit
          </button>

         </form>
        </div>
      </div>
    );
  }
});

export default Signup;
