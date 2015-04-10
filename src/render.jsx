var React = require('react');
var Router = require('react-router');
var Promise = require('bluebird');

var Routes = require('./routes/routes.jsx');

module.exports = function(path) {
  return new Promise(function(resolve, reject) {
    Router.run(Routes, path, function(Handler) {
      resolve(React.renderToString(<Handler />));
    });
  });
};
