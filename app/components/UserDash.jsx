import React from 'react';
import Users from './Users';
// SideBar
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
// Card
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
// Badge
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

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
       <div className="container">
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

        {/* Cards */}

        <div id="user-main-dash">
          <div className="row ud-row-one">
            <div className="six columns">

        {/* Card Attending */}
          <Card>
            <CardHeader
              title="Your Attending"
              subtitle="Confirmed Shows"
            />
          <CardText >
            Show Data Goes Here
          </CardText>
          <CardActions>
            <p>Followers</p>
            <div className="ud-followers-badge">
              <FlatButton disabled={true} label="Going" />
                 <Badge
                   badgeContent={10}
                   primary={true}
                 >
                   <NotificationsIcon />
                 </Badge>
            </div>
            <div className="ud-followers-badge">
              <FlatButton disabled={true} label="Maybes" />
              <Badge
                badgeContent={4}
                secondary={true}
              >
                <NotificationsIcon />
              </Badge>
            </div>

          </CardActions>
          </Card>
          </div>

          {/* Card Maybes */}
          <div className="six columns">
        <Card>
          <CardHeader
            title="Your Maybes"
            subtitle="Might Go Shows"
          />
        <CardText>
          Show Data Here
        </CardText>
        <CardActions>
          <p>Followers</p>
          <div className="ud-followers-badge">
            <FlatButton disabled={true} label="Going" />
            <Badge
              badgeContent={10}
              primary={true}
            >
              <NotificationsIcon />
            </Badge>
          </div>
          <div className="ud-followers-badge">
            <FlatButton disabled={true} label="Maybes" />
            <Badge
              badgeContent={4}
              secondary={true}
            >
              <NotificationsIcon />
            </Badge>
          </div>
        </CardActions>
        </Card>
        </div>
        </div>

        <div className="row ud-row-two">
          <div className="six columns">
        <Card>
          <CardHeader
            title="Suggestions"
            subtitle="Followers are going"
          />
        <CardText>
          Show Data Here
        </CardText>
        <CardActions>
         <p>Followers</p>
          <FlatButton label="Going" />
          <FlatButton label="Action2" />
        </CardActions>
        </Card>
        </div>

        <div className="six columns">
      <Card>
        <CardHeader
          title="Attended"
          actAsExpander={true}
          showExpandableButton={true}
        />
      <CardText expandable={true}>
        Show Data Here
      </CardText>
      <CardActions>
        <FlatButton label="Action1" />
        <FlatButton label="Action2" />
      </CardActions>
      </Card>
      </div>
      </div>


        </div>
        {/* End Card */}
       </div>
      </div>
    );
  }
});

export default UserDash;
