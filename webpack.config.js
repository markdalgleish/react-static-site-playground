var ReactRouterToHtmlPlugin = require('./lib/react-router-to-html-webpack-plugin');

module.exports = {
  entry: './src/routes.jsx',

  output: {
    filename: 'routes.js',
    path: 'dist',
    libraryTarget: 'commonjs2'
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
        '/blog/hello-world',
        '/blog/another-post',
      ]
    })
  ]
};
