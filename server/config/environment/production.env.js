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
  }
};