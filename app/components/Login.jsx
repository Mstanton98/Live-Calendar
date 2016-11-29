import React from 'react';

const Login = React.createClass({

  render() {
    return (
      <div className="container">
        <h3>Login</h3>
        <form>
          <div className="row">
            <div className="input-field col s8">
              <input id="email" type="email" className="validate" />
              <label data-error="wrong" data-success="right">
                Email</label>
            </div>
            <div className="input-field col s8">
              <input id="password" type="password" className="validate" />
              <label >Password</label>
            </div>
          </div>
        </form>
      </div>

    );
  }
});

export default Login;
