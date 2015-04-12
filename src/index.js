import React from 'react';
import Router from 'react-router';

import Routes from './routes';

// Client render
if (typeof document !== 'undefined') {
  Router.run(Routes, Router.HistoryLocation, function(Handler) {
    React.render(<Handler />, document.getElementById('outlet'));
  });
}

// Render function for prerender-webpack-plugin
export default function(locals, callback) {
  Router.run(Routes, locals.path, function(Handler) {
    callback(null, locals.template({
      html: React.renderToString(<Handler />),
      assets: locals.assets
    }));
  });
};
