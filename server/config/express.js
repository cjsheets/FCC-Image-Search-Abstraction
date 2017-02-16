/* -----------------------------------|
 *|  Core Modules
 */
var express         = require('express');
var session         = require('express-session');
var validator       = require('express-validator');
var path            = require('path');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var morgan          = require('morgan');
var flash           = require('connect-flash');
var mongoose        = require('mongoose');
var Raven           = require('raven');
var debug           = require('debug')('express:main');
var env             = require('./environment');

/* -----------------------------------|
 *|  Configuration
 */
var app             = express();
var port            = process.env.PORT || 3000;

// Setup sentry.io logging
let er = env.raven;
Raven.config('https://' + er.key + ':' + er.secret + '@' + 
  er.host + '/' + er.app_id).install();

// Core express setup
debug('Setup express server, initialize middleware');
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(validator()); // Must be immediately after bodyParser middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(validator());

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs'); // set up ejs for templating

app.use(express.static(path.join(__dirname, '../../dist')));

/* -----------------------------------|
 *|  MongoDB - Mongoose
 */
mongoose.connect(env.mongo.uri, env.mongo.options);
mongoose.connection.on('error', function(err) {
  debug(`MongoDB connection error: ${err}`);
  // debug(`URI: ${env.mongo.uri}`);
  // debug(`Options: ${env.mongo.options}`);
  process.exit(-1); // eslint-disable-line no-process-exit
});

/* -----------------------------------|
 *|  Routes
 */
var routes          = require('../routes');
app.use('/', routes);

// Launch the express server
app.listen(port); // listening with http instead of express
debug(' 🌎  Express server listening on %d, in %s mode  🌎', port, process.env.NODE_ENV);

module.exports = app;
