
import Month from './Month';
import React from 'react';
import Showfeed from './Showfeed';

// console.log(moment().format('LLLL'));

const Calendar = React.createClass({

  render() {
    return (
      <div id="calendar">
        <div className="container">
          <div className="row">
            <div className="twelve columns">
              <Showfeed
                events={this.props.events}
             />
            </div>
            <div className="twelve columns">
              <Month
                events={this.props.events}
             />
            </div>
          </div>
         </div>
      </div>
    );
  }
});

export default Calendar;
