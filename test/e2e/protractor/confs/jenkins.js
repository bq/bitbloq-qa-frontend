'use strict';

/* A reference configuration file. */
/* For more options: https://github.com/angular/protractor/blob/master/docs/referenceConf.js */

var protractorConfig = require('./basic.js');

protractorConfig.config.multiCapabilities = [{
    browserName: 'chrome',
    name: '[bitbloq-app] Linux-chrome-43',
    recordVideo: false,
    recordScreenshots: false,
    //  specs: require('../testsuites/common.js'),
    shardTestFiles: true,
    maxInstances: 1,
    chromeOptions: {
        // How to set browser language (menus & so on)
        //args: ['lang=fr-FR'],
        args: ['--no-sandbox'],
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
}];

exports.config = protractorConfig.config;
