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

describe('Check makeActions actions in codeProjects', function () {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('SWBIT-3020:codeProjectMakeActions:check enabled/disabled options by logged in user', function () {

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
        expect(makeActions.menuNewProject.getAttribute('disabled')).not.toBeTruthy('newProject');
        expect(makeActions.menuNewProjectCode.getAttribute('disabled')).not.toBeTruthy('newProjectCode');
        expect(makeActions.menuopenProject.getAttribute('disabled')).not.toBeTruthy('openProject');
        expect(makeActions.menuChangeName.getAttribute('disabled')).not.toBeTruthy('changeName');
        expect(makeActions.menuClone.getAttribute('disabled')).not.toBeTruthy('Clone');
        expect(makeActions.menuExportArduino.getAttribute('disabled')).not.toBeTruthy('ExportArduino');
        expect(makeActions.menuChangeLanguage.getAttribute('disabled')).not.toBeTruthy('ChangeLanguage');
        //only enabled when a projects have an id
        expect(makeActions.removeProject.getAttribute('disabled')).not.toBeTruthy('removeProject');

        //VIEW
        makeActions.menuView.click();
        expect(makeActions.menuViewConsole.getAttribute('disabled')).not.toBeTruthy('ViewConsole');
        expect(makeActions.menuViewWeb2board.getAttribute('disabled')).not.toBeTruthy('ViewWeb2Board');
        expect(makeActions.menuViewPlotter.getAttribute('disabled')).not.toBeTruthy('viewPlotter');

        //SHARE
        //TODO NEW SPEC PUBLISH AND THEN SHOW PRIVATE
        makeActions.menuShare.click();
        expect(makeActions.menuSharePublish.getAttribute('disabled')).not.toBeTruthy('sharepublish'); //Tiene que estar deshabilitado hasta que se guarde
        expect(makeActions.menuShareSocial.getAttribute('disabled')).not.toBeTruthy('sharesocial');
        expect(makeActions.menuShareWithUsers.getAttribute('disabled')).not.toBeTruthy('sharewithusers');

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
    it('SWBIT-3011:codeProjectMakeActions:check enabled/disabled options by not logged in user', function () {

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
        expect(makeActions.menuNewProject.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuNewProjectCode.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuopenProject.getAttribute('disabled')).toBeTruthy();
        expect(makeActions.menuChangeName.getAttribute('disabled')).toBeTruthy();
        expect(makeActions.menuClone.getAttribute('disabled')).toBeTruthy();
        expect(makeActions.menuExportArduino.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuChangeLanguage.getAttribute('disabled')).not.toBeTruthy();
        expect(browser.isElementPresent(makeActions.removeProject)).toBe(false);

        //VIEW
        makeActions.menuView.click();
        expect(makeActions.menuViewConsole.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuViewWeb2board.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuViewPlotter.getAttribute('disabled')).not.toBeTruthy();

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
            .then(function (language) {
                expect(makeActions.menuHelpErrorFeedback.getAttribute('href')).toMatch(vars.supportEmail(language));
            });

    });

});
