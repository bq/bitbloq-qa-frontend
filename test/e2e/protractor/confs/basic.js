'use strict';
/* A reference configuration file. */
/* For more options: https://github.com/angular/protractor/blob/master/docs/referenceConf.js */

var path = require('path');

exports.config = {

    // ---------------------------------------------------------------------------
    // ----- How to connect to Browser Drivers -----------------------------------
    // ---------------------------------------------------------------------------

    //seleniumArgs: ['--ignore-certificate-errors --standalone'],
    //seleniumArgs: ['--standalone --ignore-certificate-errors'],

    // ---------------------------------------------------------------------------
    // ----- How to set up browsers ----------------------------------------------
    // ---------------------------------------------------------------------------

    // For a full list of available capabilities, see
    // https://code.google.com/p/selenium/wiki/DesiredCapabilities
    // and
    // https: //code.google.com/p/selenium/source/browse/javascript/webdriver/capabilities.js

    multiCapabilities: [{
        browserName: 'chrome',
        name: '[bitbloq-app] Linux-chrome-43',
        recordVideo: false,
        recordScreenshots: false,
        //  specs: require('../testsuites/common.js'),
        shardTestFiles: true,
        maxInstances: 4,
        chromeOptions: {
            // How to set browser language (menus & so on)
            //args: ['lang=fr-FR'],
            //args: ['--no-sandbox'], //Only on jenkins
            prefs: {
                // Set other language in navigator
                // intl: {
                //     accept_languages: 'fr-FR'
                // },
                download: {
                    'prompt_for_download': false,
                    'directory_upgrade': true,
                    'default_directory': './target'
                }

            }
        }
    }],

    suites: require(path.resolve() + '/test/e2e/protractor/confs/suite.json'),

    // /*
    //  * Can be used to specify the phantomjs binary path.
    //  * This can generally be ommitted if you installed phantomjs globally.
    //  */

    //'phantomjs.binary.path': require('phantomjs').path,

    // /*
    //  * Command line args to pass to ghostdriver, phantomjs's browser driver.
    //  * See https://github.com/detro/ghostdriver#faq
    //  */
    // 'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG']
    //    },

    // ---------------------------------------------------------------------------
    // ----- Global test information ---------------------------------------------
    // ---------------------------------------------------------------------------

    // A base URL for your application under test. Calls to protractor.get()
    // with relative paths will be prepended with this.

    //It is not necesary, baseUrl argument pass by grunt task

    //baseUrl: 'http://localhost:9000',

    // Selector for the element housing the angular app - this defaults to
    // body, but is necessary if ng-app is on a descendant of <body>
    rootElement: 'body',

    // The timeout in milliseconds for each script run on the browser. This should
    // be longer than the maximum time your application needs to stabilize between
    // tasks.
    allScriptsTimeout: 11000,

    // How long to wait for a page to load.
    getPageTimeout: 10000,

    // If set, protractor will save the test output in json format at this path.
    // The path is relative to the location of this config.
    resultJsonOutputFile: 'target/report/resultTest.json',

    // ---------------------------------------------------------------------------
    // ----- The test framework --------------------------------------------------
    // ---------------------------------------------------------------------------

    framework: 'jasmine2',
    jasmineNodeOpts: {
        isVerbose: true,
        includeStackTrace: true,
        showColors: true,
        defaultTimeoutInterval: 3000000,
        print: function() {}
    },

    onPrepare: function() {
        var SpecReporter = require('jasmine-spec-reporter');
        // add jasmine spec reporter
        jasmine.getEnv().addReporter(new SpecReporter({
            displayStacktrace: true
        }));
    }

};
