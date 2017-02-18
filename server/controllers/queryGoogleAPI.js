var requestp      = require('request-promise');
var env           = require('../config/environment');
var querystring   = require('querystring');
//var sampleData  = require('../../api-response.json')
var debug         = require('debug')('controller:queryGoogleAPI');

/* -----------------------------------|
 *|  Using Rails-like standard naming convention for endpoints.
 *|  GET     /api/searchs    ->  index
 */

module.exports = function(s) {
  let cx          = env.api.cx;
  let key         = env.api.key;
  let url         = env.api.url;
  let queryString = querystring.stringify({
    q        : s.term,
    cx,
    count    : s.count,
    start    : s.offset,
    fileType : 'jpg',
    key
  });
  debug(`Query Google: ${url}?${queryString}`);
  //Only 100 free queries / day, this uses sample data
  // let sample = JSON.stringify(sampleData);
  // cb('', sample, sample);
  return requestp(`${url}?${queryString}`);
};
