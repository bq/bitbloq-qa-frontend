'use strict';

/* A reference configuration file. */
/* For more options: https://github.com/angular/protractor/blob/master/docs/referenceConf.js */

var protractorConfig = require('./basic_local.js');

protractorConfig.config.suites.enviroment = '../tests/bloqsproject/makeActions/share/makeActionsShare.spec.env.js';

exports.config = protractorConfig.config;
