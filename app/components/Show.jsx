import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const Show = React.createClass({

  render() {
    return (

        <div id="show">
        <Card>
        <CardHeader
          title="Band Name"
          subtitle="Venue Name"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
        <div className="card-content black-text">
          <div className="date-time-title">11/28/16 9:00PM</div>
        </div>
        <div className="card-action">
          <button className="ticket-link flat-btn">Tickets</button>
        </div>
        </CardText>
        <CardActions>
        <FlatButton label="Going" />
        <FlatButton label="Maybe" />
        </CardActions>
        </Card>
        </div>

    );
  }
});

export default Show;

{/* <div className="card white">
  <div className="card-show-date">21</div>
  <div className="card-content black-text">
    <span className="band-title">Band Names</span>
    <hr />
    <span className="venue-title">Venue Name</span>
    <span className="date-time-title">11/28/16 9:00PM</span>
  </div>
  <div>
    <span className="going-title">Going </span>
    <span className="going-title">Maybe</span>
  </div>
  <div className="card-action">
    <button className="ticket-link flat-btn">Tickets</button>
  </div>
   <div>

  </div>
</div> */}
