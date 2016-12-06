import Navbar from './Navbar';
import React from 'react';

const Header = React.createClass({

  render() {
    return (

      <div>
        <Navbar
          isLoggedIn={this.props.isLoggedIn}
          signOut={this.props.signOut}
        />
      </div>

    );
  }
});

export default Header;
