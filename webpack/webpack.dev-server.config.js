var webpack = require('webpack')
var config = require('./webpack.core.js');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var nodeEnv = 'development';
var apiHost = 'http://localhost:3000/api/v1';
var emscriptenHost = 'http://localhost:8888/';

config.devServer = {
  contentBase: process.env.PWD + '/public',
  noInfo: true,
  open: true,
  port: 8888,
  colors: true,
  historyApiFallback: {
    index: process.env.PWD + '/public/index.html'
  },
  inline: true
}
var cleanWebpackPlugin = new CleanWebpackPlugin([
  'public/build',
  'public/stylesheets',
  'public/index.html'
], { root: process.env.PWD })

var nodeEnvPlugin = new webpack.DefinePlugin({
  'process.env': {
    API_HOST: JSON.stringify(apiHost),
    NODE_ENV: JSON.stringify(nodeEnv),
    EMSCRIPTEN_HOST: JSON.stringify(emscriptenHost)
  }
});

config.watch = true;
config.output = {
  path: process.env.PWD + '/public',
  publicPath: process.env.PWD + '/public',
  filename: 'build/[name].js',
  library: '[name]',
  libraryTarget: 'var'
}
config.plugins.push(nodeEnvPlugin, cleanWebpackPlugin)

module.exports = config;
