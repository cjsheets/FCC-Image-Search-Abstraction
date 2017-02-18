'use strict';
/*eslint-env node*/
/* -----------------------------------|
 *|  Router  ::  Root
 */
var express     = require('express');
var path        = require('path');
var debug       = require('debug')('router:root');
var router      = express.Router();


/**
 * "use" should be before any other route definitions
 */
// Import all other route modules
router.use('/api', require('./api'));

// Landing page
router.get('/', function(req, res) {
  debug('Route /as accessed. Serving Angular site');
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

/**
 * Anything else under '/', facilitates Angular HTML 5 routing. Must
 * declare below all other routes to avoid catching their requests
 */
router.get('*', function(req, res) {
  debug('Catch-All route accessed. Serving index');
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
  //res.render('index');
});

debug('Routes initialized successfully');
module.exports = router;
