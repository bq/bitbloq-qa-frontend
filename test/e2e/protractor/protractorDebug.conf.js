'use strict';
/* A reference configuration file. */
/* For more options: https://github.com/angular/protractor/blob/master/docs/referenceConf.js */

var protractorConfig = require('./protractor.conf');

//protractorConfig.config.resultJsonOutputFile = './target/e2e/protractor/tap_resultsDebugConf.json';

protractorConfig.config.baseUrl ='http://localhost:9000/';
//protractorConfig.config.seleniumAddress = 'http://localhost:4444/wd/hub';
/*
 protractorConfig.config.capabilities = [
 {

 'browserName': 'chrome',
 'chromeOptions': {
 'args': ['start-maximized']
 }
 }
 ];
 */
protractorConfig.config.capabilities.browserName = 'chrome';
//protractorConfig.config.capabilities.chromeOptions.args = 'start-maximized';

/*
 framework: 'jasmine2',
 jasmineNodeOpts: {
 isVerbose: true,
 includeStackTrace: true,
 showColors: true,
 defaultTimeoutInterval: 30000000
 }
 */

exports.config = protractorConfig.config;
