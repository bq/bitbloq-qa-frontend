'use strict';

var GlobalFunctions = require('../commons/globalFunctions.js'),
    Login = require('../login/login.po.js'),
    Modals = require('../modals/modals.po.js'),
    Header = require('../header/header.po.js'),
    Variables = require('../commons/variables.js'),
    Centermode = require('./centermode.po.js');

var globalFunctions = new GlobalFunctions(),
    login = new Login(),
    modals = new Modals(),
    header = new Header(),
    vars = new Variables(),
    centermode = new Centermode();

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

    it('bbb-391:centermode:Create a center with empty fields', function() {
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

    it('bbb-392:centermode:Create a center with wrong field', function() {
        login.loginWithRandomUser(false);
        browser.sleep(vars.timeToWaitTab);
        header.centerModeBanner.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.extraOkDialog.click();
        modals.inputNameCenter.sendKeys('hola');
        browser.sleep(vars.timeToSendKeys);
        modals.inputLocationCenter.sendKeys('dir');
        browser.sleep(vars.timeToSendKeys);
        modals.inputTelephoneCenter.sendKeys('ee');
        browser.sleep(vars.timeToSendKeys);
        modals.okDialog.click();
        expect(modals.inputNameCenter.getAttribute('class')).not.toContain('input--error');
        expect(modals.inputLocationCenter.getAttribute('class')).not.toContain('input--error');
        expect(modals.inputTelephoneCenter.getAttribute('class')).toContain('input--error');
        modals.bladeClose.click();
        browser.sleep(2000);
        login.logout();
    });

    it('bbb-393:centermode:The user use center mode', function() {
        login.loginWithRandomUser(false);
        browser.sleep(vars.timeToWaitTab);
        header.centerModeBanner.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.extraOkDialog.click();
        modals.inputNameCenter.sendKeys('hola');
        browser.sleep(vars.timeToSendKeys);
        modals.inputLocationCenter.sendKeys('dir');
        browser.sleep(vars.timeToSendKeys);
        modals.inputTelephoneCenter.sendKeys('555');
        browser.sleep(vars.timeToSendKeys);
        modals.okDialog.click();
        expect(header.centerModeBanner.isPresent()).toBe(false);
        browser.sleep(2000);
        login.logout();
    });

    it('bbb-394:centermode:The user doesnt use center mode', function() {
        login.loginWithRandomUser(false);
        browser.sleep(vars.timeToWaitTab);
        expect(header.centerModeBanner.isPresent()).toBe(true);
        expect(header.centerModeBanner.isDisplayed()).toBe(true);
        browser.sleep(2000);
        login.logout();
    });

    it('bbb-395:centermode:The tabs of center mode', function() {
        var headMaster = centermode.createHeadMaster();
        var teacher = centermode.createTeacher(headMaster);
        var student = centermode.createStudent();

        login.get();
        login.login(headMaster.user,headMaster.password);
        expect(header.navCenter.isDisplayed()).toBe(true);
        expect(header.navClass.isDisplayed()).toBe(true);
        expect(header.navExercise.isPresent()).toBe(false);
        expect(header.navCenter.all(by.css('a')).first().getAttribute('href')).toEqual(browser.baseUrl+'#/center-mode/center');
        expect(header.navClass.all(by.css('a')).first().getAttribute('href')).toEqual(browser.baseUrl+'#/center-mode/teacher');
        login.logout();

        login.get();
        login.login(teacher.user,teacher.password);
        expect(header.navCenter.isPresent()).toBe(false);
        expect(header.navClass.isDisplayed()).toBe(true);
        expect(header.navExercise.isPresent()).toBe(false);
        expect(header.navClass.all(by.css('a')).first().getAttribute('href')).toEqual(browser.baseUrl+'#/center-mode/teacher');
        login.logout();

        login.get();
        login.login(student.user,student.password);
        expect(header.navCenter.isPresent()).toBe(false);
        expect(header.navClass.isPresent()).toBe(false);
        expect(header.navExercise.isDisplayed()).toBe(true);
        expect(header.navExercise.all(by.css('a')).first().getAttribute('href')).toEqual(browser.baseUrl+'#/center-mode/student');
        login.logout();
    });

});
