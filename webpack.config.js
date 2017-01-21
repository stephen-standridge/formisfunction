var webpack = require('webpack')
var config = require('./webpack/webpack.core.js');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var apiHostPlugin = new webpack.DefinePlugin({
  'process.env.API_HOST': JSON.stringify('http://localhost:3000/api/v1')
});

var cleanWebpackPlugin = new CleanWebpackPlugin([
  './public/build', 
  './public/stylesheets', 
  './public/index.html'
])

config.plugins.push(apiHostPlugin, cleanWebpackPlugin);
module.exports = config;
