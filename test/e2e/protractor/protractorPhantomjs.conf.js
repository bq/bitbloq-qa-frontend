/**
 * Protractor config file to phantomJS
 */


'use strict';
/* A reference configuration file. */
/* For more options: https://github.com/angular/protractor/blob/master/docs/referenceConf.js */

var protractorConfig = require('./protractor.conf');

//protractorConfig.config.resultJsonOutputFile = './target/e2e/protractor/tap_result_Phantom.json';

//protractorConfig.config.baseUrl =
protractorConfig.config.capabilities.browserName  = 'phantomjs';

protractorConfig.config['phantomjs.binary.path'] = require('phantomjs').path ;
protractorConfig.config['phantomjs.ghostdriver.cli.args'] = ['--loglevel=DEBUG'];

exports.config = protractorConfig.config;
