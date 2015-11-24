'use strict';

/* A reference configuration file. */
/* For more options: https://github.com/angular/protractor/blob/master/docs/referenceConf.js */

var protractorConfig = require('./basic');

protractorConfig.config.suites.loginLocal = '../tests/login/login.spec.local.js';
protractorConfig.config.suites.makeactionsFileLocal = '../tests/login/login.spec.local.js';
protractorConfig.config.suites.filtersLocal = '../tests/explore/filters/filters.spec.local.js';
protractorConfig.config.suites.accountLocal = '../tests/account/account.local.spec.js';
protractorConfig.config.suites.infotabLocal = '../tests/bloqsproject/infotab/infotab.spec.local.js';
protractorConfig.config.suites.projectLocal = '../tests/explore/project.spec.local.js';

console.log(protractorConfig.config.suites);

exports.config = protractorConfig.config;
