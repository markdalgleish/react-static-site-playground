import Promise from 'bluebird';
if (typeof window !== 'undefined') window.Promise = window.Promise || Promise;
if (typeof global !== 'undefined') global.Promise = global.Promise || Promise;

import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';
import { Router, RouterContext, match, browserHistory, createMemoryHistory } from 'react-router';
import { Provider } from 'react-redux';
import { trigger } from 'redial';

import createStore from './store/createStore';
import routes from './routes';

// Client render
if (typeof document !== 'undefined') {
  const store = createStore(window.REDUX_INITIAL_STATE);
  const { dispatch } = store;

  browserHistory.listen(location => {
    match({ routes, location }, (error, redirectLocation, { components }) => {
      const locals = { dispatch };

      if (window.REDUX_INITIAL_STATE) {
        delete window.REDUX_INITIAL_STATE;
      } else {
        trigger('fetch', components, locals);
      }
    });
  });

  render((
    <Provider store={store}>
      <Router history={browserHistory}>
        { routes }
      </Router>
    </Provider>
  ), document.getElementById('outlet'));
}

// Render function for static-site-generator-webpack-plugin
export default ({ path, assets, template }, callback) => {
  const store = createStore();
  const { dispatch } = store;

  const history = createMemoryHistory(path);

  match({ routes, history }, (error, redirectLocation, renderProps) => {
    const { components } = renderProps;
    const locals = { dispatch };

    trigger('fetch', components, locals).then(() => {
      const html = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      const state = JSON.stringify(store.getState());

      callback(null, template({ html, assets, state }));
    });
  });
};
