var webpack = require('webpack')
var config = require('./webpack.core.js');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var apiHost = 'http://localhost:3000/api/v1';
var emscriptenHost = 'http://localhost:8888/';
var manifoldHost = 'http://localhost:8888/';

config.devServer = {
  contentBase: process.env.PWD + '/public',
  noInfo: true,
  open: true,
  port: 8888,
  // colors: true,
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
    FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
    FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
    FIREBASE_DATABASE_URL: JSON.stringify(process.env.FIREBASE_DATABASE_URL),
    API_HOST: JSON.stringify(apiHost),
    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'PRODUCTION'),
    EMSCRIPTEN_HOST: JSON.stringify(emscriptenHost),
    MANIFOLD_HOST: JSON.stringify(manifoldHost)
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
