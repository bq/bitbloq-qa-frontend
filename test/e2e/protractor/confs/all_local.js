'use strict';

/* A reference configuration file. */
/* For more options: https://github.com/angular/protractor/blob/master/docs/referenceConf.js */

var protractorConfig = require('./basic');

protractorConfig.config.suites.allLocal = [
    '../tests/login/login.spec.local.js',
    '../tests/bloqsproject/makeActions/file/makeActionsFile.spec.local.js',
    '../tests/bloqsproject/makeActions/edit/makeActionsEdit.spec.local.js',
    '../tests/explore/filters/filters.spec.local.js',
    '../tests/account/account.spec.local.js',
    '../tests/bloqsproject/infotab/infotab.spec.local.js',
    '../tests/explore/project.spec.local.js'
];

console.log(protractorConfig.config.suites);

exports.config = protractorConfig.config;
