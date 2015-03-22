var React = require('react');
var Router = require('react-router');
var evaluate = require('eval');
var path = require('path');
var Promise = require('bluebird');

function ReactRouterToHtmlWebpackPlugin(srcRoutesPath, options) {
  this.srcRoutesPath = srcRoutesPath;
  this.urlPaths = options.paths;
}

ReactRouterToHtmlWebpackPlugin.prototype.apply = function(compiler) {
  var self = this;

  compiler.plugin('emit', function(compiler, done) {
    try {
      var asset = compiler.assets[self.srcRoutesPath];

      if (asset === undefined) {
        throw new Error('Soure file not found: "' + self.srcRoutesPath + '"');
      }

      var source = asset.source();
      var Routes = evaluate(source);

      // We don't need the source file anymore
      delete compiler.assets[self.srcRoutesPath];

      var promises = self.urlPaths.map(function(urlPath) {
        return new Promise(function(resolve, reject) {
          var outputFileName = path.join(urlPath, '/index.html');

          Router.run(Routes, urlPath, function(Handler) {
            var html = React.renderToString(React.createElement(Handler));
            compiler.assets[outputFileName] = createAssetFromContents(html);
            resolve();
          });
        });
      });

      Promise
        .all(promises)
        .nodeify(done);
    } catch (err) {
      done(err);
    }
  });
};

var createAssetFromContents = function(contents) {
  return {
    source: function() {
      return contents;
    },
    size: function() {
      return contents.length;
    }
  };
};

module.exports = ReactRouterToHtmlWebpackPlugin;
