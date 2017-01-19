var path = require('path');
var pkg = require('../package.json');

var ghpages = require('gh-pages');

var repoUrl = process.env.GH_TOKEN ?
  pkg.repository.url.replace(/^https?:\/\//, 'http://' + process.env.GH_TOKEN + '@') :
  pkg.repository.url;

ghpages.publish(path.join(__dirname, 'dist'), {
  repo: repoUrl,
  logger: console.log.bind(console)
}, function() {
  console.log('Deployment complete!');
});
