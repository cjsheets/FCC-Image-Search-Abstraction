/* -----------------------------------|
 *|  Production Environment
 *|    - from Node
 *|    - from local env
 */

module.exports = {
  // Sentry.io Access Keys
  raven: {
    key     : process.env.RAVEN_KEY,
    secret  : process.env.RAVEN_SECRED,
    host    : 'sentry.io',
    app_id  : '136254'
  },
  // Express.js Params
  express: {
    session_secret    : process.env.EXPRESS_SESSION_SECRET
  },
  // Google API
  api: {
    url: 'https://www.googleapis.com/customsearch/v1',
    cx: process.env.GOOGLE_CX,
    key: process.env.GOOGLE_KEY
  },
  // MongoDB connection options
  mongo: {
    uri: process.env.MONGO_URI,
    options: {
      db: {
        safe: true
      }
    }
  }
};