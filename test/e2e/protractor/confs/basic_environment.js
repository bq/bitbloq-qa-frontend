'use strict';

/* A reference configuration file. */
/* For more options: https://github.com/angular/protractor/blob/master/docs/referenceConf.js */

var protractorConfig = require('./basic');

var environment = require('../testsuites/environment.js');
var local = require('../testsuites/local.js');

for(var i=0; i<protractorConfig.config.multiCapabilities.length; i++) {

    protractorConfig.config.multiCapabilities[i].specs = protractorConfig.config.multiCapabilities[i].specs.concat(environment) ;
}

for(var i=0; i<protractorConfig.config.multiCapabilities.length; i++) {

    protractorConfig.config.multiCapabilities[i].specs = protractorConfig.config.multiCapabilities[i].specs.concat(local) ;
}

exports.config = protractorConfig.config;
