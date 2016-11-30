import React from 'react';
import Shows from './Shows';



const Showfeed = React.createClass({

  render() {
    return (

      <div id="Showfeed">
        <Shows
          postEvent={this.props.postEvent}
          todaysEvents={this.props.todaysEvents}
       />

      </div>

    );
  }
});

export default Showfeed;
