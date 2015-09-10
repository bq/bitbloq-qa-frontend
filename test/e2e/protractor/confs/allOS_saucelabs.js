'use strict';
/* A reference configuration file. */
/* For more options: https://github.com/angular/protractor/blob/master/docs/referenceConf.js */

var protractorConfig = require('./basic_saucelabs'),
    _ = require('lodash');


var platform = ['Windows 7', 'OS X 10.10']; //, 'Windows 8', 'Windows 8.1']; OjO Linux is default include

var multiCapabilities;

for (var i = 0; i < platform.length; i++) {
    multiCapabilities = _.cloneDeep(protractorConfig.config.multiCapabilities[0]);
    multiCapabilities.platform = platform[i];
    multiCapabilities.name = '[bitbloq-app]  ' + platform[i];
    protractorConfig.config.multiCapabilities.push(multiCapabilities);
}


exports.config = protractorConfig.config;
