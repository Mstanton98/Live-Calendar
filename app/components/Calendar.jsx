import Month from './Month';
import React from 'react';
import Showfeed from './Showfeed';

const Calendar = React.createClass({

  render() {
    return (

      <div>
        <Month />
        <Showfeed />
      </div>

    );
  }
});

export default Calendar;
