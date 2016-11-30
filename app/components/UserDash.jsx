import React from 'react';
import Users from './Users';
// SideBar
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
// Card
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const UserDash = React.createClass({
  getInitialState() {
    return {
      open: false
    };
  },

  handleToggle() {
    this.setState({ open: !this.state.open });
  },
  handleClose() {
    this.setState({ open: false });
  },

  render() {
    return (

      <div id="userDash">
        {/* Drawer / Sidebar */}
      <div>
        <RaisedButton
          label="Users Dock"
          onTouchTap={this.handleToggle}
          onClick={this.props.getFollowing}
        />
        <Drawer
          docked={false}
          width={400}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
        <Users
          following={this.props.following}
          deleteFollowing={this.props.deleteFollowing}
          getUserName={this.props.getUserName}
          followUser={this.props.followUser}
          userSearch={this.props.userSearch}
        />
          <MenuItem onTouchTap={this.handleClose}>Menu Item</MenuItem>
          <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
        </Drawer>
      </div>
        {/* End Drawer / Sidebar */}

        {/* Card */}
        <div>
        <Card>
         <CardHeader
           title="Attending"
           actAsExpander={true}
           showExpandableButton={true}
         />
         <CardText expandable={true}>
           Lorem ipsum dolor sit amet, consectetur adipiscing elit.
           Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
           Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
           Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
         </CardText>
         <CardActions>
           <FlatButton label="Action1" />
           <FlatButton label="Action2" />
         </CardActions>
         </Card>
         </div>
      {/* End Card */}
      </div>

    );
  }
});

export default UserDash;
