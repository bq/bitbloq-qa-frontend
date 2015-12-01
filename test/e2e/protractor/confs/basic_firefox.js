'use strict';

/* A reference configuration file. */
/* For more options: https://github.com/angular/protractor/blob/master/docs/referenceConf.js */

var protractorConfig = require('./basic');

protractorConfig.config.multiCapabilities = [{
        browserName: 'firefox',
        name: '[bitbloq-app] Firefox',
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
    }];

protractorConfig.config.suites.unsupportedDesktop = '../tests/unsupported/unsupportedDesktop.spec.js';

exports.config = protractorConfig.config;
