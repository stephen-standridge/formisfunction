var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './source/index'
  ],
  devtool: 'eval-source-map',
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },  
  module: {
    loaders: [{
      test: /\.jsx$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'source')
    },{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'source')
    },
    { test: /\.css$/, loader: "style-loader!css-loader" },
    { test: /\.json$/, loader: "json-loader" },
    { test: /\.scss$/, loaders: ["style", "css", "sass"] }]
  }
};