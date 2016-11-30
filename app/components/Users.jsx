import React from 'react';
import User from './User';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {black400, grey500, grey100, blue500} from 'material-ui/styles/colors';

const styles = {
  button: {
    backgroundColor: grey100,
    color: black400
  },
  searchbox: {
    marginLeft: 20,
    marginBottom: 10
  },
  floatingLabelStyle: {
    fontSize: 16,
    color: blue500
  },
  floatingLabelFocusStyle: {
    color: grey100
  }
};

const Users = React.createClass({

  render() {
    return (

      <div id="users" style={styles.container} >
      <List>
      <div style={styles.searchbox}>
      <ListItem primaryText="Users" />
      <TextField
        floatingLabelText="Search by Username"
        floatingLabelStyle={styles.floatingLabelStyle}
        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
      />
      <FlatButton label="submit" type="submit" style={styles.button}/>
      </div>
      </List>
      <Divider />
      <List>
      <ListItem primaryText="Following" />
      <User />
      </List>

      </div>

    );
  }
});

export default Users;
