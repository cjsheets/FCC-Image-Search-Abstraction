/* -----------------------------------|
 *|  Model: Latest Search Results
 */

var mongoose    = require('mongoose');

module.exports  = mongoose.Schema({

  term  : { type: String, required: true },
  date  : { type: Date, required: true }

});
