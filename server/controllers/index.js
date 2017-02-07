var addToLatest             = require('./addToLatest');
var getLatest               = require('./getLatest');
var parseApiResponse        = require('./parseApiResponse');
var parseLatestRequest      = require('./parseLatestRequest');
var parseSearchRequest      = require('./parseSearchRequest');
var queryGoogleAPI          = require('./queryGoogleAPI');

module.exports = {
  addToLatest           : addToLatest,
  getLatest             : getLatest,
  parseApiResponse      : parseApiResponse,
  parseLatestRequest    : parseLatestRequest,
  parseSearchRequest    : parseSearchRequest,
  queryGoogleAPI        : queryGoogleAPI
}