/* -----------------------------------|
 *|  Router  ::  API
 *|
 *|  Handles any routes delivered to /api/...
 */
var express     = require('express')
var debug       = require('debug')('router:api');
var router      = express.Router()

// Import all other route modules
router.use('/search', require('./search'));
router.use('/latest', require('./latest'));

module.exports = router;