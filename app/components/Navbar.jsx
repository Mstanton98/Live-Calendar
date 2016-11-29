import { Link, Match } from 'react-router';
import Auth from './Auth';
import Calendar from './Main';
import React from 'react';

const Navbar = React.createClass({

  render() {
    return (
        <div>
          <nav>
            <div className="nav-wrapper black">
              <ul role="nav">
               <li className="brand-logo left">
                 <Link to="/">Live!</Link></li>
                <li className="right"><Link to="/Auth">Login </Link></li>
                <li className="right"><Link to="/Auth">Sign Up</Link></li>
              </ul>
            </div>
          </nav>
        </div>
    );
  }
});

export default Navbar;
