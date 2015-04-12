var React = require('react');
var Router = require('react-router');
var Promise = require('bluebird');

var Routes = require('./routes/routes.jsx');
var template = require('./template.ejs');

module.exports = function(data) {
  return new Promise(function(resolve, reject) {
    Router.run(Routes, data.path, function(Handler) {
      resolve(template({
        html: React.renderToString(<Handler />),
        assets: data.assets
      }));
    });
  });
};
