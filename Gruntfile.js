'use strict';
/*jshint camelcase: false */
/* jshint loopfunc: true */

module.exports = function(grunt) {

    var path = require('path');
    var async = require('async');
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
            next: {
                options: {
                    configFile: path.resolve() + '/test/e2e/protractor/confs/basic_local.js',
                    args: {
                        baseUrl: 'http://next-bitbloq.com.s3-website-eu-west-1.amazonaws.com/',
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

    grunt.registerTask('testlink', 'Testlink report dump', function() {

        // Force task into async mode and grab a handle to the "done" function.
        var done = this.async();

        //Connecto testlink
        var TestlinkConnect = require('testlink-connect'),
            fs = require('fs'),
            testlinkConnect = new TestlinkConnect('8b4c278f1df8e4059f894acadf9932bb', 'http://testlink.mundoreader.local/lib/api/xmlrpc/v1/xmlrpc.php'),
            file = './target/e2e/protractor/resultTest.json';

        //Configuration API
        var testlinkTestPlanID = '28822',
            testlinkBuildID = '921',
            testlinkUser = 'luisangonzalez';

        //Red json result test && reprotTCResult
        var obj, passedArray = [];

        //Obj result
        var Passed = function() {
            return {
                user: testlinkUser,
                testplanid: testlinkTestPlanID,
                buildid: testlinkBuildID,
                testcaseexternalid: '',
                notes: '',
                status: 'p',
                overwrite: true
            };
        };

        function readFile(callback) {
            fs.readFile(file, 'utf8', function(err, data) {
                grunt.log.writeln('Processing report file...');
                if (err) {
                    throw err;
                }
                obj = JSON.parse(data);

                for (var i in obj) {
                    var passedItem = new Passed();
                    var test = obj[i].description.split(':');
                    passedItem.testcaseexternalid = test[0];
                    if (obj[i].assertions[0].passed) {
                        passedItem.status = 'p';
                    } else {
                        passedItem.status = 'f';
                    }
                    passedArray.push(passedItem);
                }
                callback();
            });
        }

        function reporter(value, callback) {
            //http://chaitanyaqa.github.io/testlink-api-client/classes/TestLinkApi.html#method_reportTCResult
            testlinkConnect.reportTCResult(value, function() {
                grunt.log.ok('report sent: ', value);
                callback();
            });
        }

        async.waterfall([
            function(callback) {
                readFile(callback);
            },
            function(callback) {
                async.map(passedArray, reporter, function(err) {
                    if (err) {
                        console.error(err);
                    } else {
                        grunt.log.ok('All reports sent');
                    }
                    callback();
                });
            }
        ], function(err) {
            if (err) {
                console.error(err);
            }
            done();
        });

    });


};
