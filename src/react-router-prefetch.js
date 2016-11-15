import React, { PropTypes } from 'react';
import createBrowserHistory from 'history/createBrowserHistory';
import { parsePath } from 'history/PathUtils';
import { parse as parseQuery } from 'query-string';
import History from 'react-history/History';
import { StaticRouter } from 'react-router';
import { matchRoutesToLocation } from 'react-router-addons-routes';

const getLocation = input => {
  if (typeof input === 'string') {
    const location = parsePath(input);

    location.query = location.search !== '' ?
      parseQuery(location.search) :
      null;

    return location;
  }

  return input;
}

const makeCreateLocals = routes => ({ browser, location, firstRender }) => {
  const { matchedRoutes } = matchRoutesToLocation(routes, location);

  const components = matchedRoutes.map(route => route.component);
  const server = !browser;
  const rehydrating = browser && firstRender;

  return {
    routes: matchedRoutes,
    components,
    location,
    browser,
    server,
    rehydrating
  };
};

const makeCreateHistory = (routes, prefetch) => (...args) => {
  const history = createBrowserHistory(...args);
  const createLocals = makeCreateLocals(routes);

  prefetch(createLocals({ location: history.location, firstRender: true, browser: true }));
  history.listen(location => prefetch(createLocals({ location, firstRender: false, browser: true })));

  return history;
};

const BrowserRouter = ({ routes, prefetch, basename, keyLength, ...rest }) => (
  <History
    createHistory={makeCreateHistory(routes, prefetch)}
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
  prefetch: PropTypes.func.isRequired,
  basename: PropTypes.string,
  keyLength: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node
  ])
};

const serverPrefetch = ({ routes, prefetch, location }) => {
  try {
    const parsedLocation = getLocation(location);
    const createLocals = makeCreateLocals(routes);
    const locals = createLocals({ location: parsedLocation, firstRender: true, browser: false });
    const result = prefetch(locals);

    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(err);
  }
};

export { BrowserRouter, serverPrefetch };
