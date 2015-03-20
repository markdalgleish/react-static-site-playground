var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var Root = require('./handlers/Root.jsx');
var Hello = require('./handlers/Hello.jsx');
var World = require('./handlers/World.jsx');

var Routes = (
  <Route handler={Root} path="/">
    <Route name="hello" handler={Hello} />
    <Route name="world" handler={World} />
  </Route>
);

module.exports = Routes;
