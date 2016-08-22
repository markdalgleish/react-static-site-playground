import styles from './Navigation.css';

import React from 'react';
import { Link } from 'react-router';

export default class Navigation extends React.Component {
  render() {
    return (
      <nav>
        <ul>
          <li><Link className={styles.link} to="/">Home</Link></li>
          <li><Link className={styles.link} to="/blog/hello-world/">Hello World</Link></li>
          <li><Link className={styles.link} to="/blog/another-post/">Another Post</Link></li>
        </ul>
      </nav>
    );
  }
};
