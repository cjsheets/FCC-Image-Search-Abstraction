var Latest              = require('../models').Latest;
var mongoose            = require('mongoose');
    mongoose.Promise    = require('bluebird');
    mongoose.Promise    = global.Promise;
var debug               = require('debug')('controller:getLatest');

/* -----------------------------------|
 *|  Using Rails-like standard naming convention for endpoints.
 *|  GET     /api/searchs    ->  index
 */

module.exports = function(num) {
  return Latest.find()
    .sort({_id: -1})
    .limit(parseInt(num))
    .select('term date -_id')
    .exec();
}