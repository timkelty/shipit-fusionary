module.exports = function (shipit) {
  require('shipit-deploy')(shipit);
  require('shipit-shared')(shipit);
  require('shipit-db')(shipit);
  require('shipit-assets')(shipit);
  require('shipit-ssh')(shipit);
  require('./tasks/slack')(shipit);
  require('./tasks/app')(shipit);
};
