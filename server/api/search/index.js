'use strict';
/* -----------------------------------|
 *|  Define API Routes
 */

var express = require('express');
var controller = require('./search.controller');
const debug = require('debug')('api:search');

var router = express.Router();

router.get('*', controller.index);
debug('Initialized /api/search...');

module.exports = router;
