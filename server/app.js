'use strict';
/* -----------------------------------|
 *|  Main Application Entry
 */

import express from 'express';
import mongoose from 'mongoose';
import config from './config/environment';
const debug = require('debug')('app:app');

// Setup server
var app = express();
require('./config/express').default(app);
require('./config/webpack').default(app);
require('./routes').default(app);

// Define server
function startServer() {
  app.listen(config.port, config.ip, function(err) {
    (err) ? log(err) : '';
    debug(' 🌎  Express server listening on %d, in %s mode  🌎', config.port, app.get('env'));
  });
}

// Start server
setImmediate(startServer);

// Expose app
exports = module.exports = app;
