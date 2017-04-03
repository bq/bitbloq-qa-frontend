/**
 *Spec to login
 */

'use strict';

var Variables = require('../../commons/variables.js'),
    GlobalFunctions = require('../../commons/globalFunctions.js'),
    Make = require('../../bloqsproject/make.po.js'),
    Login = require('../../login/login.po.js'),
    Modals = require('../../modals/modals.po.js'),
    MakeActions = require('./makeActions.po.js');

var vars = new Variables(),
    globalFunctions = new GlobalFunctions(),
    login = new Login(),
    modals = new Modals(),
    make = new Make(),
    makeActions = new MakeActions();

globalFunctions.xmlReport('bloqsprojectMakeActions');

describe('Check makeActions actions in bloqsproject', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bbb-99:bloqsprojectMakeActions:check enabled/disabled options by logged in user', function() {

        login.loginWithRandomUser();

        make.get();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        //FILE
        makeActions.menuFile.click();
        expect(makeActions.menuNewProject.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuNewProjectCode.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuopenProject.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuOpenProjectFromFile.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuChangeName.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuClone.getAttribute('disabled')).toBeTruthy();
        expect(makeActions.menuDownload.getAttribute('disabled')).toBeTruthy();
        expect(makeActions.menuExportArduino.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuChangeLanguage.getAttribute('disabled')).not.toBeTruthy();
        //only enabled when a projects have an id
        expect(makeActions.removeProject.getAttribute('disabled')).toBeTruthy();

        //VIEW
        makeActions.menuView.click();
        expect(makeActions.menuViewConsole.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuViewWeb2board.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuViewPlotter.getAttribute('disabled')).not.toBeTruthy();

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
    it('bbb-100:bloqsprojectMakeActions:check enabled/disabled options by not logged in user', function() {

        make.get();
        modals.attentionContinueGuest.click();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);

        //FILE
        makeActions.menuFile.click();
        expect(makeActions.menuNewProject.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuNewProjectCode.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuopenProject.getAttribute('disabled')).toBeTruthy();
        expect(makeActions.menuOpenProjectFromFile.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuChangeName.getAttribute('disabled')).toBeTruthy();
        expect(makeActions.menuClone.getAttribute('disabled')).toBeTruthy();
        expect(makeActions.menuDownload.getAttribute('disabled')).toBeTruthy();
        expect(makeActions.menuExportArduino.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuChangeLanguage.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.removeProject.getAttribute('disabled')).toBeTruthy();

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
        expect(makeActions.menuHelpForum.getAttribute('disabled')).not.toBeTruthy(); //Remove, forum not created yet
        globalFunctions.navigatorLanguage()
            .then(function(language) {
                expect(makeActions.menuHelpErrorFeedback.getAttribute('href')).toMatch(vars.supportEmail(language));
            });

    });

});
