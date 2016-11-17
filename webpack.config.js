var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var extractCSS = new ExtractTextPlugin("stylesheets/[name].css");
var CleanWebpackPlugin = require('clean-webpack-plugin');
require('dotenv').config();

module.exports = {
  entry: './client/app.jsx',
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
    extractCSS, new HtmlWebpackPlugin(), 
    new webpack.ProvidePlugin({
      'React':      'react',
      '_':          'lodash',
      'ReactDOM':   'react-dom'
    }),
    new CleanWebpackPlugin(['public/build']),
    new webpack.DefinePlugin({
      'process.env.API_HOST': JSON.stringify(process.env.API_HOST || 'http://localhost:3000/api/v1')
    })    
  ],
  output: {
    path:'public',
    filename: 'build/[name]-[hash].js'
  },
  devServer: {
    port: 3000,
    historyApiFallback: {
      index: 'index.html'
    }
  }  
};
