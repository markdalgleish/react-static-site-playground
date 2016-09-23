import React from 'react';
import { MatchWithRoutes } from 'react-router-addons-routes';

import Navigation from '../components/Navigation';
import HitCounter from '../components/HitCounter';

export default ({ routes }) => (
  <div>
    <Navigation />
    <main>
      { routes.map((route, i) => <MatchWithRoutes key={i} {...route} />) }
    </main>
    <footer>
      <HitCounter />
    </footer>
  </div>
);
