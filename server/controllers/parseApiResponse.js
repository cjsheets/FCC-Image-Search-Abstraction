var Promise     = require('bluebird');
var url         = require('url')
var validator   = require('validator')
var debug       = require('debug')('controller:parseApiResponse');

/* -----------------------------------|
 *|  Synchronous operation 
 */

module.exports = Promise.method(function parseApiResponse(err, apiResposne, body) {
  let results = JSON.parse(body),
    data = filterResponse(results.items);
  // Record search in MongoDB
  return Latest.create({
    term: results.queries.request[0].searchTerms,
    date : new Date()
    })
    .then(res.end(JSON.stringify(data))
      /*respondWithResult(res, 201) -mongoResponse-*/ )
    .catch(handleError(res, 'DB Storage Error'));
});