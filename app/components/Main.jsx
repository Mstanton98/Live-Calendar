import Calendar from './Calendar';
import React from 'react';
import Signup from './Signup';
import UserDash from './UserDash';

const Main = React.createClass({

  render() {
    return (

      <div>
        <Calendar />
        <Signup />
        <UserDash />
      </div>

    );
  }
});

export default Main;
