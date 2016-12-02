import React from 'react';
import axios from 'axios';
import Router from 'react-router/BrowserRouter'
import Redirect from 'react-router/Redirect'
import Login from './Login';
import Signup from './Signup';

const Auth = React.createClass({
  getInitialState() {
    return {
      login: true
    }
  },

  userLogin(user) {
    axios.post('/token', user)
      .then((res) => {
        if (res) {
          this.props.authCheck();
          window.location.pathname = '/Calendar';
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
              this.props.authCheck();
              window.location.pathname = '/Calendar';
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

  loginRender() {
    this.setState({ login: true });
  },

  signupRender() {
    this.setState({ login: false });
  },

  render() {
    let loginForm = null;
    let signup = null;

    if (this.state.login) {
      loginForm = <Login
        login={this.userLogin}
        signupRender={this.signupRender}
      />
    }
    else {
      signup = <Signup
        signup={this.userSignup}
        loginRender={this.loginRender}
     />
    }

    return (
      <div id="Auth">
        {loginForm}
        {signup}
      </div>
    );
  }
});

export default Auth;
