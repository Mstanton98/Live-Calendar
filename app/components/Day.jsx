import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const Day = React.createClass({

  render() {
    return (

      <div>
      <Card>
      <CardHeader
        title={this.props.event.artist}
        subtitle={this.props.event.venue}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
      <div className="card-content black-text">
        <div className="date-time-title">{this.props.event.date}</div>
      </div>
      <div className="card-action">
        <FlatButton label="Tickets" href={this.props.event.ticketUrl} />
      </div>
      </CardText>
      <CardActions>
      <FlatButton
        label="Going"
        name="Going"
        value={this.props.event}
        onClick={this.handleClickGoing}
      />
      <FlatButton
        label="Maybe"
        name="Maybe"
        value={this.props.event}
        onClick={this.handleClickMaybe}
      />
      </CardActions>
      </Card>
      </div>

    );
  }
});

export default Day;
