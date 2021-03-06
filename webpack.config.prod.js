var path = require("path");  
var webpack = require('webpack');
var config = require('./webpack.config');

config.entry = ['./src/index.jsx'];
config.output.path = __dirname + '/app';
config.plugins = [
  new webpack.EnvironmentPlugin(['NODE_ENV', 'API_PREFIX'])
];

module.exports = config;