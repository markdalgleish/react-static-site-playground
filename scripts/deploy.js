var path = require('path');
var pkg = require('../package.json');

var ghpages = require('gh-pages');

var repoUrl = process.env.GH_TOKEN ?
  pkg.repository.url.replace(/^https?:\/\//, 'http://' + process.env.GH_TOKEN + '@') :
  pkg.repository.url;

ghpages.publish(path.join(__dirname, '../dist'), {
  repo: repoUrl,
  logger: function(message) {
    if (process.env.GH_TOKEN) {
      message = message.replace(new RegExp(process.env.GH_TOKEN, 'g'), '[GH_TOKEN]');
    }

    console.log(message);
  }
}, function() {
  console.log('Deployment complete!');
});
