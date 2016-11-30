
import Month from './Month';
import React from 'react';
import Showfeed from './Showfeed';

// console.log(moment().format('LLLL'));

const Calendar = React.createClass({

  render() {
    return (
      <div id="calendar">
          <div className="row">
            <div className="col l3 m4 s12">
              <Showfeed
                postEvent={this.props.postEvent}
                todaysEvents={this.props.todaysEvents}
             />
            </div>
            <div className="col l9 m4 s12">
              <Month
                events={this.props.events}
             />
            </div>
          </div>
      </div>
    );
  }
});

export default Calendar;
