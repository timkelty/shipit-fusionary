module.exports = function (shipit) {
  require('./tasks/slack')(shipit);
  require('./tasks/app')(shipit);
};
