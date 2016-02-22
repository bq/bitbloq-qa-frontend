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

globalFunctions.xmlReport('bloqsprojectMakeActionsHelp');

describe('Menu Help of MakeActions', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    //TODO CHECK TOAST
    it('bba-104:bloqsprojectMakeActionsHelp:Login and feedback error', function() {

        login.loginWithRandomUser();
        make.get();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        makeActions.menuHelp.click();
        makeActions.menuHelpErrorFeedback.click();

        modals.notifyErrorTextArea.sendKeys('Text write in text area');
        modals.notifyErrorSO.sendKeys('Text write S.O Ubuntu ;)');
        modals.notifyErrorBrowser.sendKeys('Text write browser');
        modals.okDialog.click();

        login.logout();
    });

    it('bba-106:bloqsprojectMakeActionsHelp:NO login, feedback modal are not displayed but it posible send mailto', function() {

        make.get();
        modals.attentionContinueGuest.click();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);

        makeActions.menuHelp.click();
        ///test item "Informar de un error"  are enable
        globalFunctions.navigatorLanguage()
            .then(function(language) {
                expect(makeActions.menuHelpErrorFeedback.getAttribute('href')).toMatch(vars.supportEmail(language));
            });

    });

});
