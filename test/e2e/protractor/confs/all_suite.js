'use strict';

/* A reference configuration file. */
/* For more options: https://github.com/angular/protractor/blob/master/docs/referenceConf.js */

var protractorConfig = require('./basic_local.js');

protractorConfig.config.multiCapabilities = [{
    browserName: 'chrome',
    name: '[bitbloq-app] Linux-chrome-43',
    recordVideo: false,
    recordScreenshots: false,
    //  specs: require('../testsuites/common.js'),
    shardTestFiles: true,
    maxInstances: 1,
    chromeOptions: {
        // How to set browser language (menus & so on)
        //args: ['lang=fr-FR'],
        args: ['--no-sandbox'],
        prefs: {
            // Set other language in navigator
            // intl: {
            //     accept_languages: 'fr-FR'
            // },
            download: {
                'prompt_for_download': false,
                'directory_upgrade': true,
                'default_directory': './target'
            }

        }
    }
}];
protractorConfig.config.suites.enviroment = '../tests/bloqsproject/makeActions/share/makeActionsShare.spec.env.js';
protractorConfig.config.suites.ALL = [
    '../tests/account/account.spec.js',
    '../tests/autosave/autosave.spec.js',
    '../tests/bloqsproject/hwtab/hwtab.spec.js',
    '../tests/bloqsproject/infotab/infotab.spec.js',
    '../tests/bloqsproject/makeActions/edit/makeActionsEdit.spec.js',
    '../tests/bloqsproject/makeActions/file/makeActionsFile.spec.js',
    '../tests/bloqsproject/makeActions/help/makeActionsHelp.spec.js',
    '../tests/bloqsproject/makeActions/share/makeActionsShare.spec.js',
    '../tests/bloqsproject/makeActions/makeActions.spec.js',
    '../tests/bloqsproject/walkthrough/walkthrough.spec.js',
    '../tests/bloqsproject/make.spec.js',
    '../tests/codeproject/makeActions/makeActions.spec.js',
    '../tests/codeproject/codeproject.spec.js',
    '../tests/cookiesBar/cookiesBar.spec.js',
    '../tests/explore/explore.spec.js',
    '../tests/explore/project.spec.js',
    '../tests/header/header.spec.js',
    '../tests/help/changelog/changelog.spec.js',
    '../tests/help/faq/faq.spec.js',
    '../tests/help/forum/forum.spec.js',
    '../tests/help/tutorial/tutorial.spec.js',
    '../tests/help/*.spec.js',
    '../tests/landing/landing.spec.js',
    '../tests/language/language.spec.js',
    '../tests/login/login.spec.js',
    '../tests/modals/changeProjectName/changeProjectName.spec.js',
    '../tests/projects/myprojects/myprojects.spec.js',
    '../tests/projects/projects.spec.js',
    '../tests/register/register.spec.js',
    '../tests/state/state.spec.js',
    '../tests/account/account.spec.local.js',
    '../tests/autosave/autosave.spec.local.js',
    '../tests/bloqsproject/hwtab/hwtab.spec.local.js',
    '../tests/bloqsproject/infotab/infotab.spec.local.js',
    '../tests/bloqsproject/makeActions/edit/makeActionsEdit.spec.local.js',
    '../tests/bloqsproject/makeActions/file/makeActionsFile.spec.local.js',
    '../tests/bloqsproject/makeActions/share/makeActionsShare.spec.local.js',
    '../tests/explore/filters/filters.spec.local.js',
    '../tests/explore/project.spec.local.js',
    '../tests/login/login.spec.local.js',
    '../tests/projects/myprojects/myprojects.spec.local.js',
    '../tests/social/social.spec.local.js',
    '../tests/state/state.spec.local.js'

];

protractorConfig.config.suites.ALL_NO_LOCAL = [
    '../tests/account/account.spec.js',
    '../tests/autosave/autosave.spec.js',
    '../tests/bloqsproject/hwtab/hwtab.spec.js',
    '../tests/bloqsproject/infotab/infotab.spec.js',
    '../tests/bloqsproject/makeActions/edit/makeActionsEdit.spec.js',
    '../tests/bloqsproject/makeActions/file/makeActionsFile.spec.js',
    '../tests/bloqsproject/makeActions/help/makeActionsHelp.spec.js',
    '../tests/bloqsproject/makeActions/share/makeActionsShare.spec.js',
    '../tests/bloqsproject/makeActions/makeActions.spec.js',
    '../tests/bloqsproject/walkthrough/walkthrough.spec.js',
    '../tests/bloqsproject/make.spec.js',
    '../tests/codeproject/makeActions/makeActions.spec.js',
    '../tests/codeproject/codeproject.spec.js',
    '../tests/cookiesBar/cookiesBar.spec.js',
    '../tests/explore/explore.spec.js',
    '../tests/explore/project.spec.js',
    '../tests/header/header.spec.js',
    '../tests/help/changelog/changelog.spec.js',
    '../tests/help/faq/faq.spec.js',
    '../tests/help/forum/forum.spec.js',
    '../tests/help/tutorial/tutorial.spec.js',
    '../tests/help/*.spec.js',
    '../tests/landing/landing.spec.js',
    '../tests/language/language.spec.js',
    '../tests/login/login.spec.js',
    '../tests/modals/changeProjectName/changeProjectName.spec.js',
    '../tests/projects/myprojects/myprojects.spec.js',
    '../tests/projects/projects.spec.js',
    '../tests/register/register.spec.js',
    '../tests/state/state.spec.js'
];

protractorConfig.config.suites.ONLY_LOCAL = [
    '../tests/account/account.spec.local.js',
    '../tests/autosave/autosave.spec.local.js',
    '../tests/bloqsproject/hwtab/hwtab.spec.local.js',
    '../tests/bloqsproject/infotab/infotab.spec.local.js',
    '../tests/bloqsproject/makeActions/edit/makeActionsEdit.spec.local.js',
    '../tests/bloqsproject/makeActions/file/makeActionsFile.spec.local.js',
    '../tests/bloqsproject/makeActions/share/makeActionsShare.spec.local.js',
    '../tests/explore/filters/filters.spec.local.js',
    '../tests/explore/project.spec.local.js',
    '../tests/login/login.spec.local.js',
    '../tests/projects/myprojects/myprojects.spec.local.js',
    '../tests/social/social.spec.local.js',
    '../tests/state/state.spec.local.js'
];

exports.config = protractorConfig.config;
