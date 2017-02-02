'use strict';

var GlobalFunctions = require('../commons/globalFunctions.js'),
    Login = require('../login/login.po.js'),
    Modals = require('../modals/modals.po.js'),
    Header = require('../header/header.po.js'),
    Variables = require('../commons/variables.js');

var globalFunctions = new GlobalFunctions(),
    login = new Login(),
    modals = new Modals(),
    header = new Header(),
    vars = new Variables();

globalFunctions.xmlReport('centermode');

describe('Center mode', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bbb-389:centermode:Create a center', function() {
        login.loginWithRandomUser();
        browser.sleep(vars.timeToWaitTab);
        header.centerModeBanner.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.extraOkDialog.click();
        modals.inputNameCenter.sendKeys('hola');
        browser.sleep(vars.timeToSendKeys);
        modals.inputLocationCenter.sendKeys('dir');
        browser.sleep(vars.timeToSendKeys);
        modals.inputTelephoneCenter.sendKeys('333333333');
        browser.sleep(vars.timeToSendKeys);
        modals.okDialog.click();
        browser.sleep(vars.timeToWaitTab);
        expect(header.navCenter.isDisplayed()).toBe(true);
        expect(header.navClass.isDisplayed()).toBe(true);
        expect(header.navCenter.all(by.css('a')).first().getAttribute('href')).toEqual(browser.baseUrl+'#/center-mode/center');
        expect(header.navClass.all(by.css('a')).first().getAttribute('href')).toEqual(browser.baseUrl+'#/center-mode/teacher');
    });




});
