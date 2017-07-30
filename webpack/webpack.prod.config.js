var webpack = require('webpack')
var S3Plugin = require('webpack-s3-plugin')
var config = require('./webpack.core.js');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var WebpackOnBuildPlugin = require('on-build-webpack');

var s3BucketName = 'component_api_client.com'
var apiHost = 'localhost:3000/api/v1'
var fileName = 'build/[name]-[chunkhash].js';
var nodeEnv = 'production';
var s3CacheString ='max-age=2592000';
var s3Url = 'http://localhost:8888/';
var emscriptenHost = s3Url;
var manifoldHost = s3Url;

var s3Plugin = new S3Plugin({
  // Only upload css and js
  include: /.*\.(css|js|html)/,
  // s3Options are required
  s3Options: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  s3UploadOptions: {
    Bucket: s3BucketName,
    CacheControl: s3CacheString
  }
});

var nodeEnvPlugin = new webpack.DefinePlugin({
  'process.env': {
      FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
      FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
      FIREBASE_DATABASE_URL: JSON.stringify(process.env.FIREBASE_DATABASE_URL),
      API_HOST: JSON.stringify(apiHost),
      NODE_ENV: JSON.stringify(nodeEnv),
      EMSCRIPTEN_HOST: JSON.stringify(emscriptenHost),
      MANIFOLD_HOST: JSON.stringify(manifoldHost)
    }
})

var cleanWebpackPlugin = new CleanWebpackPlugin([
  './public/build',
  './public/stylesheets',
  './public/index.html'
], { root: process.env.PWD })

var chunkWebpackPlugin = new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename })
var chunkMetaPlugin = new webpack.optimize.CommonsChunkPlugin({name: 'meta', chunks: ['vendor']})

var uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    }
})
var sourceMapPlugin = new webpack.SourceMapDevToolPlugin({
  test: ['.js', '.jsx'],
})


var onBuildPlugin = new WebpackOnBuildPlugin(function(){
  var spawn = require('child_process').spawn
  spawn('open', [s3Url]);
})

//turn of watching for a one-time build
config.watch = false;

//hash the production build
config.output.filename = fileName

config.plugins.push(cleanWebpackPlugin, s3Plugin, nodeEnvPlugin, chunkWebpackPlugin, chunkMetaPlugin, uglifyPlugin, sourceMapPlugin, onBuildPlugin);
module.exports = config;
