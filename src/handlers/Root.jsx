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
              <li><Link to="blog" params={{ postName: 'hello-world' }}>Hello World</Link></li>
              <li><Link to="blog" params={{ postName: 'another-post' }}>Another Post</Link></li>
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
