import React from 'react';
import axios from 'axios';
import Router from 'react-router/BrowserRouter'
import Redirect from 'react-router/Redirect'
import Login from './Login';
import Signup from './Signup';

const Auth = React.createClass({
  userLogin(user) {
    axios.post('/token', user)
      .then((res) => {
        if (res) {
          window.location.pathname = '/';
        }
      })
      .catch((err) => {
        console.log(err);
      })
  },

  userSignup(user) {
    let userEmail = user.email;
    let userPassword = user.password;

    axios.post('/users', user)
      .then((res) => {
        if (res.data.email === userEmail) {
          axios.post('/token', {
            email: userEmail,
            password: userPassword
          })
          .then((response) => {
            if (response) {
              window.location.pathname = '/';
            }
            else {
              return Materialize.toast('There was an error, please try again.', 4000);
            }
          })
          .catch((err) => {
            console.log(err);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  render() {
    return (
      <div id="Auth">
        <Login
          login={this.userLogin}
        />
        <Signup
          signup={this.userSignup}
       />
      </div>

    );
  }
});

export default Auth;
