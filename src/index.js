import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { createHistory, createMemoryHistory } from 'history';
import { Router, RoutingContext, match } from 'react-router';
import { Provider } from 'react-redux';

import createStore from './store/createStore';
import routes from './routes';

// Client render
if (typeof document !== 'undefined') {
  const history = createHistory();

  const store = createStore(window.REDUX_INITIAL_STATE);

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
  const history = createMemoryHistory();
  const location = history.createLocation(path);

  const store = createStore();

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    const html = ReactDOMServer.renderToString(
      <Provider store={store}>
        <RoutingContext {...renderProps} />
      </Provider>
    );

    const state = JSON.stringify(store.getState());

    callback(null, template({
      html,
      assets,
      state
    }));
  });
};
