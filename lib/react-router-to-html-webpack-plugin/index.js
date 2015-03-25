var React = require('react');
var Router = require('react-router');
var evaluate = require('eval');
var path = require('path');
var Promise = require('bluebird');

function ReactRouterToHtmlWebpackPlugin(srcRoutesPath, options) {
  this.srcRoutesPath = srcRoutesPath;
  this.urlPaths = options.paths;
  this.template = options.template;
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

            var template = self.template;

            if (template != null && typeof template !== 'function') {
              throw new Error('Template must be a function');
            }

            var output = typeof template === 'function' ?
              template({
                html: html,
                assets: getAssetsFromCompiler(compiler)
              }) :
              html;

            compiler.assets[outputFileName] = createAssetFromContents(output);
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

// Shamelessly stolen from html-webpack-plugin - Thanks @ampedandwired :)
var getAssetsFromCompiler = function(compiler) {
  var assets = {};
  var webpackStatsJson = compiler.getStats().toJson();
  for (var chunk in webpackStatsJson.assetsByChunkName) {
    var chunkValue = webpackStatsJson.assetsByChunkName[chunk];

    // Webpack outputs an array for each chunk when using sourcemaps
    if (chunkValue instanceof Array) {
      // Is the main bundle always the first element?
      chunkValue = chunkValue[0];
    }

    if (compiler.options.output.publicPath) {
      chunkValue = compiler.options.output.publicPath + chunkValue;
    }
    assets[chunk] = chunkValue;
  }

  return assets;
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
