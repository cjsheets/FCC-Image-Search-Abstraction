/* -----------------------------------|
 *|  Core Modules
 */
var express         = require('express');
var validator       = require('express-validator');
var path            = require('path');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var morgan          = require('morgan');
var Raven           = require('raven');
var debug           = require('debug')('express:main');
var env             = require('./environment');

/* -----------------------------------|
 *|  Configuration
 */
var app = express();

// Setup Sentry.io logging
let er = env.raven;
Raven.config(`https://${er.key}:${er.secret}@\
  ${er.host}/${er.app_id}`).install();

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
require('./mongoose');


/* -----------------------------------|
 *|  Routes
 */
var routes          = require('../routes');
app.use('/', routes);

// Launch the express server
app.listen(env.node.port); // listening with http instead of express
debug(' 🌎  Express server listening on %d, in %s mode  🌎', env.node.port, env.node.env);

module.exports = app;
