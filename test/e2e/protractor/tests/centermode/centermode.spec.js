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
        login.loginWithRandomUser(false);
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
        expect(header.navExercise.isPresent()).toBe(false);
        expect(header.navCenter.all(by.css('a')).first().getAttribute('href')).toEqual(browser.baseUrl+'#/center-mode/center');
        expect(header.navClass.all(by.css('a')).first().getAttribute('href')).toEqual(browser.baseUrl+'#/center-mode/teacher');
        login.logout();
    });

    it('bbb-390:centermode:Create a center - <14', function() {
        login.loginWithRandomUser(true);
        browser.sleep(vars.timeToWaitTab);
        header.centerModeBanner.click();
        browser.sleep(vars.timeToWaitFadeModals);
        expect(modals.extraOkDialog.isPresent()).toBe(false);
        expect(modals.okDialog.isDisplayed()).toBe(true);
        modals.okDialog.click();
        modals.okDialog.click();
        expect(header.navCenter.isPresent()).toBe(false);
        expect(header.navClass.isPresent()).toBe(false);
        expect(header.navExercise.isPresent()).toBe(true);
        expect(header.navExercise.all(by.css('a')).first().getAttribute('href')).toEqual(browser.baseUrl+'#/center-mode/student');
        login.logout();
    });

    it('bbb-391:centermode:The user doesnt use the center mode', function() {
        login.loginWithRandomUser(false);
        browser.sleep(vars.timeToWaitTab);
        header.centerModeBanner.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.extraOkDialog.click();
        modals.okDialog.click();
        expect(modals.inputNameCenter.getAttribute('class')).toContain('input--error');
        expect(modals.inputLocationCenter.getAttribute('class')).toContain('input--error');
        expect(modals.inputTelephoneCenter.getAttribute('class')).toContain('input--error');
        modals.inputNameCenter.sendKeys('hola');
        browser.sleep(vars.timeToSendKeys);
        modals.okDialog.click();
        expect(modals.inputNameCenter.getAttribute('class')).not.toContain('input--error');
        expect(modals.inputLocationCenter.getAttribute('class')).toContain('input--error');
        expect(modals.inputTelephoneCenter.getAttribute('class')).toContain('input--error');
        modals.inputNameCenter.clear();
        modals.inputLocationCenter.sendKeys('dir');
        browser.sleep(vars.timeToSendKeys);
        modals.okDialog.click();
        expect(modals.inputNameCenter.getAttribute('class')).toContain('input--error');
        expect(modals.inputLocationCenter.getAttribute('class')).not.toContain('input--error');
        expect(modals.inputTelephoneCenter.getAttribute('class')).toContain('input--error');
        modals.inputNameCenter.clear();
        modals.inputLocationCenter.clear();
        modals.inputTelephoneCenter.sendKeys('333333333');
        browser.sleep(vars.timeToSendKeys);
        modals.okDialog.click();
        expect(modals.inputNameCenter.getAttribute('class')).toContain('input--error');
        expect(modals.inputLocationCenter.getAttribute('class')).toContain('input--error');
        expect(modals.inputTelephoneCenter.getAttribute('class')).not.toContain('input--error');
        modals.bladeClose.click();
        browser.sleep(2000);
        login.logout();
    });

});
