'use strict';
/* -----------------------------------|
 *|  Using Rails-like standard naming convention for endpoints.
 *|  GET     /api/searchs    ->  index
 */

import config from '../../config/environment';
import Latest from '../latest/latest.model';
import url from 'url';
import querystring from 'querystring';
import sanitize from 'mongo-sanitize';
import validator from 'validator';
import request from 'request';
const debug = require('debug')('api:latest');
var sample = require('./SampleResponse.json');


function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  debug('Handling Error: ' + statusCode);
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function queryGoogleAPI(q, c, o, cb) {
  // let cx = process.env.CX || config.api.cx,
  //   key = process.env.KEY || config.api.key,
  //   url = process.env.API_URL || config.api.url,
  //   queryString = querystring.stringify({
  //     q: q,
  //     cx: cx,
  //     count: c,
  //     start: o,
  //     fileType: 'jpg',
  //     key: key
  //   });
  // debug('Query Google: ' + url + '?' + queryString);
  // request( url + '?' + queryString, cb);
  cb('', sample, sample);
}

function filterResponse(data) {
  let result = [];
  for(let d of data){
    var image = {};
    try {
      image.url = d.pagemap.cse_image[0].src;
    } catch (e) { image.url = ''; }
    try {
      image.thumbnail = d.pagemap.cse_thumbnail[0].src;
    } catch (e) { image.thumbnail = ''; }
    image.context = d.link || d.formattedUrl || img;
    image.snippet = d.snippet || d.title || d.htmlSnippet;
    result.push(image);
  }
  return result;
}

// Gets a list of Searchs
export function index(req, res) {
  let query = url.parse(req.url, true).query,
    term = query.term || query.t || query.q || '',
    count = query.count || query.c || '10',
    offset = query.offset || query.o || '0';
  debug('Caught a search request: t=' + term + 
    ', c=' + count + ', o=' + offset);
  //Verify the necissary options were provided
  if (! term || 
    ! validator.isInt(count.toString(), { min: 1, max: 10 }) ||
    ! validator.isInt(offset.toString(), { min: 0, max: 99 }) ) {
    return res.status(400).end(); // Bad Request
  };
  return queryGoogleAPI(term, count, offset, function(err, apiResposne, body){
      debug('running query callback');
    if (!err) { //  && apiResposne.statusCode == 200
//      let data = filterResponse(JSON.parse(body));
      debug('Time: ' + body.searchInformation.searchTime);
      let data = filterResponse(body.items);
      return res.status(200).end(JSON.stringify(data)); // issue with request
    }
      debug('Query failed');
    return res.status(apiResposne.statusCode).end(body); // issue with request
  });
}

// Creates a new Search in the DB
export function create(req, res) {
  return Latest.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

