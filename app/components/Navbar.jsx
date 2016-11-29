// Router
import { Link, Match } from 'react-router';
import Auth from './Auth';
import Calendar from './Main';
// UI
import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

class Login extends Component {
  static muiName= 'FlatButton';

  render() {
    return (
      <FlatButton {...this.props} label="Login" />
    );
  }
}

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <Link to="/Auth"><MenuItem primaryText="Login" /></Link>
    <Link to="/Auth"><MenuItem primaryText="Signup" /></Link>
    <Link to="/Calendar"><MenuItem primaryText="Calendar" /></Link>
    <Link to="/UserDash"><MenuItem primaryText="Dashboard" /></Link>

  </IconMenu>
);

Logged.muiName = 'IconMenu';

const Navbar = React.createClass({
  getInitialState() {
    return {
      logged: true
    }
  },

  render() {
    return (
        <div>
        <AppBar
          title="Live!"
          iconElementRight={this.state.logged ? <Logged /> : <Login />}
        />
      </div>
    );
  }
});

export default Navbar;

//
//   <div>
//   <nav>
//   <div className="nav-wrapper black">
//     <ul role="nav">
//      <li className="brand-logo left">
//        <Link to="/">Live!</Link></li>
//       <li className="right"><Link to="/Auth">Login </Link></li>
//       <li className="right"><Link to="/Auth">Sign Up</Link></li>
//     </ul>
//   </div>
// </nav>
// </div>
