var React = require('react');
var Router = require('react-router');

var Routes = require('./routes/routes.jsx');

Router.run(Routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler />, document.getElementById('outlet'));
});
