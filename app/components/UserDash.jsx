import React from 'react';
import Users from './Users';
// SideBar
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

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

  componentDidMount() {
    this.props.getGoing();
    this.props.getMaybe();
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
              <div className="row ">
                <div className="six columns">

                  {/* Card Attending */}
                  <Card>
                    <CardHeader
                      title="You're Attending"
                      subtitle="Confirmed Shows"
                    />
                    {this.props.going.map((event, index) => {
                      return <CardText
                        event={event}
                        key={index}
                        >
                          <p>{event.artistName}</p>
                          <p>{event.venueName}</p>
                          <p>{event.exactDate}</p>
                          <CardActions>
                            <p>Followers</p>
                            <div className="ud-followers-badge">
                              <FlatButton disabled={true} label="Going" />
                              <Badge
                                badgeContent={event.attendeesGoing.length}
                                primary={true}
                                >
                                  <NotificationsIcon />
                                </Badge>
                              </div>
                              <div className="ud-followers-badge">
                                <FlatButton disabled={true} label="Maybes" />
                                <Badge
                                  // badgeContent={event.attendeesMaybe.length}
                                  secondary={true}
                                  >
                                    <NotificationsIcon />
                                  </Badge>
                                </div>

                              </CardActions>
                            </CardText>
                          })}
                        </Card>
                      </div>

                      {/* Card Maybes */}
                      <div className="six columns">
                        <Card>
                          <CardHeader
                            title="Your Maybes"
                            subtitle="Might Go Shows"
                          />
                          {this.props.maybe.map((event, index) => {
                            return <CardText
                              event={event}
                              key={index}
                              >
                                <p>{event.artistName}</p>
                                <p>{event.venueName}</p>
                                <p>{event.exactDate}</p>
                                <CardActions>
                                  <p>Followers</p>
                                  <div className="ud-followers-badge">
                                    <FlatButton disabled={true} label="Going" />
                                    <Badge
                                      badgeContent={event.attendeesGoing.length}
                                      primary={true}
                                      >
                                        <NotificationsIcon />
                                      </Badge>
                                    </div>
                                    <div className="ud-followers-badge">
                                      <FlatButton disabled={true} label="Maybes" />
                                      <Badge
                                        badgeContent={event.attendeesMaybe.length}
                                        secondary={true}
                                        >
                                          <NotificationsIcon />
                                        </Badge>
                                      </div>
                                    </CardActions>
                                  </CardText>
                                })}
                              </Card>
                            </div>

                            <div className="row">
                            <div className="six columns offset-by-six">
                              <Card>
                                <CardHeader
                                  title="Attended"
                                  actAsExpander={true}
                                  showExpandableButton={true}
                                />
                                {this.props.attended.map((event, index) => {
                                  return <CardText
                                    event={event}
                                    key={index}
                                    >
                                    <p>{event.artistName}</p>
                                    <p>{event.venueName}</p>
                                    <p>{event.exactDate}</p>
                                  </CardText>
                                })}
                              </Card>
                            </div>
                          </div>
                        </div>

                        </div>
                        {/* End Card */}
                      </div>
                      <Snackbar
         open={this.props.open}
         message="User followed!"
         autoHideDuration={4000}
       />
       <Snackbar
         open={this.props.open1}
         message="User not found."
         autoHideDuration={4000}
       />
                    </div>
                  );
                }
              });

              export default UserDash;
