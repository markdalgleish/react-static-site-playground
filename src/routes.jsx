var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var Root = require('./handlers/Root.jsx');
var Blog = require('./handlers/Blog.jsx');

var Routes = (
  <Route name="root" path="/" handler={Root}>
    <Route name="blog" path="blog/:postName" handler={Blog} />
  </Route>
);

module.exports = Routes;
