var PrerenderPlugin = require('./lib/prerender-webpack-plugin');

var paths = [
  '/',
  '/blog/hello-world/',
  '/blog/another-post/'
];

module.exports = {
  entry: {
    index: './src/index.js',
    prerender: './src/prerender.js'
  },

  output: {
    filename: '[name].js',
    path: 'dist',
    publicPath: '/',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.ejs$/, loader: 'ejs-compiled-loader' },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },

  plugins: paths.map(function(path) { return new PrerenderPlugin('prerender.js', path); })
};
