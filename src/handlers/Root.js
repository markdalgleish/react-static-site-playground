import React from 'react';
import { RouteHandler } from 'react-router';

import Navigation from '../components/Navigation';

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        <main>
          <RouteHandler {...this.props} />
        </main>
      </div>
    );
  }
};
