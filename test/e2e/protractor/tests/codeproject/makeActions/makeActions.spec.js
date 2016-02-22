/**
 *Spec to login
 */

'use strict';

var Variables = require('../../commons/variables.js'),
    GlobalFunctions = require('../../commons/globalFunctions.js'),
    Commons = require('../../commons/commons.po.js'),
    Make = require('../../bloqsproject/make.po.js'),
    Login = require('../../login/login.po.js'),
    Modals = require('../../modals/modals.po.js'),
    MakeActions = require('../../bloqsproject/makeActions/makeActions.po.js');

var vars = new Variables(),
    globalFunctions = new GlobalFunctions(),
    commons = new Commons(),
    login = new Login(),
    modals = new Modals(),
    make = new Make(),
    makeActions = new MakeActions();

globalFunctions.xmlReport('codeProjectMakeActions');

describe('Check makeActions actions in codeProjects', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bba-240:codeProjectMakeActions:check enabled/disabled options by logged in user', function() {

        login.loginWithRandomUser();

        make.get();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        make.softwareTab.click();
        make.codeTab.click();
        make.softwareEditCode.click();
        modals.modalAlertOk.click();
        browser.sleep(vars.timeToWaitFadeModals);
        commons.clickAlertCloseToast();
        browser.sleep(vars.timeToWaitFadeModals);
        //FILE
        makeActions.menuFile.click();
        //expect(makeActions.menuopenProject.getAttribute('disabled')).not.toBeTruthy();
        //expect(makeActions.menuOpenProjectFromFile.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuChangeName.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuClone.getAttribute('disabled')).not.toBeTruthy();
        //expect(makeActions.menuDownload.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuExportArduino.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuChangeLanguage.getAttribute('disabled')).not.toBeTruthy();
        //only enabled when a projects have an id
        expect(makeActions.removeProject.getAttribute('disabled')).toBeTruthy();

        //VIEW
        makeActions.menuView.click();
        expect(makeActions.menuViewConsole.getAttribute('disabled')).not.toBeTruthy();

        //SHARE
        //TODO NEW SPEC PUBLISH AND THEN SHOW PRIVATE
        makeActions.menuShare.click();
        expect(makeActions.menuSharePublish.getAttribute('disabled')).toBeTruthy(); //Tiene que estar deshabilitado hasta que se guarde
        expect(makeActions.menuShareSocial.getAttribute('disabled')).toBeTruthy();
        expect(makeActions.menuShareWithUsers.getAttribute('disabled')).toBeTruthy();

        //HELP
        makeActions.menuHelp.click();
        expect(makeActions.menuHelpFaq.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuHelpTutorial.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuHelpErrorFeedback.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuHelpForum.getAttribute('disabled')).not.toBeTruthy(); //Remove, forum not created yet

        login.logout();
    });

    /**
     * User not logged in
     */
    it('bba-241:codeProjectMakeActions:check enabled/disabled options by not logged in user', function() {

        make.get();
        modals.attentionContinueGuest.click();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        make.softwareTab.click();
        make.codeTab.click();
        make.softwareEditCode.click();
        modals.modalAlertOk.click();
        browser.sleep(vars.timeToWaitFadeModals);
        commons.clickAlertCloseToast();
        browser.sleep(vars.timeToWaitFadeModals);

        //FILE
        makeActions.menuFile.click();
        //expect(makeActions.menuopenProject.getAttribute('disabled')).toBeTruthy();
        //expect(makeActions.menuOpenProjectFromFile.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuChangeName.getAttribute('disabled')).toBeTruthy();
        expect(makeActions.menuClone.getAttribute('disabled')).toBeTruthy();
        //expect(makeActions.menuDownload.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuExportArduino.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuChangeLanguage.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.removeProject.getAttribute('disabled')).toBeTruthy();

        //VIEW
        makeActions.menuView.click();
        expect(makeActions.menuViewConsole.getAttribute('disabled')).not.toBeTruthy();

        //SHARE
        //TODO NEW SPEC PUBLISH AND THEN SHOW PRIVATE
        makeActions.menuShare.click();
        expect(makeActions.menuSharePublish.getAttribute('disabled')).toBeTruthy();
        expect(makeActions.menuShareSocial.getAttribute('disabled')).toBeTruthy();
        expect(makeActions.menuShareWithUsers.getAttribute('disabled')).toBeTruthy();

        //HELP
        makeActions.menuHelp.click();
        expect(makeActions.menuHelpFaq.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuHelpTutorial.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuHelpForum.getAttribute('disabled')).not.toBeTruthy();
        globalFunctions.navigatorLanguage()
            .then(function(language) {
                expect(makeActions.menuHelpErrorFeedback.getAttribute('href')).toMatch(vars.supportEmail(language));
            });

    });

});
