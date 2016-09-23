import React from 'react';
import { RoutesProvider, MatchWithRoutes } from 'react-router-addons-routes';

import routes from './routes';

export default () => (
  <RoutesProvider routes={routes}>
    <div>
      { routes.map((route, i) => <MatchWithRoutes key={i} {...route} />) }
    </div>
  </RoutesProvider>
);
