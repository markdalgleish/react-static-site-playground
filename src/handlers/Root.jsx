var React = require('react');
var { RouteHandler, Link } = require('react-router');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
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
      </div>
    );
  }
});
