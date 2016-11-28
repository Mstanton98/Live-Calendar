import React from 'react';

const Show = React.createClass({

  render() {
    return (

        <div id="show">
          <div className="card white">
            <div className="card-show-date">21</div>
            <div className="card-content black-text">
              <span className="band-title">Band Names</span>
              <hr />
              <span className="venue-title">Venue Name</span>
              <span className="date-time-title">11/28/16 9:00PM</span>
            </div>
            <div>
              <span className="going-title">Going </span>
              <span className="going-title">Maybe</span>
            </div>
            <div>
            <button className="ticket-link flat-btn">Tickets</button>
            </div>
             <div>
             <a className="venue-link">www.amazingplacetoseeshows.com</a>
            </div>
          </div>
        </div>

    );
  }
});

export default Show;
