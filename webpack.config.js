var ReactRouterToHtmlPlugin = require('./lib/react-router-to-html-webpack-plugin');

module.exports = {
  entry: './src/routes.jsx',

  output: {
    filename: 'routes.js',
    path: 'dist',
    libraryTarget: 'commonjs2'
  },

  module: {
    loaders: [{ test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }]
  },

  plugins: [
    new ReactRouterToHtmlPlugin('routes.js', [
      '/',
      // Only the first path is rendered for now, to keep it simple
      // '/hello',
      // '/world'
    ])
  ]
};
