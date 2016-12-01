import Days from './Days';
import Shows from './Shows';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import React from 'react';
import Dialog from 'material-ui/Dialog';
// import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

BigCalendar.momentLocalizer(moment);

const Month = React.createClass({
  getInitialState() {
    return {
      open: false,
      currentDateStart: null,
      date: null,
      currentDateEnd: null,
      currentDayEvents: [],
      events: [
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
      ]
    };
  },

  filterEvents() {
    let propEvents = this.props.events;
    let dayEventsArr = [];
    for (let i = 0; i < propEvents.length; i++) {
      if (propEvents[i].date === this.state.date) {
        dayEventsArr.push(propEvents[i]);
      }
    }

    this.setState({ currentDayEvents: dayEventsArr })
  },

  handleOpen() {
    this.setState({open: true});
  },

  handleClose() {
    this.setState({open: false});
  },

  handleSelectSlot(obj) {
    const newDate = moment(obj.start).format();
    const stringDate = newDate.toString();
    const exactDate = stringDate.substring(0, stringDate.indexOf('T'));

    this.setState({ date: exactDate });
    this.handleOpen();
    this.filterEvents();
  },

  render() {
    return (

      <div id="month">
        <BigCalendar
          defaultDate={new Date()}
          defaultView="month"
          endAccessor="endDate"
          events={this.props.events}
          onSelectSlot={this.handleSelectSlot}
          selectable={true}
          startAccessor="startDate"
          step={15}
          timeslots={8}
          views={['month']}
        />


        <div>
          <Dialog
            title="Dialog With Actions"
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            >
              <Days
                postEvent={this.props.postEvent}
                todaysEvents={this.state.currentDayEvents}/>
              </Dialog>
            </div>
          </div>

        );
      }
    });

    export default Month;
