/* -----------------------------------|
 *|  Router  ::  API / Search
 *|
 *|  Handles any routes delivered to /api/search
 */
var express     = require('express')
var debug       = require('debug')('router:api:search');
var router      = express.Router();

// GET: Venues attended by the authenticated user
var parseSearchRequest  = require('../../controllers').parseSearchRequest;
var queryGoogleAPI      = require('../../controllers').queryGoogleAPI;
var parseApiResponse    = require('../../controllers').parseApiResponse;
var addToLatest         = require('../../controllers').addToLatest;

router.get('*', function(req, res) {
  // Parse the URL passed in by the client
  parseSearchRequest(req).then(function(search){
    debug('Query string parsed'); 
    queryGoogleAPI(search).then(function(body){
      debug('Query succeeded'); 
      let response = JSON.parse(body);
      // Add the users query to the MongoDB
      addToLatest(response).catch(function(err) {
        res.json(err);
      });
      // Reformat API response for return to client
      parseApiResponse(response).then(function(results){
        res.end(JSON.stringify(results));
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