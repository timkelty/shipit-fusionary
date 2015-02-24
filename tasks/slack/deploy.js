var utils = require('shipit-utils');
var Promise = require('bluebird');
var chalk = require('chalk');

/**
 * Create required directories for linked files and dirs.
 * - shared:create-dirs
 */

module.exports = function (gruntOrShipit) {
  function task() {
    var shipit = utils.getShipit(gruntOrShipit);
    var slack = Promise.promisifyAll(require('slack-notify')(shipit.config.slack.webhookUrl));

    // return shipit.local('git log --pretty=format:\"%h: %s -- %an\" #{from}..').then(function(response) {
    //   console.log(response);
    // });
    return slack.sendAsync({
      user: 'Squirrel',
      icon_emoji: ':shipit:',
      fields: {
        "Application": shipit.config.name,
        "Environment": shipit.environment,
        "Branch": shipit.config.branch,
        "Deployed by": '...',
      }
    }).then(function() {
      shipit.log(chalk.green('Slack notification sent.'));
    });

  }

  utils.registerTask(gruntOrShipit, 'slack:deploy', task);
};
