import React from 'react';
import Show from './Show';

const Shows = React.createClass({

  render() {
    return (

      <div id="shows">
      <ul className="collapsible" data-collapsible="accordion">
        <li>
          <div className="collapsible-header"><i className="material-icons">filter_drama</i>First</div>
          <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
        </li>
        <li>
          <div className="collapsible-header"><i className="material-icons">place</i>Second</div>
          <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
        </li>
        <li>
          <div className="collapsible-header"><i className="material-icons">whatshot</i>Third</div>
          <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
        </li>
      </ul>
        <Show />
      </div>

    );
  }
});

export default Shows;
