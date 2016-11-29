
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
          
          <div className="col l4">
            <Showfeed
              events={this.props.events}
            />
          </div>
          <div className="col l8">
            <Month />
          </div>
        </div>
        {/* </div> */}
      </div>
    );
  }
});

export default Calendar;
