import React from 'react';

import Navigation from '../components/Navigation';

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        <main>
          { this.props.children }
        </main>
      </div>
    );
  }
};
