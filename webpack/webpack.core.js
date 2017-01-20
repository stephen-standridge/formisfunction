var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var extractCSS = new ExtractTextPlugin("stylesheets/[name]-[contenthash].css");
var CleanWebpackPlugin = require('clean-webpack-plugin');
require('dotenv').config();

module.exports = {
  entry: process.env.PWD + '/client/app.jsx',
  module: {
    loaders: [
    { test: /\.scss$/, loader: extractCSS.extract(['css','sass']) },
    { test: /\.css$/, loader: extractCSS.extract(['css']) },
    {
      test: /.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react']
      }
    },
    {
      test: /.js?$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ['es2015']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss']
  },
  plugins: [ 
    new CleanWebpackPlugin([
      process.env.PWD + '/public/build', 
      process.env.PWD + '/public/stylesheets', 
      process.env.PWD + '/public/index.html'
    ], { root: process.env.PWD }),  
    extractCSS, new HtmlWebpackPlugin({
      title: 'My App',
      filename: 'index.html'
    }), 
    new webpack.ProvidePlugin({
      'React':      'react',
      '_':          'lodash',
      'ReactDOM':   'react-dom'
    })  
  ],
  output: {
    path: process.env.PWD + '/public',
    publicPath: process.env.PWD,
    filename: 'build/[name]-[hash].js'
  },
};
