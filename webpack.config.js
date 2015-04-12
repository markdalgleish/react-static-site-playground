var PrerenderPlugin = require('./lib/prerender-webpack-plugin');

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
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },

  plugins: [
    new PrerenderPlugin('index.js', [
      '/',
      '/blog/hello-world/',
      '/blog/another-post/'
    ])
  ]
};
