import Day from './Day';
import React from 'react';

const Days = React.createClass({

  render() {
    return (

      <div>
        <div className="container">
          <div className="row">
            <div className="col offset-s4"></div>
            <div className="weekDays">
              <div className="col s1 m1 l1">
                <span className="day">S</span>
              </div>
              <div className="col s1 m1 l1">
                <span className="day">M</span>
              </div>
              <div className="col s1 m1 l1">
                <span className="day">T</span>
              </div>
              <div className="col s1 m1 l1">
                <span className="day">W</span>
              </div>
              <div className="col s1 m1 l1">
                <span className="day">T</span>
              </div>
              <div className="col s1 m1 l1">
                <span className="day">F</span>
              </div>
              <div className="col s1 m1 l1">
                <span className="day">S</span>
              </div>
            </div>

          </div>
        </div>

        <Day />
      </div>

    );
  }
});

export default Days;
