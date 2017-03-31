(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = null;
    hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("components/App.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRouter = require('react-router');

var _reactTapEventPlugin = require('react-tap-event-plugin');

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _Main = require('./Main');

var _Main2 = _interopRequireDefault(_Main);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactTapEventPlugin2.default)();

var App = _react2.default.createClass({
  displayName: 'App',
  getInitialState: function getInitialState() {
    return {
      isLoggedIn: false
    };
  },
  signOut: function signOut() {
    return _axios2.default.delete('/token').catch(function (err) {
      console.log(err);
    });
  },
  render: function render() {
    return _react2.default.createElement(
      _MuiThemeProvider2.default,
      null,
      _react2.default.createElement(
        _reactRouter.BrowserRouter,
        null,
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_Header2.default, {
            signOut: this.signOut,
            isLoggedIn: this.state.isLoggedIn
          }),
          _react2.default.createElement(_Main2.default, {
            isLoggedIn: this.state.isLoggedIn
          })
        )
      )
    );
  }
});

exports.default = App;
});

require.register("components/Auth.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _BrowserRouter = require('react-router/BrowserRouter');

var _BrowserRouter2 = _interopRequireDefault(_BrowserRouter);

var _Redirect = require('react-router/Redirect');

var _Redirect2 = _interopRequireDefault(_Redirect);

var _Snackbar = require('material-ui/Snackbar');

var _Snackbar2 = _interopRequireDefault(_Snackbar);

var _Login = require('./Login');

var _Login2 = _interopRequireDefault(_Login);

var _Signup = require('./Signup');

var _Signup2 = _interopRequireDefault(_Signup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const PosterImage='./img/posters.png';
var PosterImage1 = 'https://images.bigcartel.com/product_images/159878917/AmericanFootball_SongExploder_FinalScan_1200px.jpg?auto=format&fit=max&h=1000&w=1000';
var PosterImage2 = 'https://images.bigcartel.com/product_images/189275951/NickelCreek_WDC_FinalScan_1200px.jpg?auto=format&fit=max&h=1000&w=1000';
var PosterImage3 = 'http://411posters.com/wp-content/uploads/2013/08/grzeca-father-john-misty-chicago-il-2013.jpg';
var PosterImage4 = 'http://images.bigcartel.com/product_images/178653131/MMJ_Houston2016.jpg?auto=format&fit=max&h=1000&w=1000';
var PosterImage5 = 'https://images.bigcartel.com/product_images/169116565/Baths_FinalScan_800px.jpg?auto=format&fit=max&h=1000&w=1000';
var PosterImage6 = 'http://images.bigcartel.com/product_images/186193982/Screen_Shot_2016-09-06_at_3.02.46_PM.png?auto=format&fit=max&h=1000&w=1000';
var PosterImage7 = 'http://images.bigcartel.com/product_images/186194888/BoH_SF.jpg?auto=format&fit=max&h=1000&w=1000';
var PosterImage8 = 'https://images.bigcartel.com/product_images/130297881/AmosLee_tour_FinalScan_1200px.jpg?auto=format&fit=max&h=1000&w=1000';
var PosterImage9 = 'http://images.bigcartel.com/product_images/176562674/JohnPrine_NYBOS.jpg?auto=format&fit=max&h=1000&w=1000';
var PosterImage10 = 'http://images.bigcartel.com/product_images/148764601/OCMS_Fall-2014.jpg?auto=format&fit=max&h=1000&w=1000';
var PosterImage11 = 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/6d2fa72033378.560118f8d8284.jpg';
var PosterImage12 = 'http://images.bigcartel.com/product_images/157924645/Tame-Impala_foil.jpg?auto=format&fit=max&h=1000&w=1000';
var PosterImage13 = 'http://thestuff.nakatomiinc.com/wp-content/uploads/2012/07/The-Mountain-Goats-Poster-2-Nakatomi-700x933.jpg';
var PosterImage14 = 'http://3.bp.blogspot.com/-NXGS0UEpQxQ/UQrxySOde6I/AAAAAAAAA1c/PrnqZI1xpnE/s1600/LumineersTerminal5BuckScreenShot.png';
var PosterImage15 = 'https://s-media-cache-ak0.pinimg.com/originals/91/87/bb/9187bb0c80fd88cc0034d826cdc17d44.jpg';
var PosterImage16 = 'https://images.bigcartel.com/product_images/189275426/JBT_RedRocks_FinalScan_1500px.jpg?auto=format&fit=max&h=1000&w=1000';
var PosterImage17 = 'https://images.bigcartel.com/product_images/189242096/DMB_WPB_N2_FinalScan_1500px.jpg?auto=format&fit=max&h=1000&w=1000';
var PosterImage18 = 'https://images.bigcartel.com/product_images/128253432/GrandPointNorth_FinalScan_1200px.jpg?auto=format&fit=max&h=1000&w=1000';

var Auth = _react2.default.createClass({
  displayName: 'Auth',
  getInitialState: function getInitialState() {
    return {
      login: true,
      open: false,
      open1: false,
      open2: false
    };
  },
  componentDidMount: function componentDidMount() {
    this.setState({ open: false, open1: false, open2: false });
  },
  userLogin: function userLogin(user) {
    var _this = this;

    _axios2.default.post('/token', user).then(function (res) {
      if (res) {
        _this.setState({ open: true });
        window.location.pathname = '/Calendar';
      } else {
        _this.setState({ open2: true });
      }
    }).catch(function (err) {
      console.log(err);
    });
  },
  userSignup: function userSignup(user) {
    var _this2 = this;

    var userEmail = user.email;
    var userPassword = user.password;

    _axios2.default.post('/users', user).then(function (res) {
      if (res.data.email === userEmail) {
        _axios2.default.post('/token', {
          email: userEmail,
          password: userPassword
        }).then(function (response) {
          if (response) {
            _this2.setState({ open1: true });
            window.location.pathname = '/Calendar';
          } else {
            _this2.setState({ open2: true });
          }
        }).catch(function (err) {
          console.log(err);
        });
      }
    }).catch(function (err) {
      console.log(err);
    });
  },
  loginRender: function loginRender() {
    this.setState({ login: true });
  },
  signupRender: function signupRender() {
    this.setState({ login: false });
  },
  render: function render() {
    var loginForm = null;
    var signup = null;

    this.state.login ? loginForm = _react2.default.createElement(_Login2.default, {
      open: this.state.open,
      open2: this.state.open2,
      login: this.userLogin,
      signupRender: this.signupRender
    }) : signup = _react2.default.createElement(_Signup2.default, {
      open1: this.state.open1,
      open2: this.state.open2,
      signup: this.userSignup,
      loginRender: this.loginRender
    });

    return _react2.default.createElement(
      'div',
      { id: 'overlay' },
      _react2.default.createElement(
        'div',
        { id: 'Auth' },
        _react2.default.createElement(
          'div',
          { id: 'wrapper' },
          _react2.default.createElement(
            'div',
            { id: 'masonry-column-container' },
            _react2.default.createElement(
              'div',
              { className: 'brick-item' },
              _react2.default.createElement('img', { className: 'twelve columns', src: PosterImage1 })
            ),
            _react2.default.createElement(
              'div',
              { className: 'brick-item' },
              _react2.default.createElement('img', { className: 'twelve columns', src: PosterImage2 })
            ),
            _react2.default.createElement(
              'div',
              { className: 'brick-item' },
              _react2.default.createElement('img', { className: 'twelve columns', src: PosterImage3 })
            ),
            _react2.default.createElement(
              'div',
              { className: 'brick-item' },
              _react2.default.createElement('img', { className: 'twelve columns', src: PosterImage4 })
            ),
            _react2.default.createElement(
              'div',
              { className: 'brick-item' },
              _react2.default.createElement('img', { className: 'twelve columns', src: PosterImage5 })
            ),
            _react2.default.createElement(
              'div',
              { className: 'brick-item' },
              _react2.default.createElement('img', { className: 'twelve columns', src: PosterImage6 })
            ),
            _react2.default.createElement(
              'div',
              { className: 'brick-item' },
              _react2.default.createElement('img', { className: 'twelve columns', src: PosterImage7 })
            ),
            _react2.default.createElement(
              'div',
              { className: 'brick-item' },
              _react2.default.createElement('img', { className: 'twelve columns', src: PosterImage8 })
            ),
            _react2.default.createElement(
              'div',
              { className: 'brick-item' },
              _react2.default.createElement('img', { className: 'twelve columns', src: PosterImage9 })
            ),
            _react2.default.createElement(
              'div',
              { className: 'brick-item' },
              _react2.default.createElement('img', { className: 'twelve columns', src: PosterImage10 })
            ),
            _react2.default.createElement(
              'div',
              { className: 'brick-item' },
              _react2.default.createElement('img', { className: 'twelve columns', src: PosterImage11 })
            ),
            _react2.default.createElement(
              'div',
              { className: 'brick-item' },
              _react2.default.createElement('img', { className: 'twelve columns', src: PosterImage12 })
            ),
            _react2.default.createElement(
              'div',
              { className: 'brick-item' },
              _react2.default.createElement('img', { className: 'twelve columns', src: PosterImage13 })
            ),
            _react2.default.createElement(
              'div',
              { className: 'brick-item' },
              _react2.default.createElement('img', { className: 'twelve columns', src: PosterImage14 })
            ),
            _react2.default.createElement(
              'div',
              { className: 'brick-item' },
              _react2.default.createElement('img', { className: 'twelve columns', src: PosterImage15 })
            ),
            _react2.default.createElement(
              'div',
              { className: 'brick-item' },
              _react2.default.createElement('img', { className: 'twelve columns', src: PosterImage16 })
            ),
            _react2.default.createElement(
              'div',
              { className: 'brick-item' },
              _react2.default.createElement('img', { className: 'twelve columns', src: PosterImage17 })
            ),
            _react2.default.createElement(
              'div',
              { className: 'brick-item' },
              _react2.default.createElement('img', { className: 'twelve columns', src: PosterImage18 })
            )
          )
        ),
        loginForm,
        signup
      )
    );
  }
});

exports.default = Auth;
});

require.register("components/Calendar.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Month = require('./Month');

var _Month2 = _interopRequireDefault(_Month);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Showfeed = require('./Showfeed');

var _Showfeed2 = _interopRequireDefault(_Showfeed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Calendar = _react2.default.createClass({
  displayName: 'Calendar',
  render: function render() {
    return _react2.default.createElement(
      'div',
      { id: 'calendar' },
      _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'twelve columns' },
            _react2.default.createElement(_Showfeed2.default, {
              postEvent: this.props.postEvent,
              todaysEvents: this.props.todaysEvents
            })
          ),
          _react2.default.createElement(
            'div',
            { id: 'month', className: 'twelve columns' },
            _react2.default.createElement(_Month2.default, {
              postEvent: this.props.postEvent,
              events: this.props.events
            })
          )
        )
      )
    );
  }
});

exports.default = Calendar;
});

require.register("components/Day.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Card = require('material-ui/Card');

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Day = _react2.default.createClass({
  displayName: 'Day',
  handleClickGoing: function handleClickGoing() {
    var event = this.props.event;
    var goingEventData = {
      going: true,
      maybe: false,
      artistName: event.artist,
      venueName: event.venue,
      eventDate: event.start,
      eventId: event.id
    };

    return this.props.postEvent(goingEventData);
  },
  handleClickMaybe: function handleClickMaybe() {
    var event = this.props.event;
    var maybeEventData = {
      going: false,
      maybe: true,
      artistName: event.artist,
      venueName: event.venue,
      eventDate: event.start,
      eventId: event.id
    };

    return this.props.postEvent(maybeEventData);
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _Card.Card,
        null,
        _react2.default.createElement(_Card.CardHeader, {
          title: this.props.event.artist,
          subtitle: this.props.event.venue,
          actAsExpander: true,
          showExpandableButton: true
        }),
        _react2.default.createElement(
          _Card.CardText,
          { expandable: true },
          _react2.default.createElement(
            'div',
            { className: 'card-content black-text' },
            _react2.default.createElement(
              'div',
              { className: 'date-time-title' },
              this.props.event.date
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'card-action' },
            _react2.default.createElement(_FlatButton2.default, {
              label: 'Tickets',
              href: this.props.event.ticketUrl })
          )
        ),
        _react2.default.createElement(
          _Card.CardActions,
          null,
          _react2.default.createElement(_FlatButton2.default, {
            label: 'Going',
            name: 'Going',
            value: this.props.event,
            onClick: this.handleClickGoing
          }),
          _react2.default.createElement(_FlatButton2.default, {
            label: 'Maybe',
            name: 'Maybe',
            value: this.props.event,
            onClick: this.handleClickMaybe
          })
        )
      )
    );
  }
});

exports.default = Day;
});

require.register("components/Days.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Day = require('./Day');

var _Day2 = _interopRequireDefault(_Day);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Card = require('material-ui/Card');

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Days = _react2.default.createClass({
  displayName: 'Days',
  render: function render() {
    var _this = this;

    return _react2.default.createElement(
      'div',
      null,
      ' ',
      _react2.default.createElement(
        _Card.Card,
        null,
        _react2.default.createElement(_Card.CardHeader, {
          actAsExpander: true,
          showExpandableButton: true
        }),
        _react2.default.createElement(
          _Card.CardText,
          { expandable: true },
          this.props.todaysEvents.map(function (event, index) {
            return _react2.default.createElement(
              'div',
              { id: 'shows', key: index },
              _react2.default.createElement(_Day2.default, {
                postEvent: _this.props.postEvent,
                event: event
              })
            );
          })
        )
      )
    );
  }
});

exports.default = Days;
});

require.register("components/Header.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Navbar = require('./Navbar');

var _Navbar2 = _interopRequireDefault(_Navbar);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = _react2.default.createClass({
  displayName: 'Header',
  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_Navbar2.default, {
        isLoggedIn: this.props.isLoggedIn,
        signOut: this.props.signOut
      })
    );
  }
});

exports.default = Header;
});

require.register("components/Login.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _colors = require('material-ui/styles/colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = {
  signup: {},
  input: {
    padding: 10,
    display: 'block',
    margin: 'auto'
  },
  submit: {}
};

var Login = _react2.default.createClass({
  displayName: 'Login',
  getInitialState: function getInitialState() {
    return {
      email: '',
      password: ''
    };
  },
  handleSubmit: function handleSubmit(event) {
    event.preventDefault();

    return this.props.login(this.state);
  },
  handleChange: function handleChange(event) {
    var nextState = _defineProperty({}, event.target.name, event.target.value);

    this.setState(nextState);
  },
  handleClick: function handleClick(event) {
    event.preventDefault();

    return this.props.signupRender();
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { id: 'login', className: 'offset-by-five columns' },
      _react2.default.createElement(
        'div',
        { className: 'three columns', style: styles.signup },
        _react2.default.createElement(
          'form',
          { onSubmit: this.handleSubmit },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'twelve columns' },
              _react2.default.createElement(
                'label',
                {
                  className: 'six columns offset-by-three',
                  'data-error': 'wrong',
                  'data-success': 'right' },
                ' Email'
              ),
              _react2.default.createElement('input', {
                className: 'six columns offset-by-three',
                id: 'email',
                name: 'email',
                type: 'email',
                value: this.state.email,
                onChange: this.handleChange
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'twelve columns' },
              _react2.default.createElement(
                'label',
                { className: 'six columns offset-by-three' },
                'Password'
              ),
              _react2.default.createElement('input', {
                className: 'six columns offset-by-three',
                id: 'password',
                name: 'password',
                type: 'password',
                value: this.state.password,
                onChange: this.handleChange
              })
            )
          ),
          _react2.default.createElement('div', { className: 'six columns offset-by-three' }),
          _react2.default.createElement(
            'button',
            {
              style: styles.submit,
              className: 'button six columns offset-by-three',
              type: 'submit',
              name: 'action' },
            'Login'
          ),
          _react2.default.createElement(
            'button',
            {
              style: styles.submit,
              className: 'button six columns offset-by-three btn',
              type: 'submit',
              onClick: this.handleClick,
              name: 'action' },
            'Sign Up!'
          )
        )
      )
    );
  }
});

exports.default = Login;
});

require.register("components/Main.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRouter = require('react-router');

var _Calendar = require('./Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _Auth = require('./Auth');

var _Auth2 = _interopRequireDefault(_Auth);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Redirect = require('react-router/Redirect');

var _Redirect2 = _interopRequireDefault(_Redirect);

var _UserDash = require('./UserDash');

var _UserDash2 = _interopRequireDefault(_UserDash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { BrowserRouter } from 'react-router';
var Main = _react2.default.createClass({
  displayName: 'Main',
  getInitialState: function getInitialState() {
    return {
      events: [],
      todaysEvents: [],
      following: [],
      going: [],
      attended: [],
      maybe: [],
      userSearch: [],
      loggedIn: false,
      loadErr: false
    };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    this.setState({ open: false, open1: false });
    _axios2.default.get('/events').then(function (res) {

      var events = res.data.Events;

      var newEvents = [];
      var todaysEvents = [];
      var date = (0, _moment2.default)().format();

      for (var i = 0; i < events.length; i++) {
        var stringDate = date.toString();
        var exactDate = stringDate.substring(0, stringDate.indexOf('T'));

        var stringEventDate = events[i].Date.toString();
        var exactEventDate = stringEventDate.substring(0, stringEventDate.indexOf('T'));

        var singleEvent = {
          id: events[i].Id,
          title: events[i].Artists[0].Name + ' @ ' + events[i].Venue.Name,
          artist: events[i].Artists[0].Name,
          venue: events[i].Venue.Name,
          ticketUrl: events[i].TicketUrl,
          venueUrl: events[i].Venue.Url,
          allDay: true,
          date: exactEventDate,
          start: events[i].Date
        };

        if (singleEvent.date === exactDate) {
          todaysEvents.push(singleEvent);
        }

        newEvents.push(singleEvent);
      }

      _this.setState({ events: newEvents, todaysEvents: todaysEvents });
    }).catch(function (err) {
      _this.setState({ loadErr: err });
    });
  },
  postEvent: function postEvent(event) {
    _axios2.default.post('/events', event).then(function (res) {
      console.log('Event Posted!');
    }).catch(function (err) {
      console.log(err);
    });
  },
  getFollowing: function getFollowing() {
    var _this2 = this;

    _axios2.default.get('/followingList').then(function (res) {

      _this2.setState({ following: res.data });
    }).catch(function (err) {
      console.log(err);
    });
  },
  deleteFollowing: function deleteFollowing(followingId) {
    var _this3 = this;

    _axios2.default.delete('/relationships', { data: { followingId: followingId } }).then(function (res) {
      _this3.getFollowing();
    }).catch(function (err) {
      console.log(err);
    });
  },
  getUserName: function getUserName(name) {
    var _this4 = this;

    var username = { username: name };
    _axios2.default.post('/username', username).then(function (res) {

      _this4.setState({ userSearch: res.data });
    }).catch(function (err) {
      console.log(err);
    });
  },
  followUser: function followUser(follow) {
    var _this5 = this;

    _axios2.default.post('/relationships', { data: { follow: follow } }).then(function (res) {

      _this5.getFollowing();
      _this5.setState({ userSearch: [], open: true });
    }).catch(function (err) {
      console.log(err);
    });
  },
  getAttendeesGoing: function getAttendeesGoing(eventId) {
    return _axios2.default.post('/attendeesGoing', eventId).then(function (res) {
      return res.data;
    }).catch(function (err) {
      console.log(err);
    });
  },
  getAttendeesMaybe: function getAttendeesMaybe(eventId) {
    return _axios2.default.post('/attendeesMaybe', eventId).then(function (res) {

      return res.data;
    }).catch(function (err) {
      console.log(err);
    });
  },
  getGoing: function getGoing() {
    var _this6 = this;

    _axios2.default.get('/going').then(function (res) {
      var goingEvents = res.data;

      Promise.all(goingEvents.map(function (event) {

        return Promise.all([_this6.getAttendeesGoing({ eventId: event.eventId }), _this6.getAttendeesMaybe({ eventId: event.eventId })]).then(function (arr) {
          return Object.assign({}, event, { attendeesGoing: arr[0], attendeesMaybe: arr[1] });
        }).catch(function (err) {
          console.log(err);
        });
      })).then(function (events) {
        var pastEvents = [];
        var comingEvents = [];
        var date = (0, _moment2.default)().format();

        for (var i = 0; i < events.length; i++) {
          var stringDate = date.toString();
          var exactDate = stringDate.substring(0, stringDate.indexOf('T'));

          var stringEventDate = events[i].eventDate.toString();
          var exactEventDate = stringEventDate.substring(0, stringEventDate.indexOf('T'));

          var event = Object.assign({}, events[i], { exactDate: exactEventDate });

          if (event.exactEventDate < exactDate) {

            pastEvents.push(event);
          } else {

            comingEvents.push(event);
          }
        }

        _this6.setState({ going: comingEvents, attended: pastEvents });
      }).catch(function (err) {
        console.log(err);
      });
    }).catch(function (err) {
      console.log(err);
    });
  },
  getMaybe: function getMaybe() {
    var _this7 = this;

    _axios2.default.get('/maybe').then(function (res) {
      var eventArr = res.data;

      Promise.all(eventArr.map(function (event) {

        return Promise.all([_this7.getAttendeesGoing({ eventId: event.eventId }), _this7.getAttendeesMaybe({ eventId: event.eventId })]).then(function (arr) {
          return Object.assign({}, event, { attendeesGoing: arr[0], attendeesMaybe: arr[1] });
        }).catch(function (err) {
          console.log(err);
        });
      })).then(function (maybeEvents) {
        var events = [];
        for (var i = 0; i < maybeEvents.length; i++) {
          var stringEventDate = maybeEvents[i].eventDate.toString();
          var exactEventDate = stringEventDate.substring(0, stringEventDate.indexOf('T'));

          var event = Object.assign({}, maybeEvents[i], { exactDate: exactEventDate });

          events.push(event);
        }

        _this7.setState({ maybe: events });
      }).catch(function (err) {
        console.log(err);
      });
    }).catch(function (err) {
      console.log(err);
    });
  },
  render: function render() {
    var _this8 = this;

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_reactRouter.Match, { pattern: '/Calendar', exactly: true, render: function render() {
          return _this8.props.isLoggedIn ? _react2.default.createElement(_Redirect2.default, { to: '/' }) : _react2.default.createElement(_Calendar2.default, {
            events: _this8.state.events,
            postEvent: _this8.postEvent,
            todaysEvents: _this8.state.todaysEvents
          });
        }
      }),
      _react2.default.createElement(_reactRouter.Match, { pattern: '/', exactly: true, render: function render() {
          return _react2.default.createElement(_Auth2.default, {
            signup: _this8.userSignup
          });
        }
      }),
      _react2.default.createElement(_reactRouter.Match, { pattern: '/UserDash', exactly: true, render: function render() {
          return _this8.props.isLoggedIn ? _react2.default.createElement(_Redirect2.default, { to: '/' }) : _react2.default.createElement(_UserDash2.default, {
            going: _this8.state.going,
            maybe: _this8.state.maybe,
            attended: _this8.state.attended,
            getGoing: _this8.getGoing,
            getMaybe: _this8.getMaybe,
            getUserName: _this8.getUserName,
            following: _this8.state.following,
            getFollowing: _this8.getFollowing,
            deleteFollowing: _this8.deleteFollowing,
            userSearch: _this8.state.userSearch,
            followUser: _this8.followUser
          });
        }
      })
    );
  }
});

exports.default = Main;
});

require.register("components/Month.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Days = require('./Days');

var _Days2 = _interopRequireDefault(_Days);

var _Shows = require('./Shows');

var _Shows2 = _interopRequireDefault(_Shows);

var _reactBigCalendar = require('react-big-calendar');

var _reactBigCalendar2 = _interopRequireDefault(_reactBigCalendar);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactBigCalendar2.default.momentLocalizer(_moment2.default);
// import FlatButton from 'material-ui/FlatButton';


var Month = _react2.default.createClass({
  displayName: 'Month',
  getInitialState: function getInitialState() {
    return {
      open: false,
      date: null,
      currentDayEvents: []
    };
  },
  filterEvents: function filterEvents() {
    var propEvents = this.props.events;
    var dayEventsArr = [];
    for (var i = 0; i < propEvents.length; i++) {
      if (propEvents[i].date === this.state.date) {
        dayEventsArr.push(propEvents[i]);
      }
    }

    this.setState({ currentDayEvents: dayEventsArr });
  },
  handleOpen: function handleOpen() {
    this.setState({ open: true });
  },
  handleClose: function handleClose() {
    this.setState({ open: false });
  },
  handleSelectSlot: function handleSelectSlot(obj) {
    var newDate = (0, _moment2.default)(obj.start).format();
    var stringDate = newDate.toString();
    var exactDate = stringDate.substring(0, stringDate.indexOf('T'));

    this.setState({ date: exactDate });
    this.handleOpen();
    this.filterEvents();
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { id: 'month' },
      _react2.default.createElement(_reactBigCalendar2.default, {
        defaultDate: new Date(),
        defaultView: 'month',
        endAccessor: 'endDate',
        events: this.props.events,
        onSelectSlot: this.handleSelectSlot,
        selectable: true,
        startAccessor: 'startDate',
        step: 15,
        timeslots: 8,
        views: ['month']
      }),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _Dialog2.default,
          {
            title: 'Todays Events',
            modal: false,
            open: this.state.open,
            autoScrollBodyContent: true,
            onRequestClose: this.handleClose
          },
          _react2.default.createElement(_Days2.default, {
            postEvent: this.props.postEvent,
            todaysEvents: this.state.currentDayEvents })
        )
      )
    );
  }
});

exports.default = Month;
});

require.register("components/Navbar.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouter = require('react-router');

var _Auth = require('./Auth');

var _Auth2 = _interopRequireDefault(_Auth);

var _Main = require('./Main');

var _Main2 = _interopRequireDefault(_Main);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AppBar = require('material-ui/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _IconMenu = require('material-ui/IconMenu');

var _IconMenu2 = _interopRequireDefault(_IconMenu);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _moreVert = require('material-ui/svg-icons/navigation/more-vert');

var _moreVert2 = _interopRequireDefault(_moreVert);

var _close = require('material-ui/svg-icons/navigation/close');

var _close2 = _interopRequireDefault(_close);

var _colors = require('material-ui/styles/colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Router

// UI


var Navbar = _react2.default.createClass({
  displayName: 'Navbar',
  getInitialState: function getInitialState() {
    return {
      logged: true
    };
  },
  handleClick: function handleClick() {
    this.props.signOut();
  },
  render: function render() {
    var _this2 = this;

    var styles = {
      navbar: {
        backgroundColor: _colors.grey900
      }
    };

    var Login = function (_Component) {
      _inherits(Login, _Component);

      function Login() {
        _classCallCheck(this, Login);

        return _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).apply(this, arguments));
      }

      _createClass(Login, [{
        key: 'render',
        value: function render() {
          return _react2.default.createElement(_FlatButton2.default, _extends({}, this.props, { label: 'Login' }));
        }
      }]);

      return Login;
    }(_react.Component);

    Login.muiName = 'FlatButton';


    var Logged = function Logged(props) {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _IconMenu2.default,
          _extends({}, props, {
            iconButtonElement: _react2.default.createElement(
              _IconButton2.default,
              null,
              _react2.default.createElement(_moreVert2.default, null)
            ),
            targetOrigin: { horizontal: 'right', vertical: 'top' },
            anchorOrigin: { horizontal: 'right', vertical: 'top' }
          }),
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/' },
            _react2.default.createElement(_MenuItem2.default, { primaryText: 'Login' })
          ),
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/Calendar' },
            _react2.default.createElement(_MenuItem2.default, { primaryText: 'Calendar' })
          ),
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/UserDash' },
            _react2.default.createElement(_MenuItem2.default, { primaryText: 'Dashboard' })
          ),
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/' },
            _react2.default.createElement(_MenuItem2.default, { primaryText: 'Sign Out', onClick: _this2.handleClick })
          )
        )
      );
    };

    Logged.muiName = 'IconMenu';

    return _react2.default.createElement(
      'div',
      { id: 'navbar' },
      _react2.default.createElement(_AppBar2.default, {
        style: styles.navbar,
        title: 'Live! Music Calendar',
        iconElementRight: this.state.logged ? _react2.default.createElement(Logged, null) : _react2.default.createElement(Login, null)
      })
    );
  }
});

exports.default = Navbar;
});

require.register("components/Show.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Card = require('material-ui/Card');

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Show = _react2.default.createClass({
  displayName: 'Show',
  handleClickGoing: function handleClickGoing() {
    var event = this.props.event;
    var goingEventData = {
      going: true,
      maybe: false,
      artistName: event.artist,
      venueName: event.venue,
      eventDate: event.start,
      eventId: event.id
    };

    return this.props.postEvent(goingEventData);
  },
  handleClickMaybe: function handleClickMaybe() {
    var event = this.props.event;
    var maybeEventData = {
      going: false,
      maybe: true,
      artistName: event.artist,
      venueName: event.venue,
      eventDate: event.start,
      eventId: event.id
    };

    return this.props.postEvent(maybeEventData);
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { id: 'show' },
      _react2.default.createElement(
        _Card.Card,
        null,
        _react2.default.createElement(_Card.CardHeader, {
          title: this.props.event.artist,
          subtitle: this.props.event.venue,
          actAsExpander: true,
          showExpandableButton: true
        }),
        _react2.default.createElement(
          _Card.CardText,
          { expandable: true },
          _react2.default.createElement(
            'div',
            { className: 'card-content black-text' },
            _react2.default.createElement(
              'div',
              { className: 'card-action' },
              _react2.default.createElement(_FlatButton2.default, {
                label: 'Tickets',
                href: this.props.event.ticketUrl
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'date-time-title' },
              this.props.event.date
            )
          )
        ),
        _react2.default.createElement(
          _Card.CardActions,
          null,
          _react2.default.createElement(_FlatButton2.default, {
            className: 'go-button',
            label: 'Going',
            name: 'Going',
            value: this.props.event,
            onClick: this.handleClickGoing
          }),
          _react2.default.createElement(_FlatButton2.default, {
            className: 'maybe-button',
            label: 'Maybe',
            name: 'Maybe',
            value: this.props.event,
            onClick: this.handleClickMaybe
          })
        )
      )
    );
  }
});

exports.default = Show;


{/* <div className="card white">
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
   <div className="card-action">
     <button className="ticket-link flat-btn">Tickets</button>
   </div>
    <div>
    </div>
  </div> */}
});

;require.register("components/Showfeed.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Shows = require('./Shows');

var _Shows2 = _interopRequireDefault(_Shows);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  text: {
    textAlign: 'left'
  }
};

var Showfeed = _react2.default.createClass({
  displayName: 'Showfeed',
  render: function render() {
    return _react2.default.createElement(
      'div',
      { id: 'Showfeed' },
      _react2.default.createElement(_Shows2.default, {
        postEvent: this.props.postEvent,
        todaysEvents: this.props.todaysEvents,
        styles: styles.text
      })
    );
  }
});

exports.default = Showfeed;
});

require.register("components/Shows.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Show = require('./Show');

var _Show2 = _interopRequireDefault(_Show);

var _Card = require('material-ui/Card');

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Shows = _react2.default.createClass({
  displayName: 'Shows',
  render: function render() {
    var _this = this;

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _Card.Card,
        null,
        _react2.default.createElement(_Card.CardHeader, {
          title: 'Today\'s Shows',
          actAsExpander: true,
          showExpandableButton: true
        }),
        _react2.default.createElement(
          _Card.CardText,
          { expandable: true },
          this.props.todaysEvents.map(function (event, index) {
            return _react2.default.createElement(
              'div',
              { id: 'shows', key: index },
              _react2.default.createElement(_Show2.default, {
                postEvent: _this.props.postEvent,
                event: event

              })
            );
          })
        )
      )
    );
  }
});

exports.default = Shows;
});

require.register("components/Signup.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _colors = require('material-ui/styles/colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = {
  signup: {},
  input: {
    padding: 10,
    display: 'block',
    margin: 'auto'
  },
  submit: {}
};

var Signup = _react2.default.createClass({
  displayName: 'Signup',
  getInitialState: function getInitialState() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: ''
    };
  },
  handleSubmit: function handleSubmit(event) {
    event.preventDefault();
    return this.props.signup(this.state);
  },
  handleChange: function handleChange(event) {
    var nextState = _defineProperty({}, event.target.name, event.target.value);

    this.setState(nextState);
  },
  handleClick: function handleClick(event) {
    event.preventDefault();

    return this.props.loginRender();
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { id: 'sign-up', className: 'offset-by-four columns' },
      _react2.default.createElement(
        'div',
        { className: 'four columns sign', style: styles.signup },
        _react2.default.createElement(
          'form',
          { onSubmit: this.handleSubmit },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              {
                className: 'twelve columns sign',
                style: styles.input },
              _react2.default.createElement(
                'label',
                { className: 'six columns offset-by-three' },
                'First Name'
              ),
              _react2.default.createElement('input', {
                className: 'input-field six columns offset-by-three',
                id: 'first_name',
                type: 'text',
                onChange: this.handleChange,
                value: this.state.firstName,
                name: 'firstName'
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'twelve columns sign' },
              _react2.default.createElement(
                'label',
                { className: 'six columns offset-by-three' },
                'Last Name'
              ),
              _react2.default.createElement('input', {
                className: 'input-field six columns offset-by-three',
                id: 'last_name',
                type: 'text',
                onChange: this.handleChange,
                value: this.state.lastName,
                name: 'lastName'
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'twelve columns sign' },
              _react2.default.createElement(
                'label',
                { className: 'six columns offset-by-three' },
                'Username'
              ),
              _react2.default.createElement('input', {
                className: 'input-field six columns offset-by-three',
                id: 'username',
                type: 'text',
                onChange: this.handleChange,
                value: this.state.username,
                name: 'username'
              })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'twelve columns sign' },
              _react2.default.createElement(
                'label',
                { className: 'six columns offset-by-three' },
                'Email'
              ),
              _react2.default.createElement('input', {
                className: 'input-field six columns offset-by-three',
                id: 'email',
                type: 'email',
                onChange: this.handleChange,
                value: this.state.email,
                name: 'email'
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'twelve columns sign' },
              _react2.default.createElement(
                'label',
                { className: 'six columns offset-by-three' },
                'Password'
              ),
              _react2.default.createElement('input', {
                className: 'input-field six columns offset-by-three',
                id: 'password',
                type: 'password',
                onChange: this.handleChange,
                value: this.state.password,
                name: 'password'
              })
            ),
            _react2.default.createElement('div', { className: 'six columns offset-by-three' }),
            _react2.default.createElement(
              'button',
              {
                style: styles.submit,
                className: 'button six columns offset-by-three',
                type: 'submit',
                name: 'action' },
              'Submit'
            ),
            _react2.default.createElement(
              'button',
              {
                style: styles.submit,
                className: 'button six columns offset-by-three backto',
                type: 'submit',
                onClick: this.handleClick,
                name: 'action' },
              'Back to Login'
            )
          )
        )
      )
    );
  }
});

exports.default = Signup;
});

require.register("components/User.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _List = require('material-ui/List/List');

var _List2 = _interopRequireDefault(_List);

var _ListItem = require('material-ui/List/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _Chip = require('material-ui/Chip');

var _Chip2 = _interopRequireDefault(_Chip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  chip: {
    margin: 0,
    padding: 5,
    width: 175
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  }
};

var User = _react2.default.createClass({
  displayName: 'User',
  handleRequestDelete: function handleRequestDelete() {
    var followingId = this.props.user.id;

    this.props.deleteFollowing(followingId);
  },
  handleTouchTap: function handleTouchTap() {
    alert('Do you mind?');
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { id: 'user' },
      _react2.default.createElement(
        'div',
        { style: styles.wrapper },
        _react2.default.createElement(
          _List2.default,
          null,
          _react2.default.createElement(
            _ListItem2.default,
            null,
            _react2.default.createElement(
              _Chip2.default,
              {
                onRequestDelete: this.handleRequestDelete,
                onTouchTap: this.handleTouchTap,
                style: styles.chip
              },
              this.props.user.username
            )
          )
        )
      )
    );
  }
});

exports.default = User;
});

require.register("components/UserDash.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Users = require('./Users');

var _Users2 = _interopRequireDefault(_Users);

var _Drawer = require('material-ui/Drawer');

var _Drawer2 = _interopRequireDefault(_Drawer);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _Snackbar = require('material-ui/Snackbar');

var _Snackbar2 = _interopRequireDefault(_Snackbar);

var _Card = require('material-ui/Card');

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _Badge = require('material-ui/Badge');

var _Badge2 = _interopRequireDefault(_Badge);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _notifications = require('material-ui/svg-icons/social/notifications');

var _notifications2 = _interopRequireDefault(_notifications);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserDash = _react2.default.createClass({
  displayName: 'UserDash',
  getInitialState: function getInitialState() {
    return {
      open: false
    };
  },
  componentDidMount: function componentDidMount() {
    this.props.getGoing();
    this.props.getMaybe();
  },
  handleToggle: function handleToggle() {
    this.setState({ open: !this.state.open });
  },
  handleClose: function handleClose() {
    this.setState({ open: false });
  },
  render: function render() {
    var _this = this;

    return _react2.default.createElement(
      'div',
      { id: 'userDash' },
      _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_RaisedButton2.default, {
            label: 'Users Dock',
            onTouchTap: this.handleToggle,
            onClick: this.props.getFollowing
          }),
          _react2.default.createElement(
            _Drawer2.default,
            {
              docked: false,
              width: 400,
              open: this.state.open,
              onRequestChange: function onRequestChange(open) {
                return _this.setState({ open: open });
              }
            },
            _react2.default.createElement(_Users2.default, {
              following: this.props.following,
              deleteFollowing: this.props.deleteFollowing,
              getUserName: this.props.getUserName,
              followUser: this.props.followUser,
              userSearch: this.props.userSearch
            })
          )
        ),
        _react2.default.createElement(
          'div',
          { id: 'user-main-dash' },
          _react2.default.createElement(
            'div',
            { className: 'row ' },
            _react2.default.createElement(
              'div',
              { className: 'six columns' },
              _react2.default.createElement(
                _Card.Card,
                null,
                _react2.default.createElement(_Card.CardHeader, {
                  id: 'card-head-attend',
                  title: 'I\'m Going!',
                  subtitle: 'Confirmed Going'
                }),
                this.props.going.map(function (event, index) {
                  return _react2.default.createElement(
                    _Card.CardText,
                    {
                      id: 'card-text-attend',
                      event: event,
                      key: index
                    },
                    _react2.default.createElement(
                      'span',
                      null,
                      event.artistName
                    ),
                    _react2.default.createElement(
                      'p',
                      null,
                      event.venueName
                    ),
                    _react2.default.createElement(
                      'p',
                      null,
                      'Date: ',
                      event.exactDate
                    ),
                    _react2.default.createElement(
                      _Card.CardActions,
                      { id: 'card-action-attend' },
                      _react2.default.createElement(
                        'div',
                        { className: 'ud-followers-badge' },
                        _react2.default.createElement(_FlatButton2.default, { disabled: true, label: 'Going' }),
                        _react2.default.createElement(
                          _Badge2.default,
                          {
                            id: 'ud-going-follow-badge-go',
                            badgeContent: event.attendeesGoing.length,
                            primary: true,
                            className: 'followers-going'
                          },
                          _react2.default.createElement(_notifications2.default, null)
                        )
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'ud-followers-badge' },
                        _react2.default.createElement(_FlatButton2.default, {
                          disabled: true,
                          label: 'Maybes'
                        }),
                        _react2.default.createElement(
                          _Badge2.default,
                          {
                            badgeContent: event.attendeesMaybe.length,
                            id: 'ud-going-follow-badge-maybe',
                            secondary: true,
                            className: 'followers-maybes'
                          },
                          _react2.default.createElement(_notifications2.default, null)
                        )
                      )
                    )
                  );
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'six columns' },
              _react2.default.createElement(
                _Card.Card,
                null,
                _react2.default.createElement(_Card.CardHeader, {
                  id: 'card-head-maybe',
                  title: 'Maybe',
                  subtitle: 'Might Go'
                }),
                this.props.maybe.map(function (event, index) {
                  return _react2.default.createElement(
                    _Card.CardText,
                    {
                      id: 'card-text-maybe',
                      event: event,
                      key: index
                    },
                    _react2.default.createElement(
                      'span',
                      null,
                      event.artistName
                    ),
                    _react2.default.createElement(
                      'p',
                      null,
                      event.venueName
                    ),
                    _react2.default.createElement(
                      'p',
                      null,
                      'Date: ',
                      event.exactDate
                    ),
                    _react2.default.createElement(
                      _Card.CardActions,
                      { id: 'card-action-maybe' },
                      _react2.default.createElement(
                        'div',
                        { className: 'ud-followers-badge' },
                        _react2.default.createElement(_FlatButton2.default, { disabled: true, label: 'Going' }),
                        _react2.default.createElement(
                          _Badge2.default,
                          {
                            id: 'ud-maybes-follow-badge-go',
                            badgeContent: event.attendeesGoing.length,
                            primary: true
                          },
                          _react2.default.createElement(_notifications2.default, null)
                        )
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'ud-followers-badge' },
                        _react2.default.createElement(_FlatButton2.default, { disabled: true, label: 'Maybes' }),
                        _react2.default.createElement(
                          _Badge2.default,
                          {
                            id: 'ud-maybes-follow-badge-maybe',
                            badgeContent: event.attendeesMaybe.length,
                            secondary: true
                          },
                          _react2.default.createElement(_notifications2.default, null)
                        )
                      )
                    )
                  );
                })
              ),
              _react2.default.createElement('div', null)
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'six columns offset-by-six' },
                _react2.default.createElement(
                  _Card.Card,
                  null,
                  _react2.default.createElement(_Card.CardHeader, {
                    title: 'Attended',
                    actAsExpander: true,
                    showExpandableButton: true
                  }),
                  this.props.attended.map(function (event, index) {
                    return _react2.default.createElement(
                      _Card.CardText,
                      {
                        event: event,
                        key: index
                      },
                      _react2.default.createElement(
                        'p',
                        null,
                        event.artistName
                      ),
                      _react2.default.createElement(
                        'p',
                        null,
                        event.venueName
                      ),
                      _react2.default.createElement(
                        'p',
                        null,
                        event.exactDate
                      )
                    );
                  })
                )
              )
            )
          )
        )
      )
    );
  }
});
// Badge


// Card

// SideBar
exports.default = UserDash;
});

require.register("components/Users.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _User = require('./User');

var _User2 = _interopRequireDefault(_User);

var _List = require('material-ui/List');

var _Divider = require('material-ui/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _Chip = require('material-ui/Chip');

var _Chip2 = _interopRequireDefault(_Chip);

var _colors = require('material-ui/styles/colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = {
  button: {
    backgroundColor: _colors.grey100,
    color: _colors.black400
  },
  chip: {
    margin: 0,
    padding: 5,
    width: 175
  },
  searchbox: {
    marginLeft: 20,
    marginBottom: 10
  },
  floatingLabelStyle: {
    fontSize: 16,
    color: _colors.blue500
  },
  floatingLabelFocusStyle: {
    color: _colors.grey100
  }
};

var Users = _react2.default.createClass({
  displayName: 'Users',
  getInitialState: function getInitialState() {
    return {
      searchText: ''
    };
  },
  handleClick: function handleClick(event) {
    event.preventDefault();

    return this.props.getUserName(this.state);
  },
  handleChange: function handleChange(event) {
    var nextState = _defineProperty({}, event.target.name, event.target.value);

    this.setState(nextState);
  },
  handleTouchTap: function handleTouchTap() {
    var follow = this.props.userSearch.userId;

    return this.props.followUser(follow);
  },
  render: function render() {
    var _this = this;

    return _react2.default.createElement(
      'div',
      { id: 'users', style: styles.container },
      _react2.default.createElement(
        _List.List,
        null,
        _react2.default.createElement(
          'div',
          { style: styles.searchbox },
          _react2.default.createElement(_List.ListItem, { primaryText: 'Users' }),
          _react2.default.createElement(_TextField2.default, {
            name: 'searchText',
            value: this.state.searchText,
            onChange: this.handleChange,
            floatingLabelText: 'Search by Username',
            floatingLabelStyle: styles.floatingLabelStyle,
            floatingLabelFocusStyle: styles.floatingLabelFocusStyle
          }),
          _react2.default.createElement(_FlatButton2.default, {
            label: 'submit',
            type: 'submit',
            style: styles.button,
            onClick: this.handleClick
          }),
          _react2.default.createElement(
            _Chip2.default,
            {
              style: styles.chip,
              onTouchTap: this.handleTouchTap
            },
            this.props.userSearch.username
          )
        )
      ),
      _react2.default.createElement(_Divider2.default, null),
      _react2.default.createElement(
        _List.List,
        null,
        _react2.default.createElement(_List.ListItem, { primaryText: 'Following' }),
        this.props.following.map(function (user, index) {
          return _react2.default.createElement(_User2.default, {
            user: user,
            key: index,
            deleteFollowing: _this.props.deleteFollowing
          });
        })
      )
    );
  }
});

exports.default = Users;
});

require.register("index.jsx", function(exports, require, module) {
'use strict';

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(_App2.default, null), document.getElementById('app'));
});

require.alias("buffer/index.js", "buffer");
require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map