var ReactRouterToHtmlPlugin = require('./lib/react-router-to-html-webpack-plugin');
var fs = require('fs');
var ejs = require('ejs');

module.exports = {
  entry: {
    index: './src/index.jsx',
    routes: './src/routes.jsx'
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

  plugins: [
    new ReactRouterToHtmlPlugin('routes.js', {
      paths: [
        '/',
        '/blog/hello-world/',
        '/blog/another-post/',
      ],
      template: ejs.compile(fs.readFileSync(__dirname + '/src/template.ejs', 'utf-8'))
    })
  ]
};
