var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var commonConfig = require('./webpack.common.js');
const debug = require('debug')('webpack:dev');


module.exports = function makeWebpackConfig(options) {

 // Reference: http://webpack.github.io/docs/configuration.html
  var config = {};

  config.devtool = 'cheap-module-eval-source-map';

  config.output = {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  };

  config.plugins = [
    new ExtractTextPlugin('[name].css')
  ];

  config.devServer = {
    historyApiFallback: true,
    stats: 'minimal'
  }

    return webpackMerge(commonConfig, config);
};