var webpack = require('webpack')
var config = require('./webpack/webpack.core.js');
var CleanWebpackPlugin = require('clean-webpack-plugin');


var filename = 'build/[name].js';
var emscriptenHost = '/';
var manifoldHost = '/';

var nodeEnvPlugin = new webpack.DefinePlugin({
  'process.env': {
    FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
    FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
    FIREBASE_DATABASE_URL: JSON.stringify(process.env.FIREBASE_DATABASE_URL),
    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'PRODUCTION'),
    EMSCRIPTEN_HOST: JSON.stringify(emscriptenHost),
    MANIFOLD_HOST: JSON.stringify(manifoldHost)
  }
});

var cleanWebpackPlugin = new CleanWebpackPlugin([
  './public/build',
  './public/stylesheets',
  './public/index.html'
])

var chunkWebpackPlugin = new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename })

config.plugins.push(nodeEnvPlugin, cleanWebpackPlugin, chunkWebpackPlugin);
config.output.filename = filename;

module.exports = config;
