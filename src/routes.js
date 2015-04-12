import React from 'react';
import { Route } from 'react-router';

import Root from './handlers/Root';
import Blog from './handlers/Blog';

export default (
  <Route name="root" path="/" handler={Root}>
    <Route name="blog" path="blog/:postName/" handler={Blog} />
  </Route>
);
