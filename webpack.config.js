var webpack = require('webpack')
var config = require('./webpack/webpack.core.js');
var CleanWebpackPlugin = require('clean-webpack-plugin');


var fileName = 'build/[name].js';
var apiHost = 'http://localhost:3000/api/v1';
var emscriptenHost = 'http://localhost:8888/';
var nodeEnv = 'development';

var nodeEnvPlugin = new webpack.DefinePlugin({
  'process.env': {
    API_HOST: JSON.stringify(apiHost),
    NODE_ENV: JSON.stringify(nodeEnv),
    EMSCRIPTEN_HOST: JSON.stringify(emscriptenHost)
  }
});

var cleanWebpackPlugin = new CleanWebpackPlugin([
  './public/build',
  './public/stylesheets',
  './public/index.html'
])

var chunkWebpackPlugin = new webpack.optimize.CommonsChunkPlugin('vendor', fileName)

config.plugins.push(nodeEnvPlugin, cleanWebpackPlugin, chunkWebpackPlugin);
config.output.filename = fileName;

module.exports = config;
