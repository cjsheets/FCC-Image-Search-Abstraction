'use strict';
/* -----------------------------------|
 *|  Using Rails-like naming convention
 *|  for endpoints
 *|  GET     /api/latest    ->  index
 *|  POST    /api/latest    ->  create
 */

import Latest from './latest.model';
import url from 'url';
import sanitize from 'mongo-sanitize';
import validator from 'validator';
const debug = require('debug')('api:latest');

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
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Latests
export function index(req, res) {
  let query = url.parse(req.url, true).query,
    num = query.number || query.num || query.n || '10';
  debug('Caught a latest request: n=' + num);
  if (! validator.isInt(num.toString(), { min: 1, max: 50 }) ) {
    return res.status(400).end(); // Bad Request
  };
  return Latest.find().sort({_id: -1}).limit(parseInt(num)).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}