import React from 'react';
import { Link } from 'react-router';

export default class Navigation extends React.Component {
  render() {
    return (
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/blog/hello-world/">Hello World</Link></li>
          <li><Link to="/blog/another-post/">Another Post</Link></li>
        </ul>
      </nav>
    );
  }
};
