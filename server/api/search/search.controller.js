'use strict';
/* -----------------------------------|
 *|  Using Rails-like standard naming convention for endpoints.
 *|  GET     /api/searchs    ->  index
 */

import Latest from '../latest/latest.model';
import url from 'url';
import sanitize from 'mongo-sanitize';
import validator from 'validator';
import request from 'request';
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

function queryGoogleAPI(query, offset, count) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Searchs
export function index(req, res) {
  let path = url.parse(req.url, true).pathname.split('/');
  if(! validator.isInt(path[0], { min: 1, max: 99 })) { path[0] = 10 };

  debug('Caught a search request');
  return Latest.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Search in the DB
export function create(req, res) {
  return Latest.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

