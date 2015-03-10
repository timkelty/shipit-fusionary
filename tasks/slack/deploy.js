var utils = require('shipit-utils');
var Promise = require('bluebird');
var chalk = require('chalk');
var _ = require('lodash');
var deployInit = require('shipit-deploy/lib/init');

module.exports = function (gruntOrShipit) {
  var task = function task(argument) {
    var shipit = deployInit(utils.getShipit(gruntOrShipit));

    if (!shipit.config.slack || !shipit.config.slack.webhookUrl) {
      shipit.log(chalk.yellow('Slack notification not sent: shipit.config.slack.webhookUrl not found.'));
      return;
    }

    var slack = Promise.promisifyAll(require('slack-notify')(shipit.config.slack.webhookUrl));
    var gitConfig = Promise.promisify(require('git-config'));

    return gitConfig().then(function(gitConfig) {
      return shipit.getPendingCommits().then(function(commits) {
        var message = _.merge({
          username: 'Shipit Squirrel',
          icon_emoji: ':shipit:',
          fields: {
            "Application": shipit.config.name,
            "Environment": shipit.environment,
            "Server": shipit.config.servers,
            "Branch": shipit.config.branch,
            "Deployed by": gitConfig.user.name,
            "Commits": commits ? commits : 'None'
          }
        }, shipit.config.slack.message || {});

        return slack.sendAsync(message).then(function() {
          shipit.log(chalk.green('Slack notification sent.'));
        });
      });
    });
  };

  utils.registerTask(gruntOrShipit, 'slack:deploy', task);
};
