var React = require('react');
var { Route } = require('react-router');

var Root = require('../handlers/Root.jsx');
var Blog = require('../handlers/Blog.jsx');

var Routes = (
  <Route name="root" path="/" handler={Root}>
    <Route name="blog" path="blog/:postName/" handler={Blog} />
  </Route>
);

module.exports = Routes;
