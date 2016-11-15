'use strict';
/* -----------------------------------|
 *|  Define API Routes
 */

var express = require('express');
var controller = require('./latest.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);

module.exports = router;
