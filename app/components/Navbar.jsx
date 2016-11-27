import Login from './Login';
import React from 'react';

const Navbar = React.createClass({

  render() {
    return (

      <div>
        <ul id="dropdown1" className="dropdown-content">
          <li><a href="#!">Listings</a></li>
          <li><a href="#!">Signup</a></li>
          <li className="divider"></li>
          <li><a href="#!">Login</a></li>
        </ul>
        <nav>
          <div className="nav-wrapper black">
            <a href="#" className="brand-logo">Live! Calendar</a>
            <ul className="right hide-on-med-and-down">
              <li><a href="sass.html">Listings</a></li>
              <li><a href="badges.html">Login</a></li>
              <li>
                <a className="dropdown-button" href="#!" data-activates="dropdown1">More<i className="material-icons right">arrow_drop_down</i>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <Login />
      </div>

    );
  }
});

export default Navbar;
