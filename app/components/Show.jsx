import React from 'react';

const Show = React.createClass({

  render() {
    return (

      <div id="show">
        {/* <div className="container"> */}
          <div className="row">
            <div className="col ">
              <div className="card white">
                <div className="card-content black-text">
                  <p className="card-title">Band Name</p>
                  <hr />
                  <span className="sub-title">Venue Name</span>
                  <p></p>
                  <p></p>
                  <p></p>
                </div>

              </div>
            </div>
          </div>
        {/* </div> */}
      </div>

    );
  }
});

export default Show;
