import React from 'react';
import { RouteHandler, Link } from 'react-router';

export default class Root extends React.Component {
  render() {
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
};
