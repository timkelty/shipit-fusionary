module.exports = function (grunt) {
  require('./slack')(grunt);
  require('./app')(grunt);
};
