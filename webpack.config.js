var EvalWebpackPlugin = require('./lib/eval-webpack-plugin');
var fs = require('fs');
var ejs = require('ejs');

var paths = [
  '/',
  '/blog/hello-world/',
  '/blog/another-post/'
];

module.exports = {
  entry: {
    index: './src/index.jsx',
    render: './src/render.jsx'
  },

  output: {
    filename: '[name].js',
    path: 'dist',
    publicPath: '/',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },

  plugins: paths.map(function(path) { return new EvalWebpackPlugin('render.js', path, path); })
};
