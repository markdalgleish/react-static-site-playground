import Promise from 'bluebird';
if (typeof window !== 'undefined') window.Promise = window.Promise || Promise;
if (typeof global !== 'undefined') global.Promise = global.Promise || Promise;

import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';
import { ServerRouter, createServerRenderContext } from 'react-router';
import { Provider as StoreProvider } from 'react-redux';
import { trigger } from 'redial';

import { BrowserRouter, serverFetch } from './react-router-addons-fetch';
import createStore from './store/createStore';
import routes from './routes';
import App from './App';

const makeFetch = ({ dispatch }) => ({ components }) => {
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
  const { dispatch } = store;

  render((
    <StoreProvider store={store}>
      <BrowserRouter routes={routes} fetch={makeFetch({ dispatch })}>
        <App />
      </BrowserRouter>
    </StoreProvider>
  ), document.getElementById('outlet'));
}

// Render function for static-site-generator-webpack-plugin
export default ({ path, assets, template }, callback) => {
  const store = createStore();
  const { dispatch } = store;

  const location = { pathname: path };
  const fetch = makeFetch({ dispatch });

  serverFetch({ routes, fetch, location }).then(() => {
    const context = createServerRenderContext();

    const html = renderToString(
      <StoreProvider store={store}>
        <ServerRouter location={path} context={context}>
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
