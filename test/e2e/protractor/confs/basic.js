'use strict';
/* A reference configuration file. */
/* For more options: https://github.com/angular/protractor/blob/master/docs/referenceConf.js */

exports.config = {

    // ---------------------------------------------------------------------------
    // ----- How to connect to Browser Drivers -----------------------------------
    // ---------------------------------------------------------------------------

    //seleniumArgs: ['--ignore-certificate-errors --standalone'],
    seleniumArgs: ['--standalone --ignore-certificate-errors'],

    // ---------------------------------------------------------------------------
    // ----- How to set up browsers ----------------------------------------------
    // ---------------------------------------------------------------------------

    // For a full list of available capabilities, see
    // https://code.google.com/p/selenium/wiki/DesiredCapabilities
    // and
    // https: //code.google.com/p/selenium/source/browse/javascript/webdriver/capabilities.js

    multiCapabilities: [{
        browserName: 'chrome',
        version: '43.0',
        name: '[bitbloq-app] Linux-chrome-43',
        recordVideo: false,
        recordScreenshots: false,
        //  specs: require('../testsuites/common.js'),
        shardTestFiles: true,
        maxInstances: 4,
        chromeOptions: {
            prefs: {
                download: {
                    'prompt_for_download': false,
                    'directory_upgrade': true,
                    'default_directory': './target'
                }
            }
        }
    }],

    suites: {
        account: '../tests/account/account.spec.js',
        bloqs: '../tests/bloqs/bloqs.spec.js',
        bloqsproject: '../tests/bloqsproject/make.spec.js',
        bloqsprojectHardware: '../tests/bloqsproject/hwtab/hwtab.spec.js',
        bloqsprojectInfo: '../tests/bloqsproject/infotab/infotab.spec.js',
        bloqsprojectMakeActions: '../tests/bloqsproject/makeActions/makeActions.spec.js',
        bloqsprojectMakeActionsEdit: '../tests/bloqsproject/makeActions/edit/makeActionsEdit.spec.js',
        bloqsprojectMakeActionsFile: '../tests/bloqsproject/makeActions/file/makeActionsFile.spec.js',
        bloqsprojectMakeActionsHelp: '../tests/bloqsproject/makeActions/help/makeActionsHelp.spec.js',
        bloqsprojectMakeActionsShare: '../tests/bloqsproject/makeActions/share/makeActionsShare.spec.js',
        bloqsprojectWalkthrough: '../tests/bloqsproject/walkthrough/walkthrough.spec.js',
        codeProject: '../tests/codeproject/codeproject.spec.js',
        cookiesBar: '../tests/cookiesBar/cookiesBar.spec.js',
        dragAndDrop: '../tests/dragAndDrop/dragAndDrop.spec.js',
        explore: '../tests/explore/explore.spec.js',
        exploreProject: '../tests/explore/project.spec.js',
        header: '../tests/header/header.spec.js',
        help: '../tests/help/*.spec.js',
        helpChangelog: '../tests/help/changelog/changelog.spec.js',
        helpFaq: '../tests/help/faq/faq.spec.js',
        helpTutorial: '../tests/help/tutorial/tutorial.spec.js',
        login: '../tests/login/login.spec.js',
        modalsChangeProjectName: '../tests/modals/changeProjectName/changeProjectName.spec.js',
        MyProjects: '../tests/projects/myprojects/myprojects.spec.js',
        register: '../tests/register/register.spec.js'

    },

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
