'use strict';
/*jshint camelcase: false */

module.exports = function(grunt) {

  var path = require('path');
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          'test/e2e/protractor/**/*.js'
        ]
      }
    },

    protractor_webdriver: {

      e2eStart: {
        options: {
          path: path.resolve() + '/node_modules/protractor/bin/',
          command: 'webdriver-manager start --standalone'

        }
      }
    },

    protractor: {
      options: { // Default config file
        configFile: path.resolve() + '/test/e2e/protractor/confs/basic.js', // Default config file
        keepAlive: false, // If false, the grunt process stops when the test fails.
        noColor: true // If true, protractor will not use colors in its output.
      },
      local: {
        options: {
          configFile: path.resolve() + '/test/e2e/protractor/confs/basic_local.js',
          args: {
            baseUrl: grunt.option('target') || 'http://localhost:9000/',
            seleniumAddress: 'http://localhost:4444/wd/hub'
          }
        }
      },
      integration: {
        options: {
          configFile: path.resolve() + '/test/e2e/protractor/confs/basic_local.js',
          args: {
            baseUrl: 'http://int-bitbloq.com.s3-website-eu-west-1.amazonaws.com/',
            seleniumAddress: 'http://localhost:4444/wd/hub'
          }
        }
      },
      qa: {
        options: {
          configFile: path.resolve() + '/test/e2e/protractor/confs/basic_local.js',
          args: {
            baseUrl: 'http://qa-bitbloq.com.s3-website-eu-west-1.amazonaws.com/',
            seleniumAddress: 'http://localhost:4444/wd/hub'
          }
        }
      },
      mvp: {
        options: {
          configFile: path.resolve() + '/test/e2e/protractor/confs/basic_local.js',
          args: {
            baseUrl: 'http://mvp-bitbloq.bq.com/',
            seleniumAddress: 'http://localhost:4444/wd/hub'
          }
        }
      },
      staging: {
        options: {
          configFile: path.resolve() + '/test/e2e/protractor/confs/basic_local.js',
          args: {
            baseUrl: 'http://staging-bitbloq.com.s3-website-eu-west-1.amazonaws.com/',
            seleniumAddress: 'http://localhost:4444/wd/hub'
          }
        }
      },
      saucelabs_integration: {
        options: {
          configFile: path.resolve() + '/test/e2e/protractor/confsf/basic_saucelabs.js',
          args: {
            baseUrl: 'http://int-bitbloq.com.s3-website-eu-west-1.amazonaws.com/'
          }
        }
      },
      saucelabs_qa: {
        options: {
          configFile: path.resolve() + '/test/e2e/protractor/confsf/basic_saucelabs.js',
          args: {
            baseUrl: 'http://qa-bitbloq.com.s3-website-eu-west-1.amazonaws.com/'
          }
        }
      },
      saucelabs_mvp: {
        options: {
          configFile: path.resolve() + '/test/e2e/protractor/confsf/basic_saucelabs.js',
          args: {
            baseUrl: 'http://mvp-bitbloq.bq.com/'
          }
        }
      },
      saucelabs_integration_all: {
        options: {
          configFile: path.resolve() + '/test/e2e/protractor/confsf/allOS_saucelabs.js',
          args: {
            baseUrl: 'http://int-bitbloq.com.s3-website-eu-west-1.amazonaws.com/'
          }
        }
      },
      saucelabs_qa_all: {
        options: {
          configFile: path.resolve() + '/test/e2e/protractor/confsf/allOS_saucelabs.js',
          args: {
            baseUrl: 'http://qa-bitbloq.com.s3-website-eu-west-1.amazonaws.com/'
          }
        }
      },
      saucelabs_mvp_all: {
        options: {
          configFile: path.resolve() + '/test/e2e/protractor/confsf/allOS_saucelabs.js',
          args: {
            baseUrl: 'http://mvp-bitbloq.bq.com/'
          }
        }
      }
    }


  });

  grunt.registerTask('default', ['jshint']);

  grunt.registerTask('test', 'Protractor e2e funcional test (Selenium) task.', function(env) {
    //remember send --saucelabs=true --all or --all argument will be lost
    var saucelabs = grunt.option('saucelabs'),
      all = grunt.option('all'),
      tasks = ['jshint'];

    env = env || 'local';

    if (saucelabs) {
      if (env === 'local') {
        grunt.fatal('we can send ' + env + ' to SauceLabs');
      } else {
        console.log('all=' + all);
        console.log('saucelabs=' + saucelabs);
        if (all) {

          tasks.push('protractor:saucelabs_' + env + '_all');
        } else {
          tasks.push('protractor:saucelabs_' + env);
        }

      }
    } else {
      tasks.push('protractor_webdriver:e2eStart');
      tasks.push('protractor:' + env);
    }

    grunt.task.run(tasks);

  });



};
