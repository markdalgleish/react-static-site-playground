var React = require('react');
var Router = require('react-router');

var Routes = require('./routes');
var template = require('./template.ejs');

module.exports = function(data, callback) {
  Router.run(Routes, data.path, function(Handler) {
    callback(null, template({
      html: React.renderToString(<Handler />),
      assets: data.assets
    }));
  });
};
