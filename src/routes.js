var React = require('react');
var { Route } = require('react-router');

var Root = require('./handlers/Root');
var Blog = require('./handlers/Blog');

var Routes = (
  <Route name="root" path="/" handler={Root}>
    <Route name="blog" path="blog/:postName/" handler={Blog} />
  </Route>
);

module.exports = Routes;
