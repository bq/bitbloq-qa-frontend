'use strict';
/* A reference configuration file. */
/* For more options: https://github.com/angular/protractor/blob/master/docs/referenceConf.js */

var protractorConfig = require('./protractor.conf'),
    _ = require('../../../bower_components/lodash/lodash.min');

// If sauceUser and sauceKey are specified, seleniumServerJar will be ignored.
// The tests will be run remotely using SauceLabs.
protractorConfig.config.sauceUser = 'bitbloq';
protractorConfig.config.sauceKey = '66222724-a846-4c20-a452-d7ab3b081320';


protractorConfig.config.resultJsonOutputFile = './target/e2e/protractor/tap_resultsSauceConf.json';

var saucelabTest = require('./saucelabsTestSuite');

for (var i = 0; i < protractorConfig.config.multiCapabilities.length; i++) {

    protractorConfig.config.multiCapabilities[i].specs = protractorConfig.config.multiCapabilities[i].specs.concat(saucelabTest);
}


var platform = ['Windows 7', 'OS X 10.10']; //, 'Windows 8', 'Windows 8.1']; OjO Linux is default include

var multiCapabilities;

for (var i = 0; i < platform.length; i++) {
    multiCapabilities = _.cloneDeep(protractorConfig.config.multiCapabilities[0]);
    multiCapabilities.platform = platform[i];
    multiCapabilities.name = '[bitbloq-app]  ' + platform[i];
    protractorConfig.config.multiCapabilities.push(multiCapabilities);
}


exports.config = protractorConfig.config;
