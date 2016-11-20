'use strict';
/* -----------------------------------|
 *|  Webpack Configuration
 */

import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import errorHandler from 'errorhandler';
import config from './environment';
const debug = require('debug')('config:webpack');

export default function(app) {
  var env = app.get('env');

  if (env === 'development' || env === 'test') {
    debug('Webpack running, development mode');
    const stripAnsi = require('strip-ansi');
    const makeWebpackConfig = require('../../build/webpack.dev');
    const webpackConfig = makeWebpackConfig({ DEV: true });
    const compiler = webpack(webpackConfig);
    const browserSync = require('browser-sync').create();
    const middleware = webpackMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    });

    /**
     * Run Browsersync and use middleware for Hot Module Replacement
     */
     
    browserSync.init({
      open: false,
      logFileChanges: false,
      proxy: `localhost:${config.port}`,
      ws: true,
      middleware: [ middleware ],
      port: config.browserSyncPort,
      plugins: ['bs-fullscreen-message']
    });

    /**
     * Reload all devices when bundle is complete
     * or send a fullscreen error message to the browser instead
     */
    compiler.plugin('done', function(stats) {
      debug('Webpack done hook');
      if(stats.hasErrors() || stats.hasWarnings()) {
        return browserSync.sockets.emit('fullscreen:message', {
          title: 'Webpack Error:',
          body: stripAnsi(stats.toString()),
          timeout: 100000
        });
      }
      browserSync.reload();
    });

    app.set('wpMiddleware', middleware);
    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));



    app.use(errorHandler()); // Error handler - has to be last
  // } else {
  //   app.use(express.static(__dirname + '/dist'));
  }
}
