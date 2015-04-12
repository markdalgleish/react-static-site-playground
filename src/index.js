var React = require('react');
var Router = require('react-router');

var Routes = require('./routes');

// Client render
if (typeof document !== 'undefined') {
  Router.run(Routes, Router.HistoryLocation, function(Handler) {
    React.render(<Handler />, document.getElementById('outlet'));
  });
}

// Render function for prerender-webpack-plugin
module.exports = function(locals, callback) {
  Router.run(Routes, locals.path, function(Handler) {
    callback(null, locals.template({
      html: React.renderToString(<Handler />),
      assets: locals.assets
    }));
  });
};
