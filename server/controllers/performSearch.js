'use strict';
/* -----------------------------------|
 *|  Using Rails-like standard naming convention for endpoints.
 *|  GET     /api/searchs    ->  index
 */

import config from '../../config/environment';
import Latest from '../latest/latest.model';
import url from 'url';
import querystring from 'querystring';
import validator from 'validator';
import request from 'request';
const debug = require('debug')('api:search');
var sampleData = require('./SampleResponse.json');

// Perform google image search
export function performSearch(req, res) {
  // Parse URL Query String
  let query = url.parse(req.url, true).query,
    term = query.term || query.t || query.q || '',
    count = query.count || query.c || '10',
    offset = query.offset || query.o || '1';
  debug('Caught a search request: t=' + term + 
    ', c=' + count + ', o=' + offset);

  //Verify the necissary options were provided
  if (! term || 
    ! validator.isInt(count.toString(), { min: 1, max: 10 }) ||
    ! validator.isInt(offset.toString(), { min: 1, max: 99 }) ) {
    return res.status(400).end(); // Bad Request
  };

  return queryGoogleAPI(term, count, offset, function(err, apiResposne, body){
    if (!err) {
      debug('Query succeeded'); 
      //console.log(body);
      let results = JSON.parse(body),
        data = filterResponse(results.items);
      // Record search in MongoDB
      return Latest.addToMongo({
        term: results.queries.request[0].searchTerms,
        date : new Date()
        })
        .then(res.end(JSON.stringify(data))
          /*respondWithResult(res, 201) -mongoResponse-*/ )
        .catch(handleError(res, 'DB Storage Error'));
    } else{
      debug('Query failed');
      return res.status(apiResposne.statusCode).end(body); // issue with request
    }
  });
}
