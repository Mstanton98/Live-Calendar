// import { BrowserRouter } from 'react-router';
import { Match } from 'react-router';
import Calendar from './Calendar';
import axios from 'axios';
import Auth from './Auth';
import React from 'react';
import UserDash from './UserDash';

const Main = React.createClass({
  getInitialState() {
    return {
      events: [],
      loadErr: false
    }
  },

  componentDidMount() {
    axios.get('/events')
      .then((res) => {
        const events = res.data.Events
        let newEvents = [];

        console.log(res.data.Events);
        for (let i = 0; i < events.length; i++) {
          const singleEvent = {
            id: events[i].Id,
            title: `${events[i].Artists[0].Name} @ ${events[i].Venue.Name}`,
            venue: events[i].Venue.Name,
            ticketUrl: events[i].TicketUrl,
            venueUrl: events[i].Venue.Url,
            allDay: true,
            start: new Date(events[i].Date)
          };
          console.log(singleEvent);
          newEvents.push(singleEvent);
        }

        this.setState({ events: newEvents })
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
