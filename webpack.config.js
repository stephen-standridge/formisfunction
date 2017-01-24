var webpack = require('webpack')
var config = require('./webpack/webpack.core.js');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var nodeEnvPlugin = new webpack.DefinePlugin({
  'process.env': {
    API_HOST: JSON.stringify('http://localhost:3000/api/v1'),
    NODE_ENV: JSON.stringify('development')
  }  
});

var cleanWebpackPlugin = new CleanWebpackPlugin([
  './public/build', 
  './public/stylesheets', 
  './public/index.html'
])

var chunkWebpackPlugin = new webpack.optimize.CommonsChunkPlugin('vendor', 'build/[name].js')  

config.plugins.push(nodeEnvPlugin, cleanWebpackPlugin, chunkWebpackPlugin);

module.exports = config;
