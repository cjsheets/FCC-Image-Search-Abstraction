/* -----------------------------------|
 *|  Router  ::  API / Search
 *|
 *|  Handles any routes delivered to /api/search
 */
var express     = require('express')
var Promise     = require('bluebird');
var debug       = require('debug')('router:api:search');
var router      = express.Router();

// GET: Venues attended by the authenticated user
var parseQueryString    = require('../../controllers').parseQueryString;
var queryGoogleAPI      = require('../../controllers').queryGoogleAPI;
var parseApiResponse    = require('../../controllers').parseApiResponse;
router.get('*', function(req, res) {
  parseQueryString(req).then(function(search){
    queryGoogleAPI(search).then(function(err, apiResposne, body){
      if(err) throw err;
      debug('Query succeeded'); 
      parseApiResponse(err, apiResposne, body).then(function(){

      }).catch(function(err) {
        res.json(err);
      });
    }).catch(function(err) {
      res.json(err);
    });
  }).catch(function(err) {
    res.json(err);
  });
});

module.exports = router;