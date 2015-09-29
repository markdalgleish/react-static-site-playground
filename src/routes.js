import React from 'react';
import { Route } from 'react-router';

import Root from './handlers/Root';
import Blog from './handlers/Blog';

export default (
  <Route path="/" component={Root}>
    <Route path="blog/:postName/" component={Blog} />
  </Route>
);
