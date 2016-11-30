import React from 'react';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Chip from 'material-ui/Chip';

function handleRequestDelete() {
  alert('Delete yourself.');
}

function handleTouchTap() {
  alert('Do you mind?');
}

const styles = {
  chip: {
    margin: 0,
    padding: 5,
    width: 175
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  }
};

const User = React.createClass({

  render() {
    return (

      <div id="user">
       <div style={styles.wrapper}>
       <List>
        <ListItem>
          <Chip
          onRequestDelete={handleRequestDelete}
          onTouchTap={handleTouchTap}
          style={styles.chip}
          >
          User Name Here
          </Chip>

        </ListItem>
      </List>
      </div>
    </div>

    );
  }
});

export default User;
