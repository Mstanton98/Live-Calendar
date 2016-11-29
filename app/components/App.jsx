import { BrowserRouter } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header';
import Main from './Main';
import React from 'react';

injectTapEventPlugin();

const App = React.createClass({

  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <div>
            <Header />
            <Main />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
});

export default App;
