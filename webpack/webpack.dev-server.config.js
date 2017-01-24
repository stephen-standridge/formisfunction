var webpack = require('webpack')
var config = require('./webpack.core.js');
var CleanWebpackPlugin = require('clean-webpack-plugin');

config.devServer = {
  contentBase: process.env.PWD + '/public/',
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
  '/public/build', 
  '/public/stylesheets', 
  '/public/index.html'
], { root: process.env.PWD })

var nodeEnvPlugin = new webpack.DefinePlugin({
  'process.env': {
    API_HOST: JSON.stringify('http://localhost:3000/api/v1'),
    NODE_ENV: JSON.stringify('development')
  } 
});

config.watch = true;
config.plugins.push(nodeEnvPlugin, cleanWebpackPlugin)

module.exports = config;