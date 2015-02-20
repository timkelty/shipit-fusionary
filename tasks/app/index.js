var utils = require('shipit-utils');

module.exports = function (gruntOrShipit) {
  utils.registerTask(gruntOrShipit, 'app:pull', [
    'assets:pull',
    'db:pull',
  ]);

  utils.registerTask(gruntOrShipit, 'app:push', [
    'assets:push',
    'db:push',
  ]);

};
