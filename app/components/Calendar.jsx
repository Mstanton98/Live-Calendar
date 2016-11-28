// import 'node-modules/react-big-calendar/lib/css/react-big-calendar.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Month from './Month';
import React from 'react';
import Showfeed from './Showfeed';

// require('/react-big-calendar/lib/css/react-big-calendar.css');

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

console.log(moment().format('LLLL'));

const Calendar = React.createClass({
  getInitialState() {
    return {
      events: [{
          'title': 'All Day Event',
          'allDay': true,
          'start': new Date(2015, 3, 0),
          'end': new Date(2015, 3, 0)
        },
        {
          'title': 'Long Event',
          'start': new Date(2015, 3, 7),
          'end': new Date(2015, 3, 10)
        },
        {
          'title': 'DTS STARTS',
          'start': new Date(2016, 2, 13, 0, 0, 0),
          'end': new Date(2016, 2, 20, 0, 0, 0)
        }
      ]
    };
  },
  render() {
    return (

      <div>
        <Month />
        <Showfeed />
        <BigCalendar
          defaultDate={new Date(2015, 3, 12)}
          defaultView="week"
          endAccessor="endDate"
          events={this.state.events}
          startAccessor="startDate"
          step={15}
          timeslots={8}
        />
      </div>
    );
  }
});

export default Calendar;
