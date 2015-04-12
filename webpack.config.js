var PrerenderPlugin = require('./lib/prerender-webpack-plugin');
var ejs = require('ejs');
var fs = require('fs');

var template = ejs.compile(fs.readFileSync(__dirname + '/src/template.ejs', 'utf-8'))

var paths = [
  '/',
  '/blog/hello-world/',
  '/blog/another-post/'
];

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'index.js',
    path: 'dist',
    publicPath: '/',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader?stage=0', exclude: /node_modules/ },
      { test: /\.ejs$/, loader: 'ejs-compiled-loader' },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },

  plugins: [
    new PrerenderPlugin('index.js', paths, { template: template })
  ]
};
