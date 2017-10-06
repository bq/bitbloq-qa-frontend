/**
 *Spec to walkthrough
 */

'use strict';

var GlobalFunctions = require('../../commons/globalFunctions.js'),
    Make = require('../make.po.js'),
    Login = require('../../login/login.po.js'),
    Walkthrough = require('./walkthrough.po.js'),
    Modals = require('../../modals/modals.po.js');

var globalFunctions = new GlobalFunctions(),
    make = new Make(),
    modals = new Modals(),
    walkthrough = new Walkthrough(),
    login = new Login();

globalFunctions.xmlReport('bloqsprojectWalkthrough');

describe('Walkthrough', function () {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bbb-73:bloqsprojectWalkthrough:not logged in user', function () {
        make.get();
        modals.attentionContinueGuest.click();
        modals.acceptTour.click();
        browser.sleep(500);
        expect(walkthrough.stepOne.isDisplayed()).toBeTruthy();
        walkthrough.boards.click();
        expect(walkthrough.stepTwo.isDisplayed()).toBeTruthy();
    });

    it('bbb-74:bloqsprojectWalkthrough:logged in user did not finish walkthrough', function () {
        var userLogin = login.loginWithRandomUser();
        make.get();
        modals.acceptTour.click();
        browser.sleep(500);
        expect(walkthrough.stepOne.isDisplayed()).toBeTruthy();
        login.logout();
        login.get();
        login.login({ 'user': userLogin.user, 'password': userLogin.password });
        make.get();
        expect(modals.acceptTour.isDisplayed()).toBe(true);
        modals.rejectTour();
        browser.sleep(1000);
        login.logout();
    });

    it('bbb-75:bloqsprojectWalkthrough:logged in user rejected walkthrough', function () {
        var userLogin = login.loginWithRandomUser();
        make.get();
        modals.rejectTour();
        browser.sleep(500);
        expect(walkthrough.stepOne.isDisplayed()).toBe(false);
        login.logout();
        login.get();
        login.login({ 'user': userLogin.user, 'password': userLogin.password });
        make.get();
        browser.sleep(500);
        make.softwareTab.click();
        login.logout();
    });
});
