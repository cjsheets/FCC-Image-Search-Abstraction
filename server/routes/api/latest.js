/* -----------------------------------|
 *|  Router  ::  API / Latest
 *|
 *|  Handles any routes delivered to /api/latest
 */
var express     = require('express')
var debug       = require('debug')('router:api:latest');
var router      = express.Router()


var parseLatestRequest    = require('../../controllers').parseLatestRequest;
var getLatest             = require('../../controllers').getLatest;

router.get('*', function(req, res) {
  // Parse the URL passed in by the client
  debug('Caught a latest request');
  parseLatestRequest(req).then(function(num){
    getLatest(num).then(function(results){
      res.end(JSON.stringify(results));
    }).catch(function(err) {
      res.json(err);
    });
  }).catch(function(err) {
    res.json(err);
  });
});

module.exports = router;