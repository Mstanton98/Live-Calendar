'use strict';

module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'app.js': /^app\//,
        'vendor.js': /^node_modules\//
      }
    },

    stylesheets: {
      joinTo: {
        'app.css': /^app\//,
        'vendor.css': /^node_modules\//
      }
    }
  },

  npm: {
    styles: {
    }
  },

  plugins: {
    babel: {
      presets: ['es2015', 'react']
    }
  },

  server: {
    command: 'nodemon --ignore app --ignore public server.js'
  }
};
