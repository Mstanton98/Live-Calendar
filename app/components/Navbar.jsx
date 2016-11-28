import Login from './Login';
import React from 'react';

const Navbar = React.createClass({

  render() {
    return (

      <div>
        <nav>
          <div className="nav-wrapper black">
            <a href="#" className="brand-logo">Live! Calendar</a>
            <ul className="right hide-on-med-and-down">
               <li><a href="#">SignUp</a></li>
            </ul>
          </div>
        </nav>
        <Login />
      </div>

    );
  }
});

export default Navbar;
