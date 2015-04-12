var evaluate = require('eval');
var path = require('path');
var Promise = require('bluebird');

function EvalWebpackPlugin(renderSourcePath, path) {
  this.renderSourcePath = renderSourcePath;
  this.path = path;
}

EvalWebpackPlugin.prototype.apply = function(compiler) {
  var self = this;

  compiler.plugin('emit', function(compiler, done) {
    try {
      var asset = compiler.assets[self.renderSourcePath];

      if (asset === undefined) {
        throw new Error('Soure file not found: "' + self.renderSourcePath + '"');
      }

      var source = asset.source();
      var render = evaluate(source, /* filename: */ undefined, /* scope: */ undefined, /* noGlobals: */ true);

      var outputFileName = path.join(self.path, '/index.html');

      var renderThunk = render.bind(null, {
        path: self.path,
        assets: getAssetsFromCompiler(compiler)
      });

      var renderPromise = Promise.fromNode(renderThunk)
        .then(function(output) {
          compiler.assets[outputFileName] = createAssetFromContents(output);
        })
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

module.exports = EvalWebpackPlugin;
