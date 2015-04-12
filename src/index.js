var React = require('react');
var Router = require('react-router');

var Routes = require('./routes');
var template = require('./template.ejs');

// Client render
if (typeof document !== 'undefined') {
  Router.run(Routes, Router.HistoryLocation, function(Handler) {
    React.render(<Handler />, document.getElementById('outlet'));
  });
}

// Render function for prerender-webpack-plugin
module.exports = function(data, callback) {
  Router.run(Routes, data.path, function(Handler) {
    callback(null, template({
      html: React.renderToString(<Handler />),
      assets: data.assets
    }));
  });
};
