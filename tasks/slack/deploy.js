var utils = require('shipit-utils');
var Promise = require('bluebird');
var chalk = require('chalk');

/**
 * Create required directories for linked files and dirs.
 * - shared:create-dirs
 */

module.exports = function (gruntOrShipit) {
  var task = function task(argument) {
    var shipit = utils.getShipit(gruntOrShipit);

    if (!shipit.config.slack || !shipit.config.slack.webhookUrl) {
      shipit.log(chalk.red('Slack notification not sent: shipit.config.slack.webhookUrl not found.'));
      return;
    }

    var slack = Promise.promisifyAll(require('slack-notify')(shipit.config.slack.webhookUrl));
    var gitConfig = Promise.promisify(require('git-config'));

    return gitConfig().then(function(gitConfig) {
      return slack.sendAsync({
        username: 'Shipit Squirrel',
        text: shipit.config.name,
        icon_emoji: ':shipit:',
        fields: {
          "Environment": shipit.environment,
          "Server": shipit.config.servers,
          "Branch": shipit.config.branch,
          "Deployed by": gitConfig.user.name,
        }
      }).then(function() {
        shipit.log(chalk.green('Slack notification sent.'));
      });
    });
  };

  utils.registerTask(gruntOrShipit, 'slack:deploy', task);
};
