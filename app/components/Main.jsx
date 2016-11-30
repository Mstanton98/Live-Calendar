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
      following: [],
      userSearch: [],
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

          newEvents.push(singleEvent);
        }

        this.setState({ events: newEvents, todaysEvents: todaysEvents });
      })
      .catch((err) => {
        this.setState({loadErr: err});
      });
  },

  postEvent(event) {
    axios.post('/events', event)
      .then((res) => {
        console.log('Event Posted!');
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getFollowing() {
    axios.get('/followingList')
      .then((res) => {

        this.setState({ following: res.data })
      })
      .catch((err) => {
        console.log(err);
      });
  },

  deleteFollowing(followingId) {
    axios.delete('/relationships', {data: {followingId}})
      .then((res) => {
        this.getFollowing();
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getUserName(name) {
    const username = { username: name };
    axios.post('/username', username)
      .then((res) => {

        this.setState({ userSearch: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  followUser(follow) {
    axios.post('/relationships', {data: {follow}})
      .then((res) => {

        this.getFollowing();
        this.setState({ userSearch: [] })
      })
      .catch((err) => {
        console.log(err);
      });
  },

  render() {
    return (
        <div>
          <Match pattern="/Calendar" exactly render={
              () =>
                <Calendar
                  events={this.state.events}
                  postEvent={this.postEvent}
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
                <UserDash
                  getUserName={this.getUserName}
                  following={this.state.following}
                  getFollowing={this.getFollowing}
                  deleteFollowing={this.deleteFollowing}
                  userSearch={this.state.userSearch}
                  followUser={this.followUser}
               />
          }/>
        </div>
    );
  }
});

export default Main;
