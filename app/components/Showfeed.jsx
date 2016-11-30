import React from 'react';
import Shows from './Shows';



const Showfeed = React.createClass({

  render() {
    return (

      <div id="Showfeed">
        <Shows
          todaysEvents={this.props.todaysEvents}
       />

      </div>

    );
  }
});

export default Showfeed;
