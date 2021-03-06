/*
 * grunt-css-styler
 * https://github.com/vmol/grunt-css-styler.git
 *
 * Copyright (c) 2017 Víctor Molero Martín
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporterOutput:''
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    cssstyler: {
      default_options:{
        options:{
          test:true
        },
        files:{
          'test/fixtures/default.html':[ 'test/fixtures/style-a.css','test/fixtures/style-b.css']
        }
      },
      custom_options:{
        options:{
          startTag:"@section('inline-css')",
          endTag:'@stop',
          test:true
        },
        files:{
          'test/fixtures/custom.blade.php':[ 'test/fixtures/style-a.css','test/fixtures/style-b.css']
        }
      },
      custom_multiple:{
        options:{
          startTag:"@section('inline-css')",
          endTag:'@stop',
          test:true
        },
        files:{
          'test/fixtures/custom-multiple.blade.php':[ 'test/fixtures/style-a.css','test/fixtures/style-b.css']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'cssstyler', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
