#!/usr/bin/env node

/* -----------------------------------|
 *|  Initialize Environment
 */
var env         = require('./config/environment');

if(env.node.env === 'development' || env.node.env === 'test') {
  /* eslint no-process-env: 0 */
  process.env.DEBUG = 'app:*,api:*,passport:*,express:main,router:*';
}

/**
 * Load App Modules
 */
exports = module.exports = require('./config/express');
