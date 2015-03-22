var React = require('react');
var { RouteHandler, Link } = require('react-router');

module.exports = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <title>React Router static site</title>
        </head>
        <body>
          <header>
            <h1>React Router static site</h1>
          </header>
          <nav>
            <ul>
              <li><Link to="root">Home</Link></li>
              <li><Link to="hello">Hello</Link></li>
              <li><Link to="world">World</Link></li>
            </ul>
          </nav>
          <main>
            <RouteHandler {...this.props} />
          </main>
        </body>
      </html>
    );
  }
});
