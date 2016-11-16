/* -----------------------------------|
 *|  Define API Routes
 */
'use strict';

var express = require('express');
var controller = require('./image.controller');
const debug = require('debug')('api:image');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);
debug('Initialized /api/image...');

module.exports = router;
