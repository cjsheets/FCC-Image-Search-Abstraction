var requestp      = require('request-promise')
var env           = require('../config/environment')
var querystring   = require('querystring')
var sampleData    = require('../../api-response.json')
var debug         = require('debug')('controller:queryGoogleAPI');

/* -----------------------------------|
 *|  Using Rails-like standard naming convention for endpoints.
 *|  GET     /api/searchs    ->  index
 */

module.exports = function(s) {
  let cx = process.env.CX || env.api.cx,
    key = process.env.KEY || env.api.key,
    url = process.env.API_URL || env.api.url,
    queryString = querystring.stringify({
      q: s.term,
      cx: cx,
      count: s.count,
      start: s.offset,
      fileType: 'jpg',
      key: key
    });
  debug('Query Google: ' + url + '?' + queryString);
  return requestp( url + '?' + queryString);
  //Only 100 free queries / day, this uses sample data
  // let sample = JSON.stringify(sampleData);
  // cb('', sample, sample);
}
