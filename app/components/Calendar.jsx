
import Month from './Month';
import React from 'react';
import Showfeed from './Showfeed';

// console.log(moment().format('LLLL'));

const Calendar = React.createClass({

  render() {
    return (
      <div id="calendar">
        {/* <div className="container"> */}
          <div className="row">

            <div className="col l3">
              <Showfeed />
            </div>
            <div className="col l9">
              <Month />
            </div>
          </div>
        {/* </div> */}
      </div>
    );
  }
});

export default Calendar;
