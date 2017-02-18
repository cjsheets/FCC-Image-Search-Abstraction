/* -----------------------------------|
 *|  MongoDB schema and helper
 *|  functions
 */

var mongoose          = require('mongoose');
var latestSchema      = require('./latest');

/**
 * Build and export model array
 */
module.exports = {
  Latest : mongoose.model('fcc_image-seach-abstraction_latests', latestSchema),
};
