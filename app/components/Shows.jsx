import React from 'react';
import Show from './Show';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const Shows = React.createClass({

  render() {
    return (

      <div id="shows">
      <Card>
        <CardHeader
          title="Today's Shows"
          actAsExpander={true}
          showExpandableButton={true}
        />
      <CardText
        expandable={true}
      >
      <Show />
      </CardText>
      </Card>
      </div>

    );
  }
});

export default Shows;
