import Promise from 'bluebird';
if (typeof window !== 'undefined') window.Promise = window.Promise || Promise;
if (typeof global !== 'undefined') global.Promise = global.Promise || Promise;

import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { createHistory, createMemoryHistory } from 'history';
import { Router, RoutingContext, match } from 'react-router';
import { Provider } from 'react-redux';
import { trigger } from 'redial';

import createStore from './store/createStore';
import routes from './routes';

// Client render
if (typeof document !== 'undefined') {
  const store = createStore(window.REDUX_INITIAL_STATE);
  const { dispatch } = store;

  const history = createHistory();
  history.listen(location => {
    match({ routes, location }, (routerError, redirectLocation, renderProps) => {
      const components = renderProps.routes.map(route => route.component);
      const locals = { dispatch };

      if (window.REDUX_INITIAL_STATE) {
        delete window.REDUX_INITIAL_STATE;
      } else {
        trigger('fetch', components, locals);
      }
    });
  });

  ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>
  ), document.getElementById('outlet'));
}

// Render function for static-site-generator-webpack-plugin
export default ({ path, assets, template }, callback) => {
  const store = createStore();
  const { dispatch } = store;

  const history = createMemoryHistory();
  const location = history.createLocation(path);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    const components = renderProps.routes.map(route => route.component);
    const locals = { dispatch };

    trigger('fetch', components, locals).then(() => {
      const html = ReactDOMServer.renderToString(
        <Provider store={store}>
          <RoutingContext {...renderProps} />
        </Provider>
      );

      const state = JSON.stringify(store.getState());

      callback(null, template({ html, assets, state }));
    });
  });
};
