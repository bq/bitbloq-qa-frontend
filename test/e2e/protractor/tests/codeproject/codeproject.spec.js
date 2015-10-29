'use strict';

var Codeproject = require('./codeproject.po.js'),
    GlobalFunctions = require('../commons/globalFunctions.js'),
    Commons = require('../commons/commons.po.js'),
    Login = require('../login/login.po.js'),
    Make = require('../bloqsproject/make.po.js'),
    Modals = require('../modals/modals.po.js'),
    Variables = require('../commons/variables.js'),
    MyProjects = require('../myprojects/myprojects.po.js');

var codeproject = new Codeproject(),
    globalFunctions = new GlobalFunctions(),
    commons = new Commons(),
    login = new Login(),
    make = new Make(),
    modals = new Modals(),
    vars = new Variables(),
    myprojects = new MyProjects();

globalFunctions.xmlReport('codeproject');

describe('Test Codeproject verify', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bba-129:User guest edit code, OK edit and show modal && toast', function() {
        make.get();
        modals.attentionContinueGuest.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        make.softwareTab.click();
        make.codeTab.click();
        make.softwareEditCode.click();
        modals.modalAlertOk.click();

        browser.sleep(vars.timeToWaitFadeModals);

        expect(commons.editToast.isDisplayed()).toBe(true);

        expect(commons.alertTextToast.getText()).toMatch('Si editas el código no podrás volver a utilizar los bloques en este proyecto.');

        expect(commons.alertSvgIcon.getAttribute('data-type')).toEqual('warning');

        commons.alertCloseToast.click();
        expect(commons.editToast.isPresent()).toBe(false);

    });

    it('bba-130:Login edit code, OK edit and show modal && toast', function() {

        //Check modal show first time
        var user = login.loginWithRandomUser();

        make.get();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        make.softwareTab.click();
        make.codeTab.click();
        make.softwareEditCode.click();

        modals.modalAlertOk.click();
        browser.sleep(vars.timeToWaitAutoSave);

        commons.expectToastTimeOut(commons.editToast);
        login.logout();

        //Check modal NO show second time
        login.get();
        login.login(user.user, user.password);
        make.get();
        make.softwareTab.click();
        make.codeTab.click();
        make.softwareEditCode.click();

        browser.sleep(vars.timeToWaitFadeModals);

        expect(modals.modalAlertOk.isPresent()).toBe(false);

        login.logout();

    });

    it('bba-131:Verify wit LOGIN user, undo change in TOAST (before create bloqsproject)', function() {

        make.saveProjectNewUser();

        browser.getCurrentUrl().then(function(urlBloqsproject) {

            make.softwareTab.click();
            make.codeTab.click();
            make.softwareEditCode.click();
            modals.modalAlertOk.click();
            browser.sleep(vars.timeToWaitFadeModals);

            commons.clickAlertUndoToast();
            browser.sleep(vars.timeToWaitFadeModals);
            expect(browser.getCurrentUrl()).toEqual(urlBloqsproject);
            login.logout();
        });

    });

    it('bba-150:We can change the board in the info tab and saved it', function() {

        var projectUser = make.saveProjectNewUser();
        make.softwareTab.click();
        make.codeTab.click();
        make.softwareEditCode.click();
        modals.modalAlertOk.click();
        browser.sleep(vars.timeToWaitFadeModals);
        commons.clickAlertCloseToast();
        browser.sleep(vars.timeToWaitFadeModals);
        make.infoTab.click();

        codeproject.codeInfotabChooseBoard.click();
        element.all(by.repeater('item in options').row(2)).click();
        browser.sleep(vars.timeToWaitAutoSave);

        expect(codeproject.codeInfotabHeading.getText()).toMatch('Arduino UNO');

        //Logout, login and check if saved
        login.logout();
        login.get();
        login.login(projectUser.user.user, projectUser.user.password);
        myprojects.overMyProjects.click();
        browser.sleep(vars.timeToWaitFadeModals);

        myprojects.openProject.click().then(function() {
            browser.sleep(vars.timeToWaitTab);
            browser.getAllWindowHandles().then(function(handles) {
                console.log(handles);
                browser.switchTo().window(handles[1]).then(function() {
                    make.infoTab.click();

                    expect(codeproject.codeInfotabHeading.getText()).toMatch('Arduino UNO');

                    //Change other board
                    codeproject.codeInfotabChooseBoard.click();
                    element.all(by.repeater('item in options').row(1)).click();
                    browser.sleep(vars.timeToWaitAutoSave);

                    login.logout();
                    browser.close().then(browser.switchTo().window(handles[0]));

                });
            });
        });

        login.get();
        login.login(projectUser.user.user, projectUser.user.password);

        myprojects.overMyProjects.click();
        browser.sleep(vars.timeToWaitFadeModals);
        myprojects.openProject.click().then(function() {
            browser.sleep(vars.timeToWaitTab);
            browser.getAllWindowHandles().then(function(handles) {
                console.log(handles);
                browser.switchTo().window(handles[1]).then(function() {
                    make.infoTab.click();

                    expect(codeproject.codeInfotabHeading.getText()).toMatch('Freaduino UNO');

                    //Change other board
                    codeproject.codeInfotabChooseBoard.click();
                    element.all(by.repeater('item in options').row(0)).click();
                    browser.sleep(vars.timeToWaitAutoSave);

                    login.logout();
                    browser.close().then(browser.switchTo().window(handles[0]));

                });
            });
        });

        //Logout, login and check if saved
        login.get();
        login.login(projectUser.user.user, projectUser.user.password);
        myprojects.overMyProjects.click();
        browser.sleep(vars.timeToWaitFadeModals);

        myprojects.overMyProjects.click();
        browser.sleep(vars.timeToWaitFadeModals);
        myprojects.openProject.click().then(function() {
            browser.sleep(vars.timeToWaitTab);
            browser.getAllWindowHandles().then(function(handles) {
                console.log(handles);
                browser.switchTo().window(handles[1]).then(function() {
                    make.infoTab.click();
                    expect(codeproject.codeInfotabHeading.getText()).toMatch('bq ZUM');
                    login.logout();
                    browser.close().then(browser.switchTo().window(handles[0]));

                });
            });
        });

    });

    it('bba-154:If redirect to /#/codeproject NO show toast', function() {

        codeproject.get();
        expect(commons.editToast.isPresent()).toBe(false);

    });

});
