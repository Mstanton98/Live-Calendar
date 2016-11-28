import { BrowserRouter } from 'react-router';
import { Match } from 'react-router';
import Calendar from './Calendar';
import axios from 'axios';
import React from 'react';
import Signup from './Signup';
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
      })
  },

  render() {

    return (
      <BrowserRouter>
        <div>
          <Match pattern="/" exactly render={
              () =>
                <Calendar
                  events={this.state.events}
          />
          }/>
          <Match pattern="/Signup" exactly render={
              () =>
                <Signup />
          }/>
          <Match pattern="/UserDash" exactly render={
              () =>
                <UserDash />
          }/>
        </div>
       </BrowserRouter>
    );
  }
});

export default Main;
