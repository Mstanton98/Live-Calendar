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
    console.log(this.state);
    return (
      <div>
        <Calendar
          events={this.state.events}
       />
        <Signup />
        <UserDash />
      </div>

    );
  }
});

export default Main;
