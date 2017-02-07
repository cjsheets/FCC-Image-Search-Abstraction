var Promise     = require('bluebird');
var url         = require('url')
var validator   = require('validator')
var debug       = require('debug')('controller:parseApiResponse');

/* -----------------------------------|
 *|  Synchronous operation 
 */

module.exports = Promise.method(function parseApiResponse(response) {
  let results = [];

  for(let item of response.items){
    var image = {};
    try {
      image.url = item.pagemap.cse_image[0].src;
    } catch (e) { image.url = ''; }
    try {
      image.thumbnail = item.pagemap.cse_thumbnail[0].src;
    } catch (e) { image.thumbnail = ''; }
    image.context = item.link || item.formattedUrl || img;
    image.snippet = item.snippet || item.title || item.htmlSnippet;
    results.push(image);
  }

  return Promise.resolve(results);
});