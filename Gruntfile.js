'use strict';
/*jshint camelcase: false */
/* jshint loopfunc: true */

module.exports = function(grunt) {

    var path = require('path'),
        async = require('async');

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
        // Empties folders to start fresh
        clean: {
            target: 'target/*'
        },

        protractor_webdriver: {
            //if is need update, better upgrade manual, no stop grunt task
            e2eUpdate: {
                options: {
                    command: 'webdriver-manager update --standalone'
                }
            },
            e2eStart: {
                options: {
                    command: 'webdriver-manager start --standalone'
                }
            }
        },

        protractor: {
            options: { // Default config file
                configFile: path.resolve() + '/test/e2e/protractor/confs/basic.js', // Default config file
                keepAlive: false, // If false, the grunt process stops when the test fails.
                noColor: true, // If true, protractor will not use colors in its output.
                webdriverManagerUpdate: true,
                includeStackTrace: true
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
            alllocal: {
                options: {
                    configFile: path.resolve() + '/test/e2e/protractor/confs/all_local.js',
                    args: {
                        baseUrl: grunt.option('target') || 'http://localhost:9000/',
                        seleniumAddress: 'http://localhost:4444/wd/hub'
                    }
                }
            },
            firefox: {
                options: {
                    configFile: path.resolve() + '/test/e2e/protractor/confs/basic_firefox.js',
                    args: {
                        baseUrl: grunt.option('target') || 'http://localhost:9000/',
                        seleniumAddress: 'http://localhost:4444/wd/hub',
                        suite: 'unsupportedDesktop'
                    }
                }
            },
            mac: {
                options: {
                    args: {
                        baseUrl: grunt.option('target'),
                        seleniumAddress: 'http://172.16.30.18:4444/wd/hub'
                    }
                }
            },
            win32: {
                options: {
                    args: {
                        baseUrl: grunt.option('target'),
                        seleniumAddress: 'http://172.16.30.26:4444/wd/hub'
                    }
                }
            },
            win64: {
                options: {
                    args: {
                        baseUrl: grunt.option('target'),
                        seleniumAddress: 'http://172.16.30.23:4444/wd/hub'
                    }
                }
            },
            linux32: {
                options: {
                    args: {
                        baseUrl: grunt.option('target'),
                        seleniumAddress: 'http://172.16.30.25:4444/wd/hub'
                    }
                }
            },
            integration: {
                options: {
                    configFile: path.resolve() + '/test/e2e/protractor/confs/basic_environment.js',
                    args: {
                        baseUrl: 'http://int-bitbloq.com.s3-website-eu-west-1.amazonaws.com/',
                        seleniumAddress: 'http://localhost:4444/wd/hub'
                    }
                }
            },
            qa: {
                options: {
                    configFile: path.resolve() + '/test/e2e/protractor/confs/basic_environment.js',
                    args: {
                        baseUrl: 'http://qa-bitbloq.com.s3-website-eu-west-1.amazonaws.com/',
                        seleniumAddress: 'http://localhost:4444/wd/hub'
                    }
                }
            },
            next: {
                options: {
                    configFile: path.resolve() + '/test/e2e/protractor/confs/basic_environment.js',
                    args: {
                        baseUrl: 'http://next-bitbloq.com.s3-website-eu-west-1.amazonaws.com/',
                        seleniumAddress: 'http://localhost:4444/wd/hub'
                    }
                }
            },
            mvp: {
                options: {
                    configFile: path.resolve() + '/test/e2e/protractor/confs/basic_environment.js',
                    args: {
                        baseUrl: 'http://mvp-bitbloq.bq.com/',
                        seleniumAddress: 'http://localhost:4444/wd/hub'
                    }
                }
            },
            staging: {
                options: {
                    configFile: path.resolve() + '/test/e2e/protractor/confs/basic_environment.js',
                    args: {
                        baseUrl: 'http://staging-bitbloq.com.s3-website-eu-west-1.amazonaws.com/',
                        seleniumAddress: 'http://localhost:4444/wd/hub'
                    }
                }
            },
            saucelabs_integration: {
                options: {
                    configFile: path.resolve() + '/test/e2e/protractor/confs/basic_saucelabs.js',
                    args: {
                        baseUrl: 'http://int-bitbloq.com.s3-website-eu-west-1.amazonaws.com/'
                    }
                }
            },
            saucelabs_qa: {
                options: {
                    configFile: path.resolve() + '/test/e2e/protractor/confs/basic_saucelabs.js',
                    args: {
                        baseUrl: 'http://qa-bitbloq.com.s3-website-eu-west-1.amazonaws.com/'
                    }
                }
            },
            saucelabs_mvp: {
                options: {
                    configFile: path.resolve() + '/test/e2e/protractor/confs/basic_saucelabs.js',
                    args: {
                        baseUrl: 'http://mvp-bitbloq.bq.com/'
                    }
                }
            },
            saucelabs_next: {
                options: {
                    configFile: path.resolve() + '/test/e2e/protractor/confs/basic_saucelabs.js',
                    args: {
                        baseUrl: 'http://next-bitbloq.com.s3-website-eu-west-1.amazonaws.com/'
                    }
                }
            },
            saucelabs_staging: {
                options: {
                    configFile: path.resolve() + '/test/e2e/protractor/confs/basic_saucelabs.js',
                    args: {
                        baseUrl: 'http://staging-bitbloq.com.s3-website-eu-west-1.amazonaws.com/'
                    }
                }
            },
            saucelabs_integration_all: {
                options: {
                    configFile: path.resolve() + '/test/e2e/protractor/confs/allOS_saucelabs.js',
                    args: {
                        baseUrl: 'http://int-bitbloq.com.s3-website-eu-west-1.amazonaws.com/'
                    }
                }
            },
            saucelabs_qa_all: {
                options: {
                    configFile: path.resolve() + '/test/e2e/protractor/confs/allOS_saucelabs.js',
                    args: {
                        baseUrl: 'http://qa-bitbloq.com.s3-website-eu-west-1.amazonaws.com/'
                    }
                }
            },
            saucelabs_next_all: {
                options: {
                    configFile: path.resolve() + '/test/e2e/protractor/confs/allOS_saucelabs.js',
                    args: {
                        baseUrl: 'http://next-bitbloq.com.s3-website-eu-west-1.amazonaws.com/'
                    }
                }
            },
            saucelabs_staging_all: {
                options: {
                    configFile: path.resolve() + '/test/e2e/protractor/confs/allOS_saucelabs.js',
                    args: {
                        baseUrl: 'http://staging-bitbloq.com.s3-website-eu-west-1.amazonaws.com/'
                    }
                }
            },
            saucelabs_mvp_all: {
                options: {
                    configFile: path.resolve() + '/test/e2e/protractor/confs/allOS_saucelabs.js',
                    args: {
                        baseUrl: 'http://mvp-bitbloq.bq.com/'
                    }
                }
            }
        }, //Protractor config task

        release: {
            /* For more options: https://github.com/geddski/grunt-release#options */
            options: {
                indentation: '\t', //default: '  ' (two spaces)
                commitMessage: 'Release v<%= version %>', //default: 'release <%= version %>'
                tagMessage: 'v<%= version %>', //default: 'Version <%= version %>',
                tagName: 'v<%= version %>'
            }
        }

    });

    grunt.registerTask('default', ['jshint']);

    grunt.registerTask('deletetarget', 'Delete target folder by reports and downloads tmp', ['clean:target']);

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
            tasks.push('clean:target');
            tasks.push('protractor_webdriver:e2eStart');
            tasks.push('protractor:' + env);
        }

        grunt.task.run(tasks);

    });

    grunt.registerTask('jsonbitbloq1', 'Generate json of id testCase on bitbloq1', function() {
        // Force task into async mode and grab a handle to the "done" function.
        var done = this.async();

        //Connecto testlink
        var TestlinkConnect = require('testlink-connect'),
            fs = require('fs'),
            testlinkConnect = new TestlinkConnect('8b4c278f1df8e4059f894acadf9932bb', 'http://testlink.bq.local/lib/api/xmlrpc/v1/xmlrpc.php');

        //Obj result
        var PlanID = {
            testplanid: 29714,
        };

        testlinkConnect.getTestCasesForTestPlan(PlanID, function(obj) {

            var testCaseObjArray = {
                test: []
            };

            for (var i in obj.struct) {

                for (var j in obj.struct[i]) {
                    //console.log(obj.struct[i][j].platform_name);
                    if (obj.struct[i][j].platform_name === 'Windows 7' && obj.struct[i][j].execution_type === '2') {
                        //console.log(obj.struct[i][j].full_external_id);
                        var testCaseObj = {
                            'description': '',
                            'assertions': [{
                                'passed': 'true'
                            }]
                        };
                        testCaseObj.description = obj.struct[i][j].full_external_id + ':';

                        testCaseObjArray.test.push(testCaseObj);
                    }
                }
            }

            fs.writeFile('./target/bitbloq.json', JSON.stringify(testCaseObjArray.test), function(err) {
                if (err) {
                    throw err;
                }
                console.log('It\'s saved!');
                done();
            });

        });

    });

    // Save resulttest bitbloq 1 on testlink:
    // 1) grunt jsonbitbloq1
    // 2) grunt testlink --build=$idBuild --old=true  (only necessary indicate --build and old=true )
    grunt.registerTask('testlink', 'Testlink report dump', function() {

        var planID = grunt.option('plan') || '29389', // by default ALLTEST Plan Management
            buildID = grunt.option('build') || '1104', // by default 2.0.7 en Next - Corbel 1.22.0
            user = grunt.option('user') || 'luisangonzalez',
            platform = grunt.option('platform') || 'Ubuntu 14.04 LTS',
            proxy = grunt.option('proxy'),
            proxyValues,
            old = grunt.option('old'); // old opions is report dump BITBLOQ 1

        if (proxy) {
            proxyValues = {
                host: 'proxy-bq.sxinfrastructure.com',
                port: '3128'
            };
        }

        // console for debug xml--> /node_modules/testlink-connect/lib/testlinkapi.js:

        // Force task into async mode and grab a handle to the "done" function.
        var done = this.async();

        //Connecto testlink
        var TestlinkConnect = require('testlink-connect-proxy'),
            fs = require('fs'),
            testlinkConnect = new TestlinkConnect('8b4c278f1df8e4059f894acadf9932bb', 'http://testlink.bq.local/lib/api/xmlrpc/v1/xmlrpc.php'),
            file = './target/report/resultTest.json';

        if (old) {
            file = './target/bitbloq.json';
            platform = 'Windows 7';
            planID = '29714';
            //grunt.task.run('oldbitbloqtest');
        }

        //Red json result test && reprotTCResult
        var obj, passedArray = [];

        //Obj result
        var Passed = function() {
            return {
                user: user,
                testplanid: planID,
                buildid: buildID,
                testcaseexternalid: '',
                notes: '',
                status: 'p',
                platformname: platform, // To check name and id --> getTestCasesForTestPlan
                platform_id: 4,
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
                    if (obj[i].assertions[0].passed && obj[i].duration > 100) {
                        passedItem.status = 'p';
                    } else if (!obj[i].assertions[0].passed && obj[i].duration > 100) {
                        passedItem.status = 'f';
                    }
                    /* if is necessary bloqed test xit
                                         else if (obj[i].duration < 100) {
                                           passedItem.status = 'b';
                                       }*/
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
            }, proxyValues);
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
