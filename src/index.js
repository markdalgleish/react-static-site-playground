import React from 'react';
import createLocation from 'history/lib/createLocation';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Router, RoutingContext, match } from 'react-router';

import routes from './routes';

// Client render
if (typeof document !== 'undefined') {
  const history = createBrowserHistory();
  const outlet = document.getElementById('outlet');

  React.render(<Router history={history}>{routes}</Router>, outlet);
}

// Render function for prerender-webpack-plugin
export default function(locals, callback) {
  const location = createLocation(locals.path);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    callback(null, locals.template({
      html: React.renderToString(<RoutingContext {...renderProps} />),
      assets: locals.assets
    }));
  });
};
