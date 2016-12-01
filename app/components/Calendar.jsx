
import Month from './Month';
import React from 'react';
import Showfeed from './Showfeed';

const Calendar = React.createClass({

  render() {
    return (
      <div id="calendar">
        <div className="container">
          <div className="row">
            <div className="twelve columns">
              <Showfeed
                postEvent={this.props.postEvent}
                todaysEvents={this.props.todaysEvents}
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
