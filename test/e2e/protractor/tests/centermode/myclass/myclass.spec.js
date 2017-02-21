'use strict';

var GlobalFunctions = require('../../commons/globalFunctions.js'),
    Header = require('../../header/header.po.js'),
    Variables = require('../../commons/variables.js'),
    Modals = require('../../modals/modals.po.js'),
    Login = require('../../login/login.po.js'),
    Centermode = require('../centermode.po.js'),
    Myclass = require('../myclass/myclass.po.js'),
    Mycenter = require('../mycenter/myCenter.po.js');

var globalFunctions = new GlobalFunctions(),
    header = new Header(),
    vars = new Variables(),
    modals = new Modals(),
    login = new Login(),
    centermode = new Centermode(),
    myclass = new Myclass(),
    mycenter = new Mycenter();

globalFunctions.xmlReport('myclass');

describe('My Class', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bbb-404:myclass:Create a group', function() {
        var headmaster = centermode.createHeadMaster('centermode');
        var teacher = centermode.createTeacher(headmaster);
        login.get();
        login.login(headmaster.user,headmaster.password);
        var idheadmaster = myclass.addNewGroup('prueba 404 headmaster');
        expect(myclass.groupsElems.count()).toBe(1);
        expect(myclass.groupsElems.get(0).getText()).toMatch(idheadmaster);
        login.logout();
        login.get();
        login.login(teacher.user,teacher.password);
        var idteacher = myclass.addNewGroup('prueba 404 teacher');
        expect(myclass.groupsElems.count()).toBe(1);
        expect(myclass.groupsElems.get(0).getText()).toMatch(idteacher);
        login.logout();
    });

    it('bbb-405:myclass:Create a group - The field is empty', function() {
        var headmaster = centermode.createHeadMaster('centermode');
        var headmaster2 = centermode.createHeadMaster('centermode2');

        login.get();
        login.login(headmaster.user,headmaster.password);
        header.navClass.click();
        browser.sleep(vars.timeToWaitTab);
        myclass.newGroupButton.click();
        browser.sleep(vars.timeToWaitFadeModals);
        expect(modals.okDialog.isEnabled()).toBe(false);
        modals.bladeClose.click();
        browser.sleep(vars.timeToWaitFadeModals);
        login.logout();
        browser.sleep(vars.timeToWaitTab);

        login.get();
        login.login(headmaster2.user,headmaster2.password);
        mycenter.addNewTeacher(headmaster.userEmail);
        login.logout();
        browser.sleep(vars.timeToWaitTab);
        login.get();
        login.login(headmaster.user,headmaster.password);
        header.navClass.click();
        browser.sleep(vars.timeToWaitTab);
        myclass.newGroupButton.click();
        browser.sleep(vars.timeToWaitFadeModals);
        expect(modals.okDialog.isEnabled()).toBe(false);
        modals.inputModalNoChangeN.sendKeys('example');
        browser.sleep(vars.timeToSendKeys);
        expect(modals.okDialog.isEnabled()).toBe(false);
        modals.inputModalNoChangeN.clear();
        modals.groupDropdown.click();
        element.all(by.xpath('//*[contains(@data-element,"my-center-dropdown")]')).first().click();
        expect(modals.okDialog.isEnabled()).toBe(false);
        modals.bladeClose.click();
        browser.sleep(vars.timeToWaitFadeModals);
        login.logout();
    });

    it('bbb-435:myclass:Create a group - The group already exists', function() {
        var headmaster = centermode.createHeadMaster('centermode');
        var teacher = centermode.createTeacher(headmaster);
        login.get();
        login.login(headmaster.user,headmaster.password);
        var idheadmaster = myclass.addNewGroup('prueba 404 headmaster');
        var idheadmaster2 = myclass.addNewGroup('prueba 404 headmaster');
        expect(myclass.groupsElems.count()).toBe(2);
        expect(myclass.groupsElems.get(0).getText()).toMatch(idheadmaster);
        expect(myclass.groupsElems.get(1).getText()).toMatch(idheadmaster2);
        login.logout();
        login.get();
        login.login(teacher.user,teacher.password);
        var idteacher = myclass.addNewGroup('prueba 404 teacher');
        var idteacher2 = myclass.addNewGroup('prueba 404 teacher');
        expect(myclass.groupsElems.count()).toBe(2);
        expect(myclass.groupsElems.get(0).getText()).toMatch(idteacher);
        expect(myclass.groupsElems.get(1).getText()).toMatch(idteacher2);
        login.logout();
    });
});
