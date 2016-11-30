// import { BrowserRouter } from 'react-router';
import { Match } from 'react-router';
import Calendar from './Calendar';
import axios from 'axios';
import Auth from './Auth';
import React from 'react';
import UserDash from './UserDash';
import moment from 'moment';

const Main = React.createClass({
  getInitialState() {
    return {
      events: [],
      todaysEvents: [],
      loadErr: false
    }
  },

  componentDidMount() {
    axios.get('/events')
      .then((res) => {
        const events = res.data.Events
        let newEvents = [];
        let todaysEvents = [];
        let date = moment().format();

        for (let i = 0; i < events.length; i++) {
          const stringDate = date.toString();
          const exactDate = stringDate.substring(0, stringDate.indexOf('T'));

          const stringEventDate = events[i].Date.toString();
          const exactEventDate = stringEventDate.substring(0, stringEventDate.indexOf('T'));

          const singleEvent = {
            id: events[i].Id,
            title: `${events[i].Artists[0].Name} @ ${events[i].Venue.Name}`,
            artist: events[i].Artists[0].Name,
            venue: events[i].Venue.Name,
            ticketUrl: events[i].TicketUrl,
            venueUrl: events[i].Venue.Url,
            allDay: true,
            date: exactEventDate,
            start: events[i].Date
          };

          if (singleEvent.date === exactDate) {
            todaysEvents.push(singleEvent);
          }
          else {
            newEvents.push(singleEvent);
          }
        }

        this.setState({ events: newEvents, todaysEvents: todaysEvents });
      })
      .catch((err) => {
        this.setState({loadErr: err});
      });
  },

  render() {
    return (
        <div>
          <Match pattern="/Calendar" exactly render={
              () =>
                <Calendar
                  events={this.state.events}
                  todaysEvents={this.state.todaysEvents}
                />
          }/>
          <Match pattern="/Auth" exactly render={
              () =>
              <Auth
                signup={this.userSignup}
             />
          }/>
          <Match pattern="/UserDash" exactly render={
              () =>
                <UserDash />
          }/>
        </div>
    );
  }
});

export default Main;
