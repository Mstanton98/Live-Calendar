import { BrowserRouter } from 'react-router';
import Header from './Header';
import Main from './Main';
import React from 'react';

const App = React.createClass({

  render() {
    return (
      <BrowserRouter>
      <div>
        <Header />
        <Main />
      </div>
      </BrowserRouter>
    );
  }
});

export default App;
