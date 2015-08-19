var utils = require('shipit-utils');
var Promise = require('bluebird');
var chalk = require('chalk');
var _ = require('lodash');
var deployInit = require('shipit-deploy/lib/init');

module.exports = function (gruntOrShipit) {
  var task = function task(argument) {
    var shipit = deployInit(utils.getShipit(gruntOrShipit));
    var slack = Promise.promisifyAll(require('slack-notify')(shipit.config.slack.webhookUrl));
    var gitConfig = Promise.promisify(require('git-config'));

    var showErr = function errMsg(err) {
      return shipit.log(chalk.red('Slack notification error: ' + err));
    }

    var send = function send(commits) {
      var servers = Array.isArray(shipit.config.servers) ? shipit.config.servers.join(', ') : shipit.config.servers;
      var message = _.merge({
        username: 'Shipit Squirrel',
        icon_emoji: ':shipit:',
        fields: _.pick({
          "Application": shipit.config.name || null,
          "Environment": shipit.environment,
          "Server": servers,
          "Branch": shipit.config.branch,
          "Deployed by": shipit.user,
          "Commits": commits ? commits : 'None'
        }, _.identity)
      }, shipit.config.slack.message || {});

      return slack.sendAsync(message)
      .then(function() {
        shipit.log(chalk.green('Slack notification sent.'));
      });
    };

    var userInfo = function() {
      return gitConfig()
      .then(function(config) {
        shipit.user = config.user.name || config.user.email || null;
      });
    }

    if (!shipit.config.slack || !shipit.config.slack.webhookUrl) {
      return shipit.log(chalk.dim('Slack notification not sent: shipit.config.slack.webhookUrl not found.'));
    }

    return userInfo()
    .then(shipit.getPendingCommits.bind(shipit))
    .then(send)
    .catch(showErr);
  };

  utils.registerTask(gruntOrShipit, 'slack:deploy', task);
};
