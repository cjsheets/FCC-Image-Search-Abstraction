'use strict';
/*eslint no-process-env:0*/

import path from 'path';
import _ from 'lodash';

// Development specific configuration
// ==================================
var all = {
  domain: 'http://localhost:9001',

  // Seed database on startup
  seedDB: false
};

module.exports = _.merge(
  all,
  require('../local.env.js') || {});