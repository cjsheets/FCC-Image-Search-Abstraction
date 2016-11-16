var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
const debug = require('debug')('webpack:dev');


module.exports = function makeWebpackConfig(options) {
  // Envorinment Type: NODE_ENV
  const BUILD = !!options.BUILD;
  const DEV = !!options.DEV;

 // Reference: http://webpack.github.io/docs/configuration.html
  var config = {};

  config.entry = {
    'polyfills': './client/polyfills.ts',
    'vendor': './client/vendor.ts',
    'app': './client/main.ts'
  };

  config.resolve = {
    extensions: ['', '.ts', '.js']
  };

  config.module = {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('client', 'app'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      },
      {
        test: /\.css$/,
        include: helpers.root('client', 'app'),
        loader: 'raw'
      }
    ]
  };

  config.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      template: 'client/index.html'
    })
  ];

  // if (DEV) {
  //   var localEnv = require('../server/config/local.env.js');
  //   config.plugins.push(
  //     // Reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
  //     new webpack.DefinePlugin({
  //     'process.env': localEnv
  // })
  //   );
  // }

  //debug(JSON.stringify(process.env));

  config.devtool = 'cheap-module-eval-source-map';

  config.output = {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  };

  config.devServer = {
    historyApiFallback: true,
    stats: 'minimal'
  }

    return config;
};