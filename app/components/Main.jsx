// import { BrowserRouter } from 'react-router';
import { Match } from 'react-router';
import Router from 'react-router/BrowserRouter'
import Redirect from 'react-router/Redirect'
import Calendar from './Calendar';
import axios from 'axios';
import Auth from './Auth';
import React from 'react';
import UserDash from './UserDash';

const Main = React.createClass({
  getInitialState() {
    return {
      events: [],
      loadErr: false
    }
  },

  componentDidMount() {
    axios.get('/events')
      .then((res) => {

        this.setState({ events: res.data.events })
      })
      .catch((err) => {
        this.setState({loadErr: err});
      });
  },

  userSignup(user) {
    axios.post('/users', user)
      .then((res) => {
        if (res.username === user.username) {
          axios.post('/token', {
            username: user.username,
            password: user.password
          })
          .then((response) => {
            if (response) {
              router.transitionTo('/');
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
        <div>
          <Match pattern="/Calendar" exactly render={
              () =>
                <Calendar
                  events={this.state.events}
                />
          }/>
          <Match pattern="/Auth" exactly render={
              () =>
              <Auth />
          }/>
          <Match pattern="/UserDash" exactly render={
              () =>
                <UserDash />
          }/>
        </div>
    );
  }
});

export default Main;
