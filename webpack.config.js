var webpack = require('webpack')
var config = require('./webpack/webpack.core.js');

var apiHostPlugin = new webpack.DefinePlugin({
  'process.env.API_HOST': JSON.stringify('http://localhost:3000/api/v1')
});

config.plugins.push(apiHostPlugin);
module.exports = config;