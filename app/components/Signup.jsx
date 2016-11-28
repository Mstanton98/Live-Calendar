import React from 'react';

const Signup = React.createClass({

  render() {
    return (

      <div id="sign-up" >
        <div className="container">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s8">
              <input id="first_name" placeholder="Enter First Name" type="text" className="validate" />
              <label for="first_name">First Name</label>
            </div>
            <div className="input-field col s8">
              <input id="last_name" placeholder="Enter Last Name" type="text" className="validate" />
              <label for="last_name">Last Name</label>
            </div>
            <div className="input-field col s8">
              <input id="username" placeholder="Enter User Name" type="text" className="validate" />
              <label for="username">Last Name</label>
            </div>
          </div>
          </form>
          <form className="col s12">
          <div className="row">

              <div className="input-field inline col s8">
                <input id="email" type="email" className="validate" />
                <label for="email">Email</label>
              </div>

            <div className="input-field col s8">
              <label for="password">Password</label>
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
