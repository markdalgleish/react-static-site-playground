var React = require('react');
var { RouteHandler } = require('react-router');

module.exports = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <title>React Router static site</title>
        </head>
        <body>
          <h1>React Router static site</h1>
          <RouteHandler {...this.props} />
        </body>
      </html>
    )
  }
});
