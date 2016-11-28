import React from 'react';
import Show from './Show';

const Shows = React.createClass({

  render() {
    return (

      <div id="shows">
        <ul className="collapsible" data-collapsible="accordion">
          <li>
            <div className="collapsible-header" ><i className="material-icons"></i>Awesome Show</div>
            <div className="collapsible-body"><div><Show /></div></div>
          </li>
        </ul>
      </div>

    );
  }
});

export default Shows;
