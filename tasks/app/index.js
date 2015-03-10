var utils = require('shipit-utils');

module.exports = function (gruntOrShipit) {
  var shipit = utils.getShipit(gruntOrShipit);

  utils.registerTask(gruntOrShipit, 'app:pull', [
    'assets:pull',
    'db:pull',
  ]);

  utils.registerTask(gruntOrShipit, 'app:push', [
    'assets:push',
    'db:push',
  ]);

  // Needs to be on updated, so we can still compare revisions
  shipit.on('updated', function () {
    utils.runTask(gruntOrShipit, 'slack:deploy');
  });

};
