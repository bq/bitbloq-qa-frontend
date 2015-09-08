/**
 *Spec to login
 */

'use strict';

var Variables = require('../../commons/variables.js'),
    Make = require('../../bloqsproject/make.po.js'),
    Login = require('../../login/login.po.js'),
    Modals = require('../../modals/modals.po.js'),
    MakeActions = require('./makeActions.po.js');

var vars = new Variables(),
    login = new Login(),
    modals = new Modals(),
    make = new Make(),
    makeActions = new MakeActions();


describe('check makeActions actions', function() {

    //beforeEach commons
    vars.beforeTest();

    // afterEach commons
    vars.afterTest();

    /**
     * User logged in
     */
    it('bba-122:check enabled/disabled options by logged in user', function() {

        login.loginWithRandomUser();

        make.get();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        //FILE
        makeActions.menuFile.click();
        expect(makeActions.menuNewProject.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuopenProject.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuOpenProjectFromFile.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuChangeName.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuClone.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuDownload.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuExportArduino.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuChangeLanguage.getAttribute('disabled')).not.toBeTruthy();
        //only enabled when a projects have an id
        expect(makeActions.removeProject.getAttribute('disabled')).toBeTruthy();

        //EDIT
        // makeActions.menuEdit.click();
        // expect(makeActions.menuEditRedo.getAttribute('disabled')).not.toBeTruthy();
        // expect(makeActions.menuEditUndo.getAttribute('disabled')).not.toBeTruthy();

        //VIEW
        makeActions.menuView.click();
        // expect(makeActions.menuViewMoreZoom.getAttribute('disabled')).not.toBeTruthy();
        // expect(makeActions.menuViewResetZoom.getAttribute('disabled')).not.toBeTruthy();
        // expect(makeActions.menuViewLessZoom.getAttribute('disabled')).not.toBeTruthy();

        //if mac, serial monitor its disabled
        if (process.platform === 'darwin') {
            expect(makeActions.menuViewConsole.getAttribute('disabled')).toBeTruthy();
        } else {
            expect(makeActions.menuViewConsole.getAttribute('disabled')).not.toBeTruthy();
        }

        //SHARE
        //TODO NEW SPEC PUBLISH AND THEN SHOW PRIVATE
        makeActions.menuShare.click();
        expect(makeActions.menuSharePublish.getAttribute('disabled')).toBeTruthy(); //Tiene que estar deshabilitado hasta que se guarde
        // expect(makeActions.menuShareSocial.getAttribute('disabled')).not.toBeTruthy();
        //expect(makeActions.menuShareWithUsers.getAttribute('disabled')).not.toBeTruthy();

        //HELP
        makeActions.menuHelp.click();
        expect(makeActions.menuHelpFaq.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuHelpTutorial.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuHelpComments.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuHelpErrorFeedback.getAttribute('disabled')).not.toBeTruthy();
        //expect(makeActions.menuHelpForum.getAttribute('disabled')).not.toBeTruthy(); Remove, forum not created yet

        login.logout();
    });

    /**
     * User not logged in
     */
    it('bba-113:check enabled/disabled options by not logged in user', function() {

        make.get();
        modals.attentionContinueGuest.click();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);

        //FILE
        makeActions.menuFile.click();
        expect(makeActions.menuNewProject.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuopenProject.getAttribute('disabled')).toBeTruthy();
        expect(makeActions.menuOpenProjectFromFile.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuChangeName.getAttribute('disabled')).toBeTruthy();
        expect(makeActions.menuClone.getAttribute('disabled')).toBeTruthy();
        expect(makeActions.menuDownload.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuExportArduino.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuChangeLanguage.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.removeProject.getAttribute('disabled')).toBeTruthy();

        //EDIT
        // makeActions.menuEdit.click();
        // expect(makeActions.menuEditRedo.getAttribute('disabled')).not.toBeTruthy();
        // expect(makeActions.menuEditUndo.getAttribute('disabled')).not.toBeTruthy();

        //VIEW
        makeActions.menuView.click();
        // expect(makeActions.menuViewMoreZoom.getAttribute('disabled')).not.toBeTruthy();
        // expect(makeActions.menuViewResetZoom.getAttribute('disabled')).not.toBeTruthy();
        // expect(makeActions.menuViewLessZoom.getAttribute('disabled')).not.toBeTruthy();
        if (process.platform === 'darwin') {
            expect(makeActions.menuViewConsole.getAttribute('disabled')).toBeTruthy();
        } else {
            expect(makeActions.menuViewConsole.getAttribute('disabled')).not.toBeTruthy();
        }

        //SHARE
        //TODO NEW SPEC PUBLISH AND THEN SHOW PRIVATE
        makeActions.menuShare.click();
        expect(makeActions.menuSharePublish.getAttribute('disabled')).toBeTruthy();
        // expect(makeActions.menuShareSocial.getAttribute('disabled')).toBeTruthy();
        //expect(makeActions.menuShareWithUsers.getAttribute('disabled')).toBeTruthy();

        //HELP
        makeActions.menuHelp.click();
        expect(makeActions.menuHelpFaq.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuHelpTutorial.getAttribute('disabled')).not.toBeTruthy();
        expect(makeActions.menuHelpComments.getAttribute('href')).toMatch('mailto:support-bitbloq@bq.com');
        //expect(makeActions.menuHelpForum.getAttribute('disabled')).not.toBeTruthy(); Remove, forum not created yet
    });


});