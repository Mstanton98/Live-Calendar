// import { BrowserRouter } from 'react-router';
import { Match } from 'react-router';
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
        console.log(res.data.Events);
        this.setState({ events: res.data.Events })
      })
      .catch((err) => {
        this.setState({loadErr: err});
      });
  },

  render() {

    return (
        <div>
          <Match pattern="/" exactly render={
              () =>
                <Calendar
                  events={this.state.events}
                />
          }/>
          <Match pattern="/Auth" exactly render={
              () =>
              <Auth
                signup={this.userSignup}
             />
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
