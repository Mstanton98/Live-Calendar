import { BrowserRouter } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header';
import axios from 'axios';
import Main from './Main';
import React from 'react';

injectTapEventPlugin();

const App = React.createClass({
  getInitialState() {
    return {
      isLoggedIn: false
    }
  },

  signOut() {
    return axios.delete('/token')
    .catch((err) => {
      console.log(err);
    });
  },

  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <div>
            <Header
              signOut={this.signOut}
              isLoggedIn={this.state.isLoggedIn}
            />
            <Main
              isLoggedIn={this.state.isLoggedIn}
            />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
});

export default App;
