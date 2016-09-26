import React, { PropTypes } from 'react';
import createBrowserHistory from 'history/createBrowserHistory';
import History from 'react-history/History';
import { StaticRouter } from 'react-router';
import { matchRoutesToLocation } from 'react-router-addons-routes';

const makeCreateLocals = routes => location => {
  const matchedRoutes = matchRoutesToLocation(routes, location);
  const components = matchedRoutes.map(route => route.component);

  return {
    routes: matchedRoutes,
    components,
    location
  };
};

const makeCreateHistory = (routes, fetch) => (...args) => {
  const history = createBrowserHistory(...args);
  const createLocals = makeCreateLocals(routes);

  fetch(createLocals(history.location));
  history.listen(location => fetch(createLocals(location)));

  return history;
};

const BrowserRouter = ({ routes, fetch, basename, keyLength, ...rest }) => (
  <History
    createHistory={makeCreateHistory(routes, fetch)}
    historyOptions={{ basename, keyLength }}>
    {({ history, action, location }) => (
      <StaticRouter
        action={action}
        location={location}
        onPush={history.push}
        onReplace={history.replace}
        blockTransitions={history.block}
        {...rest}
      />
    )}
  </History>
);

BrowserRouter.propTypes = {
  routes: PropTypes.array.isRequired,
  fetch: PropTypes.func.isRequired,
  basename: PropTypes.string,
  keyLength: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node
  ])
};

const serverFetch = ({ routes, fetch, location }) => {
  try {
    const createLocals = makeCreateLocals(routes);
    const locals = createLocals(location);
    const result = fetch(locals);

    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(err);
  }
};

export { BrowserRouter, serverFetch };
