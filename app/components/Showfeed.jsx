import React from 'react';
import Shows from './Shows';

const Showfeed = React.createClass({

  render() {
    return (

      <div>
        <Shows
          events={this.props.events}
       />
      </div>

    );
  }
});

export default Showfeed;
