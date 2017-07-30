var webpack = require('webpack')
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var extractCSS = new ExtractTextPlugin("stylesheets/[name]-[contenthash].css");
require('dotenv').config();

module.exports = {
  entry: {
    app: './client/app.jsx',
    vendor: ['react', 'react-dom', 'lodash', 'moment'],
    immutable: ['immutable'],
    three: ['three'],
    abstracts: ['abstracts']
  },
  module: {
    loaders: [
    { test: /\.scss$/, loader: extractCSS.extract(['css-loader','sass-loader']) },
    { test: /\.css$/, loader: extractCSS.extract(['css-loader']) },
    { test: /\.svg$/, loader: 'url-loader?limit=65000&mimetype=image/svg+xml&name=fonts/[name].[ext]' },
    { test: /\.woff$/, loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]' },
    { test: /\.woff2$/, loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=fonts/[name].[ext]' },
    { test: /\.[ot]tf$/, loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=fonts/[name].[ext]' },
    { test: /\.eot$/, loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]' },
    {
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react']
      }
    },
    {
      test: /.js?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015']
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss']
  },
  plugins: [
    extractCSS, new HtmlWebpackPlugin({
      title: 'My App',
      filename: 'index.html'
    }),
    new webpack.ProvidePlugin({
      'React':      'react',
      'ReactDOM':   'react-dom',
      'moment':     'moment',
      'immutable':  'immutable',
      'abstracts':  'abstracts',
      'three':      'three'
    })
  ],
  output: {
    path: path.resolve('public'),
    filename: 'build/[name].js',
    library: '[name]',
    libraryTarget: 'var'
  },
};
