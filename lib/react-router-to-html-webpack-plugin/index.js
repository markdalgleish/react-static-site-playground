var React = require('react');
var Router = require('react-router');
var evaluate = require('eval');
var path = require('path');

function ReactRouterToHtmlWebpackPlugin(srcRoutesPath, paths) {
  this.srcRoutesPath = srcRoutesPath;
  this.paths = paths;
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
      var outputFileName = path.join(self.paths[0], '/index.html');

      Router.run(Routes, self.paths[0], function(Handler) {
        var html = React.renderToString(React.createElement(Handler));
        compiler.assets[outputFileName] = createAssetFromContents(html);
        done()
      });
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
