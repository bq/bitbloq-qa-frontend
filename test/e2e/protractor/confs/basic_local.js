'use strict';

/* A reference configuration file. */
/* For more options: https://github.com/angular/protractor/blob/master/docs/referenceConf.js */

var protractorConfig = require('./basic');

var localTest = require('../testsuites/local.js');

for(var i=0; i<protractorConfig.config.multiCapabilities.length; i++) {

    protractorConfig.config.multiCapabilities[i].specs = protractorConfig.config.multiCapabilities[i].specs.concat(localTest) ;
}

exports.config = protractorConfig.config;