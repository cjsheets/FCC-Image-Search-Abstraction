'use strict';
/* -----------------------------------|
 *|  Using Rails-like naming convention
 *|  for endpoints
 *|  GET     /api/latest    ->  index
 *|  POST    /api/latest    ->  create
 */

import Latest from './latest.model';
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
  debug('Caught an index request');
  return Latest.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Latest in the DB
export function create(req, res) {
  debug('Caught a create request');
  return Latest.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}
