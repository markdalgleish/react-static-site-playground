import React from 'react';
import { createHistory, createMemoryHistory } from 'history';
import { Router, RoutingContext, match } from 'react-router';

import routes from './routes';

// Client render
if (typeof document !== 'undefined') {
  const history = createHistory();
  const outlet = document.getElementById('outlet');

  React.render(<Router history={history}>{routes}</Router>, outlet);
}

// Render function for prerender-webpack-plugin
export default function(locals, callback) {
  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    callback(null, locals.template({
      html: React.renderToString(<RoutingContext {...renderProps} />),
      assets: locals.assets
    }));
  });
};
