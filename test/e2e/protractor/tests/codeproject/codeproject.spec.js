'use strict';

var Codeproject = require('./codeproject.po.js'),
    GlobalFunctions = require('../commons/globalFunctions.js'),
    Commons = require('../commons/commons.po.js'),
    Login = require('../login/login.po.js'),
    Make = require('../bloqsproject/make.po.js'),
    Modals = require('../modals/modals.po.js'),
    Variables = require('../commons/variables.js');

var codeproject = new Codeproject(),
    globalFunctions = new GlobalFunctions(),
    commons = new Commons(),
    login = new Login(),
    make = new Make(),
    modals = new Modals(),
    vars = new Variables();

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

        browser.ignoreSynchronization = true;
        browser.sleep(3000);
        expect(commons.editToast.isDisplayed()).toBe(true);
        browser.ignoreSynchronization = false;

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

    xit('bba-131:Verify wit LOGIN user, undo change in TOAST (before create bloqsproject)', function() {

        //Check modal show first time
        make.saveProjectNewUser();
        make.softwareTab.click();
        make.codeTab.click();
        make.softwareEditCode.click();

        modals.modalAlertOk.click();

        //login.logout

    });

    xit('bba-150:We can change the board in the info tab', function() {

    });

    it('bba-154:If redirect to /#/codeproject NO show toast', function() {

        codeproject.get();
        expect(commons.editToast.isPresent()).toBe(false);

    });

});
