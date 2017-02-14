'use strict';

var GlobalFunctions = require('../../commons/globalFunctions.js'),
    Login = require('../../login/login.po.js'),
    Variables = require('../../commons/variables.js'),
    MyCenter = require('./myCenter.po.js'),
    Header = require('../../header/header.po.js'),
    Centermode = require('../centermode.po.js'),
    Modals = require('../../modals/modals.po.js');

var globalFunctions = new GlobalFunctions(),
    login = new Login(),
    vars = new Variables(),
    mycenter = new MyCenter(),
    header = new Header(),
    centermode = new Centermode(),
    modals = new Modals();

globalFunctions.xmlReport('mycenter');

describe('My center', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bbb-396:mycenter:Order the teacher', function() {
        var headMasterEmail = 'usertest148706146881447583@devfakebq.es';
        var headMasterPass = 'prueba';
        login.get();
        login.login(headMasterEmail,headMasterPass);
        browser.sleep(vars.timeToWaitTab);
        header.navCenter.click();
        browser.sleep(vars.timeToWaitTab);
        expect(element.all(by.repeater('item in teachers').row(0)).getText()).toMatch(vars.emailFb.toLowerCase());
        expect(element.all(by.repeater('item in teachers').row(1)).getText()).toMatch(vars.userGoogleTwo.toLowerCase());
        expect(element.all(by.repeater('item in teachers').row(2)).getText()).toMatch(vars.userGoogle.toLowerCase());
        expect(element.all(by.repeater('item in teachers').row(3)).getText()).toMatch(headMasterEmail);
        mycenter.teacherDropdownOrder.click();
        mycenter.teacherEmailDropdown.click();
        browser.sleep(vars.timeToWaitFadeModals);
        expect(element.all(by.repeater('item in teachers').row(0)).getText()).toMatch(vars.userGoogle.toLowerCase());
        expect(element.all(by.repeater('item in teachers').row(1)).getText()).toMatch(vars.userGoogleTwo.toLowerCase());
        expect(element.all(by.repeater('item in teachers').row(2)).getText()).toMatch(headMasterEmail);
        expect(element.all(by.repeater('item in teachers').row(3)).getText()).toMatch(vars.emailFb.toLowerCase());
        mycenter.teacherDropdownOrder.click();
        mycenter.teacherNameDropdown.click();
        browser.sleep(vars.timeToWaitFadeModals);
        expect(element.all(by.repeater('item in teachers').row(0)).getText()).toMatch(headMasterEmail);
        expect(element.all(by.repeater('item in teachers').row(1)).getText()).toMatch(vars.userGoogleTwo.toLowerCase());
        expect(element.all(by.repeater('item in teachers').row(2)).getText()).toMatch(vars.emailFb.toLowerCase());
        expect(element.all(by.repeater('item in teachers').row(3)).getText()).toMatch(vars.userGoogle.toLowerCase());
        mycenter.teacherDropdownOrder.click();
        mycenter.teacherSurnameDropdown.click();
        browser.sleep(vars.timeToWaitFadeModals);
        expect(element.all(by.repeater('item in teachers').row(0)).getText()).toMatch(headMasterEmail);
        expect(element.all(by.repeater('item in teachers').row(1)).getText()).toMatch(vars.userGoogleTwo.toLowerCase());
        expect(element.all(by.repeater('item in teachers').row(2)).getText()).toMatch(vars.emailFb.toLowerCase());
        expect(element.all(by.repeater('item in teachers').row(3)).getText()).toMatch(vars.userGoogle.toLowerCase());
        mycenter.teacherDropdownOrder.click();
        mycenter.teacherGroupsDropdown.click();
        browser.sleep(vars.timeToWaitFadeModals);
        expect(element.all(by.repeater('item in teachers').row(0)).getText()).toMatch(headMasterEmail);
        expect(element.all(by.repeater('item in teachers').row(1)).getText()).toMatch(vars.emailFb.toLowerCase());
        expect(element.all(by.repeater('item in teachers').row(2)).getText()).toMatch(vars.userGoogleTwo.toLowerCase());
        expect(element.all(by.repeater('item in teachers').row(3)).getText()).toMatch(vars.userGoogle.toLowerCase());
        mycenter.teacherDropdownOrder.click();
        mycenter.teacherStudentsDropdown.click();
        browser.sleep(vars.timeToWaitFadeModals);
        expect(element.all(by.repeater('item in teachers').row(0)).getText()).toMatch(headMasterEmail);
        expect(element.all(by.repeater('item in teachers').row(1)).getText()).toMatch(vars.emailFb.toLowerCase());
        expect(element.all(by.repeater('item in teachers').row(2)).getText()).toMatch(vars.userGoogleTwo.toLowerCase());
        expect(element.all(by.repeater('item in teachers').row(3)).getText()).toMatch(vars.userGoogle.toLowerCase());
        browser.sleep(vars.timeToWaitTab);
        login.logout();
    });

    it('bbb-397:mycenter:Create a teacher - VALID', function() {
        var headmaster = centermode.createHeadMaster();
        var teacher = centermode.createTeacher(headmaster);
        login.get();
        login.login(teacher.user,teacher.password);
        browser.sleep(vars.timeToWaitTab);
        expect(header.navCenter.isPresent()).toBe(false);
        expect(header.navClass.isDisplayed()).toBe(true);
        expect(header.navExercise.isPresent()).toBe(false);
        expect(header.navClass.all(by.css('a')).first().getAttribute('href')).toEqual(browser.baseUrl+'#/center-mode/teacher');
        login.logout();
        login.get();
        login.login(headmaster.user,headmaster.password);
        browser.sleep(vars.timeToWaitTab);
        header.navCenter.click();
        browser.sleep(vars.timeToWaitTab);
        expect(element.all(by.repeater('item in teachers').row(0)).getText()).toMatch(teacher.userEmail.toLowerCase());
        login.logout();
    });

    it('bbb-399:mycenter:Create a teacher - Wrong email', function() {
        var headmaster = centermode.createHeadMaster();
        login.get();
        login.login(headmaster.user,headmaster.password);
        browser.sleep(vars.timeToWaitTab);
        header.navCenter.click();
        browser.sleep(vars.timeToWaitTab);
        mycenter.newTeacherButton.click();
        modals.inputEmailsTeacher.all(by.css('input')).get(0).sendKeys('emailes');
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        var email = modals.inputEmailsTeacher.all(by.css('input')).get(0);
        expect(email.getAttribute('class')).toContain('invalid-tag');
        modals.okDialog.click();
        browser.sleep(vars.timeToWaitTab);
        login.logout();
    });

    it('bbb-399:mycenter:Create a teacher - Wrong email', function() {
        var headmaster = centermode.createHeadMaster();
        login.get();
        login.login(headmaster.user,headmaster.password);
        browser.sleep(vars.timeToWaitTab);
        header.navCenter.click();
        browser.sleep(vars.timeToWaitTab);
        mycenter.newTeacherButton.click();
        modals.inputEmailsTeacher.all(by.css('input')).get(0).sendKeys('emailfake@prueba.es');
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        modals.okDialog.click();
        browser.sleep(vars.timeToWaitFadeModals);
        login.logout();
    });
});
