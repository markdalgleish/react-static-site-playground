import React from 'react';

import Navigation from '../components/Navigation';
import HitCounter from '../components/HitCounter';

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        <main>
          { this.props.children }
        </main>
        <footer>
          <HitCounter />
        </footer>
      </div>
    );
  }
};
