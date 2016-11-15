'use strict';
/* -----------------------------------|
 *|  Application Routes
 */

import errors from './components/errors';
import path from 'path';
const debug = require('debug')('app:routes');

export default function(app) {
  var env = app.get('env');

  // Predefined / API routes
  app.use('/api/image', require('./api/image'));
  app.use('/api/latest', require('./api/latest'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  if (env === 'development') {
    const middleware = app.get('wpMiddleware');
    debug('Default Route: ' + path.resolve(`${app.get('appPath')}/index.html`));
    app.route('/*')
      .get((req, res) => {
        //res.sendFile(middleware.fileSystem.readFileSync(path.resolve(`${app.get('appPath')}/index.html`)));
        res.write(path.resolve(`${app.get('appPath')}/index.html`));
        res.end();
      });
    } else {
      app.route('/*')
      .get((req, res) => {
        res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
      });
    }
}
