/**
 *Spec to makeActionsHelp.spec.js
 * Menu Help of makeActions
 */

'use strict';

var Variables = require('../../../commons/variables.js'),
    GlobalFunctions = require('../../../commons/globalFunctions.js'),
    MakeActions = require('../makeActions.po.js'),
    Login = require('../../../login/login.po.js'),
    Make = require('../..//make.po.js'),
    Modals = require('../../../modals/modals.po.js');

var vars = new Variables(),
    globalFunctions = new GlobalFunctions(),
    makeActions = new MakeActions(),
    login = new Login(),
    make = new Make(),
    modals = new Modals();

globalFunctions.xmlReport('bloqsprojectMakeActionsHelpXit');

describe('Menu Help of MakeActions', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    //Xit on jenkins && saucelabs
    it('bbb-93:Login and test if there are all items visibles && redirect to faq, forum and help', function() {
        login.loginWithRandomUser();
        make.get();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        makeActions.menuHelp.click();
        browser.sleep(vars.timeToWaitFadeModals);
        //test item  "Informar de un error"  are enable
        expect(makeActions.menuHelpErrorFeedback.getAttribute('disabled')).not.toBeTruthy();
        // Test redirect to faq, forum and help
        makeActions.menuHelpFaq.click().then(function() {
            browser.sleep(vars.timeToWaitTab + 1000);
            globalFunctions.toMatchUrlInNewTab(/#\/help/).then(function() {
                browser.sleep(vars.timeToWaitTab + 1000);
                makeActions.menuHelp.click().then(function() {
                    browser.sleep(vars.timeToWaitTab + 1000);
                    makeActions.menuHelpTutorial.click().then(function() {
                        browser.sleep(vars.timeToWaitTab + 1000);
                        globalFunctions.toMatchUrlInNewTab(/#\/help\/tutorial/).then(function() {
                            makeActions.menuHelp.click().then(function() {
                                browser.sleep(vars.timeToWaitTab + 1000);
                                makeActions.menuHelpForum.click().then(function() {
                                    browser.sleep(vars.timeToWaitTab + 1000);
                                    globalFunctions.toMatchUrlInNewTab(/#\/help\/forum/).then(function() {

                                        login.logout();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

});
