var Promise     = require('bluebird');
var url         = require('url')
var validator   = require('validator')
var debug       = require('debug')('controller:parseLatestRequest');

/* -----------------------------------|
 *|  Synchronous operation 
 */

module.exports = Promise.method(function parseLatestRequest(req) {
  // Parse URL Query String
  let query = url.parse(req.url, true).query,
    num = query.number || query.num || query.n || '10';
  if (! validator.isInt(num.toString(), { min: 1, max: 50 }) ) {
    throw('Bad Request'); // Bad Request
  };
  return Promise.resolve(num);
});