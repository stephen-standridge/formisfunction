var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var extractCSS = new ExtractTextPlugin("stylesheets/[name].css");
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  watch: true,
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
    new CleanWebpackPlugin(['public/build'])    
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
