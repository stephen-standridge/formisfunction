var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var extractCSS = new ExtractTextPlugin("stylesheets/[name]-[contenthash].css");
require('dotenv').config();

module.exports = {
  entry: {
    app: './client/app.jsx',
    vendor: ['react', 'react-dom', 'lodash', 'moment'],
  },
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
    extractCSS, new HtmlWebpackPlugin({
      title: 'My App',
      filename: 'index.html'
    }), 
    new webpack.ProvidePlugin({
      'React':      'react',
      'ReactDOM':   'react-dom',
      'moment':     'moment'
    })
  ],
  output: {
    path: './public',
    filename: 'build/[name].js'
  },
};
