var Promise     = require('bluebird');
var url         = require('url')
var validator   = require('validator')
var debug       = require('debug')('controller:parseQueryString');

/* -----------------------------------|
 *|  Synchronous operation 
 */

module.exports = Promise.method(function parseQueryString(req) {
  // Parse URL Query String
  let query = url.parse(req.url, true).query,
    search = {
      term: query.term || query.t || query.q || '',
      count: query.count || query.c || '10',
      offset: query.offset || query.o || '1'
    }
  debug('Caught a search request: t=' + search.term + 
    ', c=' + search.count + ', o=' + search.offset);

  //Verify the necissary options were provided
  if (! search.term || 
    ! validator.isInt(search.count.toString(), { min: 1, max: 10 }) ||
    ! validator.isInt(search.offset.toString(), { min: 1, max: 99 }) ) {
    throw('Bad Request'); // Bad Request
  };
  return search;
});