import Days from './Days';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import React from 'react';

BigCalendar.momentLocalizer(moment);

const Month = React.createClass({
  getInitialState() {
    return {
      events: [{
        title: 'All Day Event',
        start: new Date(2015, 3, 0),
        end: new Date(2015, 3, 0)
      },
        {
          title: 'All Day Event',
          start: new Date(2015, 3, 0),
          end: new Date(2015, 3, 0)
        },
        {
          title: 'All Day Event',
          start: new Date(2015, 3, 0),
          end: new Date(2015, 3, 0)
        }
      ]
    };
  },

  render() {
    return (

      <div id="month">
        <BigCalendar
          defaultDate={new Date(2015, 3, 12)}
          defaultView="week"
          endAccessor="endDate"
          events={this.state.events}
          startAccessor="startDate"
          step={15}
          timeslots={8}
        />
         <Days />
      </div>

    );
  }
});

export default Month;
