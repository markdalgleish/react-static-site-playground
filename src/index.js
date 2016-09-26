import Promise from 'bluebird';
if (typeof window !== 'undefined') window.Promise = window.Promise || Promise;
if (typeof global !== 'undefined') global.Promise = global.Promise || Promise;

import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';
import { ServerRouter, createServerRenderContext } from 'react-router';
import { Provider as StoreProvider } from 'react-redux';
import { trigger } from 'redial';

import { BrowserRouter, serverPrefetch } from './react-router-prefetch';
import createStore from './store/createStore';
import routes from './routes';
import App from './App';

const makePrefetch = ({ store }) => ({ components }) => {
  const { dispatch } = store;
  const locals = { dispatch };

  if (typeof window !== 'undefined' && window.REDUX_INITIAL_STATE) {
    delete window.REDUX_INITIAL_STATE;
  } else {
    return trigger('fetch', components, locals);
  }
};

// Client render
if (typeof document !== 'undefined') {
  const store = createStore(window.REDUX_INITIAL_STATE);

  render((
    <StoreProvider store={store}>
      <BrowserRouter routes={routes} prefetch={makePrefetch({ store })}>
        <App />
      </BrowserRouter>
    </StoreProvider>
  ), document.getElementById('outlet'));
}

// Render function for static-site-generator-webpack-plugin
export default ({ path: location, assets, template }, callback) => {
  const store = createStore();

  const prefetch = makePrefetch({ store });

  serverPrefetch({ routes, prefetch, location }).then(() => {
    const context = createServerRenderContext();

    const html = renderToString(
      <StoreProvider store={store}>
        <ServerRouter location={location} context={context}>
          <App />
        </ServerRouter>
      </StoreProvider>
    );

    const state = JSON.stringify(store.getState());

    callback(null, template({ html, assets, state }));
  })
  .catch(err => {
    callback(err);
  });
};
