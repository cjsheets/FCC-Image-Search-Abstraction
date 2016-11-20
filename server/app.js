'use strict';
/* -----------------------------------|
 *|  Main Application Entry
 */

import express from 'express';
import mongoose from 'mongoose';
import config from './config/environment';
const debug = require('debug')('app:app');

// Connect to MongoDB
let mongoURI = process.env.MONGO_URI || config.mongo.uri;
mongoose.connect(mongoURI, config.mongo.options);
mongoose.connection.on('error', function(err) {
  debug(`MongoDB connection error: ${err}`);
  debug(`URI: ${config.mongo.uri}`);
  debug(`Options: ${config.mongo.options}`);
  console.log('DB Conn failed, exiting.')
  process.exit(-1); // eslint-disable-line no-process-exit
});

// Setup server
var app = express();
require('./config/express').default(app);
require('./config/webpack').default(app);

// Default Routes
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
