'use strict';

// Set default node environment to development
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';


if (env === 'development' || env === 'test') {
  process.env.DEBUG = 'app:*,api:*,config:*,webpack:*';

    // Register the Babel require hook
  require('babel-register');
} else {
  process.env.DEBUG = '';
}

// Export the application
exports = module.exports = require('./app');
