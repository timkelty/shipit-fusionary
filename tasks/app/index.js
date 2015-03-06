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

  shipit.on('updated', function () {
    utils.runTask(gruntOrShipit, 'slack:deploy');
  });

};
