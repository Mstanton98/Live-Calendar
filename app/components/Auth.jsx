import React from 'react';
import axios from 'axios';
import Router from 'react-router/BrowserRouter'
import Redirect from 'react-router/Redirect'
import Snackbar from 'material-ui/Snackbar';
import Login from './Login';
import Signup from './Signup';

const Auth = React.createClass({
  getInitialState() {
    return {
      login: true,
      open: false,
      open1: false,
      open2: false
    }
  },

  componentDidMount() {
    this.setState({ open: false, open1: false, open2: false });
  },

  userLogin(user) {
    axios.post('/token', user)
      .then((res) => {
        if (res) {
          // this.props.authCheck();
          this.setState({ open: true });
          window.location.pathname = '/Calendar';
        }
        else {
          this.setState({ open2: true});
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
              // this.props.authCheck();
              this.setState({ open1: true });
              window.location.pathname = '/Calendar';
            }
            else {
              this.setState({ open2: true});
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
        open={this.state.open}
        open2={this.state.open2}
        login={this.userLogin}
        signupRender={this.signupRender}
      />
    }
    else {
      signup = <Signup
        open1={this.state.open1}
        open2={this.state.open2}
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
