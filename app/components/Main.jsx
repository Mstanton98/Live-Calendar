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
      going: [],
      attended: [],
      maybe: [],
      userSearch: [],
      loadErr: false
    }
  },

  componentDidMount() {
    axios.get('/events')
      .then((res) => {
        const events = [
          {
            "Id": 2854803,
            "Date": "2016-12-02T20:30:00",
            "Venue": {
              "Id": 158984,
              "Name": "Capps Club",
              "Address": "7620 Bothell Way NE",
              "City": "Kenmore",
              "State": "Washington",
              "StateCode": "WA",
              "Country": "US",
              "CountryCode": "US",
              "ZipCode": "98028",
              "Url": "",
              "Latitude": 0,
              "Longitude": 0
            },
            "Artists": [
              {
                "Id": 62198,
                "Name": "Creme Tangerine"
              }
            ],
            "TicketUrl": "http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1335105/tfly?utm_medium=api"
          },
          {
            "Id": 2828236,
            "Date": "2016-12-02T21:00:00",
            "Venue": {
              "Id": 79954,
              "Name": "The Funhouse",
              "Address": "206 5th Ave N",
              "City": "Seattle",
              "State": "Washington",
              "StateCode": "WA",
              "Country": "US",
              "CountryCode": "US",
              "ZipCode": "98109",
              "Url": "http://www.thefunhouseseattle.com/",
              "Latitude": 47.6200527,
              "Longitude": -122.3476219
            },
            "Artists": [
              {
                "Id": 115158,
                "Name": "Fea"
              }
            ],
            "TicketUrl": "http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1282411/tfly?utm_medium=api"
          },
          {
            "Id": 2860741,
            "Date": "2016-12-02T21:00:00",
            "Venue": {
              "Id": 43043,
              "Name": "High Dive",
              "Address": "513 N 36th st ",
              "City": "Seattle",
              "State": "Washington",
              "StateCode": "WA",
              "Country": "US",
              "CountryCode": "US",
              "ZipCode": "98103",
              "Url": "http://www.highdiveseattle.com",
              "Latitude": 47.651722,
              "Longitude": -122.351744
            },
            "Artists": [
              {
                "Id": 59843,
                "Name": "Moneta"
              }
            ],
            "TicketUrl": "http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1353127/tfly?utm_medium=api"
          }
        ];
        
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
        // this.setState({
        //   todaysEvents: [
        //     {
        //       "Id": 2854803,
        //       "Date": "2016-12-02T20:30:00",
        //       "Venue": {
        //         "Id": 158984,
        //         "Name": "Capps Club",
        //         "Address": "7620 Bothell Way NE",
        //         "City": "Kenmore",
        //         "State": "Washington",
        //         "StateCode": "WA",
        //         "Country": "US",
        //         "CountryCode": "US",
        //         "ZipCode": "98028",
        //         "Url": "",
        //         "Latitude": 0,
        //         "Longitude": 0
        //       },
        //       "Artists": [
        //         {
        //           "Id": 62198,
        //           "Name": "Creme Tangerine"
        //         }
        //       ],
        //       "TicketUrl": "http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1335105/tfly?utm_medium=api"
        //     },
        //     {
        //       "Id": 2828236,
        //       "Date": "2016-12-02T21:00:00",
        //       "Venue": {
        //         "Id": 79954,
        //         "Name": "The Funhouse",
        //         "Address": "206 5th Ave N",
        //         "City": "Seattle",
        //         "State": "Washington",
        //         "StateCode": "WA",
        //         "Country": "US",
        //         "CountryCode": "US",
        //         "ZipCode": "98109",
        //         "Url": "http://www.thefunhouseseattle.com/",
        //         "Latitude": 47.6200527,
        //         "Longitude": -122.3476219
        //       },
        //       "Artists": [
        //         {
        //           "Id": 115158,
        //           "Name": "Fea"
        //         }
        //       ],
        //       "TicketUrl": "http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1282411/tfly?utm_medium=api"
        //     },
        //     {
        //       "Id": 2860741,
        //       "Date": "2016-12-02T21:00:00",
        //       "Venue": {
        //         "Id": 43043,
        //         "Name": "High Dive",
        //         "Address": "513 N 36th st ",
        //         "City": "Seattle",
        //         "State": "Washington",
        //         "StateCode": "WA",
        //         "Country": "US",
        //         "CountryCode": "US",
        //         "ZipCode": "98103",
        //         "Url": "http://www.highdiveseattle.com",
        //         "Latitude": 47.651722,
        //         "Longitude": -122.351744
        //       },
        //       "Artists": [
        //         {
        //           "Id": 59843,
        //           "Name": "Moneta"
        //         }
        //       ],
        //       "TicketUrl": "http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1353127/tfly?utm_medium=api"
        //     }
        //   ],
        //
        //   events: [
        //   {
        //     "Id": 2854803,
        //     "Date": "2016-12-02T20:30:00",
        //     "Venue": {
        //       "Id": 158984,
        //       "Name": "Capps Club",
        //       "Address": "7620 Bothell Way NE",
        //       "City": "Kenmore",
        //       "State": "Washington",
        //       "StateCode": "WA",
        //       "Country": "US",
        //       "CountryCode": "US",
        //       "ZipCode": "98028",
        //       "Url": "",
        //       "Latitude": 0,
        //       "Longitude": 0
        //     },
        //     "Artists": [
        //       {
        //         "Id": 62198,
        //         "Name": "Creme Tangerine"
        //       }
        //     ],
        //     "TicketUrl": "http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1335105/tfly?utm_medium=api"
        //   },
        //   {
        //     "Id": 2828236,
        //     "Date": "2016-12-02T21:00:00",
        //     "Venue": {
        //       "Id": 79954,
        //       "Name": "The Funhouse",
        //       "Address": "206 5th Ave N",
        //       "City": "Seattle",
        //       "State": "Washington",
        //       "StateCode": "WA",
        //       "Country": "US",
        //       "CountryCode": "US",
        //       "ZipCode": "98109",
        //       "Url": "http://www.thefunhouseseattle.com/",
        //       "Latitude": 47.6200527,
        //       "Longitude": -122.3476219
        //     },
        //     "Artists": [
        //       {
        //         "Id": 115158,
        //         "Name": "Fea"
        //       }
        //     ],
        //     "TicketUrl": "http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1282411/tfly?utm_medium=api"
        //   },
        //   {
        //     "Id": 2860741,
        //     "Date": "2016-12-02T21:00:00",
        //     "Venue": {
        //       "Id": 43043,
        //       "Name": "High Dive",
        //       "Address": "513 N 36th st ",
        //       "City": "Seattle",
        //       "State": "Washington",
        //       "StateCode": "WA",
        //       "Country": "US",
        //       "CountryCode": "US",
        //       "ZipCode": "98103",
        //       "Url": "http://www.highdiveseattle.com",
        //       "Latitude": 47.651722,
        //       "Longitude": -122.351744
        //     },
        //     "Artists": [
        //       {
        //         "Id": 59843,
        //         "Name": "Moneta"
        //       }
        //     ],
        //     "TicketUrl": "http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1353127/tfly?utm_medium=api"
        //   }
        // ]})
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

  getGoing() {
    axios.get('/going')
      .then((res) => {
        const goingEvents = res.data;
        let pastEvents = [];
        let comingEvents = [];

        for (let i = 0; i < goingEvents.length; i++) {
          if (goingEvents[i].eventDate < moment().format()) {
            pastEvents.push(goingEvents[i]);
          }
          else {
            comingEvents.push(goingEvents[i]);
          }
        }

        this.setState({ going: comingEvents, attended: pastEvents });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getMaybe() {
    axios.get('/maybe')
      .then((res) => {

        this.setState({ maybe: res.data });
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
