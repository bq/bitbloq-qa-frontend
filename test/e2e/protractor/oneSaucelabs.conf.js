'use strict';
/* A reference configuration file. */
/* For more options: https://github.com/angular/protractor/blob/master/docs/referenceConf.js */

var protractorConfig = require('./protractor.conf');

// If sauceUser and sauceKey are specified, seleniumServerJar will be ignored.
// The tests will be run remotely using SauceLabs.
protractorConfig.config.sauceUser = 'bitbloq';
protractorConfig.config.sauceKey = '66222724-a846-4c20-a452-d7ab3b081320';
//protractorConfig.config.resultJsonOutputFile = './target/e2e/protractor/report_verifySauceLabs.json';

var saucelabTest = require('./saucelabsTestSuite');

for(var i=0; i<protractorConfig.config.multiCapabilities.length; i++) {

    protractorConfig.config.multiCapabilities[i].specs = protractorConfig.config.multiCapabilities[i].specs.concat(saucelabTest) ;
}

exports.config = protractorConfig.config;
