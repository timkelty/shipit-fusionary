# shipit-fusionary

A convenient way to require all [Shipit](https://github.com/shipitjs/shipit) tasks used at Fusionary.

## Install

```
npm install shipit-fusionary
```

## Usage

### Example `Gruntfile.js`
```
grunt.loadNpmTasks('shipit-fusionary/node_modules/grunt-shipit');
grunt.loadNpmTasks('shipit-fusionary/node_modules/shipit-deploy');
grunt.loadNpmTasks('shipit-fusionary/node_modules/shipit-shared');
grunt.loadNpmTasks('shipit-fusionary/node_modules/shipit-db');
grunt.loadNpmTasks('shipit-fusionary/node_modules/shipit-ssh');
grunt.loadNpmTasks('shipit-fusionary/node_modules/shipit-assets');
grunt.loadNpmTasks('shipit-fusionary');
```
