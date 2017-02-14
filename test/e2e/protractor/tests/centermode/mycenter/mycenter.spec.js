'use strict';

var GlobalFunctions = require('../../commons/globalFunctions.js'),
    Login = require('../../login/login.po.js'),
    Variables = require('../../commons/variables.js'),
    MyCenter = require('./myCenter.po.js'),
    Header = require('../../header/header.po.js');

var globalFunctions = new GlobalFunctions(),
    login = new Login(),
    vars = new Variables(),
    mycenter = new MyCenter(),
    header = new Header();

globalFunctions.xmlReport('centermode');

describe('Center mode', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bbb-396:centermode:Order the teacher', function() {
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
});
