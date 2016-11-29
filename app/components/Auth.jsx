import React from 'react';
import Login from './Login';
import Signup from './Signup';

const Auth = React.createClass({

  render() {
    return (
      <div id="Auth">
        <Login />
        <Signup />
      </div>

    );
  }
});

export default Auth;
