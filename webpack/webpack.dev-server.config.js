var webpack = require('webpack')
var config = require('./webpack.core.js');

config.devServer = {
  contentBase: process.env.PWD + '/public/',
  noInfo: true,
  open: true,
  port: 8888,
  colors: true,
  historyApiFallback: {
    index: process.env.PWD + '/index.html'
  },
  inline: true
}

var apiHostPlugin = new webpack.DefinePlugin({
  'process.env.API_HOST': JSON.stringify('http://localhost:3000/api/v1')
});

config.watch = true;
config.plugins.push(apiHostPlugin)

module.exports = config;