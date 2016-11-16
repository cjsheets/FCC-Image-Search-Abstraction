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
  let path = url.parse(req.url, true).pathname.split('/');
  if(! validator.isInt(path[0], { min: 1, max: 99 })) { path[0] = 10 };
  debug('Caught an index request');
  return Latest.find().sort({_id: -1}).limit(sanitize(path[0])).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Latest in the DB
export function create(req, res) {
  let path = url.parse(req.url, true).pathname.split('/');
  debug('Caught a create request');
  return Latest.create({ when : new Date()})
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}
