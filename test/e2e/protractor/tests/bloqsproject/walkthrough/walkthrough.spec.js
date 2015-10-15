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

globalFunctions.xmlReport('Walkthrough');

describe('Walkthrough', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bba-118:not logged in user', function() {
        make.get();
        modals.attentionContinueGuest.click();
        modals.acceptTour.click();
        browser.sleep(500);
        expect(walkthrough.stepOne.isDisplayed()).toBeTruthy();
        walkthrough.boards.click();
        expect(walkthrough.stepTwo.isDisplayed()).toBeTruthy();
    });

    it('bba-120:logged in user did not finish walkthrough', function() {
        var userLogin = login.loginWithRandomUser();
        make.get();
        modals.acceptTour.click();
        browser.sleep(500);
        expect(walkthrough.stepOne.isDisplayed()).toBeTruthy();
        login.logout();
        login.get();
        login.login(userLogin.user, userLogin.password);
        make.get();
        expect(modals.acceptTour.isDisplayed()).toBe(true);
        login.logout();
    });

    it('bba-121:logged in user rejected walkthrough', function() {
        var userLogin = login.loginWithRandomUser();
        make.get();
        modals.rejectTour();
        browser.sleep(500);
        expect(walkthrough.stepOne.isDisplayed()).toBe(false);
        login.logout();
        login.get();
        login.login(userLogin.user, userLogin.password);
        make.get();
        browser.sleep(500);
        make.softwareTab.click();
        login.logout();
    });
});
