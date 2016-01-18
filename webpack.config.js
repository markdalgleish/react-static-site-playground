var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
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
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.ejs$/, loader: 'ejs-compiled-loader' },
      { test: /\.md$/, loader: 'html-loader!markdown-loader' }
    ]
  },

  plugins: [
    new StaticSiteGeneratorPlugin('index.js', paths, { template: template })
  ]
};
