'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: process.env.MONGODB_URI
      || process.env.MONGOHQ_URL
      || process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME
      || 'mongodb://' + process.env.MLAB_USER + ':' + process.env.MLAB_PASS + '@ds145997.mlab.com:45997/cjs-sandbox'
      || 'mongodb://localhost/test'
  },

  // Seed database on startup
  seedDB: true

};
