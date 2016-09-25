import Promise from 'bluebird';
if (typeof window !== 'undefined') window.Promise = window.Promise || Promise;
if (typeof global !== 'undefined') global.Promise = global.Promise || Promise;

import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';
import { ServerRouter, createServerRenderContext } from 'react-router';
import { matchRoutesToLocation } from 'react-router-addons-routes';
import { Provider as StoreProvider } from 'react-redux';
import { trigger } from 'redial';

import { BrowserRouter } from './react-router-addons-fetch';
import createStore from './store/createStore';
import routes from './routes';
import App from './App';

// Client render
if (typeof document !== 'undefined') {
  const store = createStore(window.REDUX_INITIAL_STATE);
  const { dispatch } = store;

  const fetch = ({ components }) => {
    const locals = { dispatch };

    if (window.REDUX_INITIAL_STATE) {
      delete window.REDUX_INITIAL_STATE;
    } else {
      trigger('fetch', components, locals);
    }
  };

  render((
    <StoreProvider store={store}>
      <BrowserRouter routes={routes} fetch={fetch}>
        <App />
      </BrowserRouter>
    </StoreProvider>
  ), document.getElementById('outlet'));
}

// Render function for static-site-generator-webpack-plugin
export default ({ path, assets, template }, callback) => {
  const store = createStore();
  const { dispatch } = store;

  const context = createServerRenderContext();

  const matchedRoutes = matchRoutesToLocation(routes, { pathname: path });
  const components = matchedRoutes.map(route => route.component);
  const locals = { dispatch };

  trigger('fetch', components, locals).then(() => {
    try {
      const html = renderToString(
        <StoreProvider store={store}>
          <ServerRouter location={path} context={context}>
            <App />
          </ServerRouter>
        </StoreProvider>
      );

      const state = JSON.stringify(store.getState());

      callback(null, template({ html, assets, state }));
    } catch (err) {
      callback(err);
    }
  });
};
