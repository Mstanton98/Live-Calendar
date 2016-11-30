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
        start: new Date(2016, 11, 29),
        end: new Date(2016, 11, 29)
      },
        {
          title: 'All Day Event',
          start: new Date(2016, 11, 29),
          end: new Date(2016, 11, 29)
        },
        {
          title: 'All Day Event',
          start: new Date(2016, 11, 29),
          end: new Date(2016, 11, 29)
        }

      ]
    };
  },

  handleSelectSlot(obj) {
    console.log('this works!')
    console.log(obj)
  },

  render() {
    return (

      <div id="month">
        <BigCalendar
          defaultDate={new Date()}
          defaultView="month"
          endAccessor="endDate"
          events={this.state.events}
          onSelectSlot={this.handleSelectSlot}
          selectable={true}
          startAccessor="startDate"
          step={15}
          timeslots={8}
          views={['month']}
        />
      </div>

    );
  }
});

export default Month;
