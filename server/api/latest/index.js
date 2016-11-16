'use strict';
/* -----------------------------------|
 *|  Define API Routes
 *|  Expects: /api/latest/[numberToReturn]
 */

var express = require('express');
var controller = require('./latest.controller');
const debug = require('debug')('api:latest');

var router = express.Router();

router.get('*', controller.index);
router.post('*', controller.create);
debug('Initialized /api/latest...');

module.exports = router;
