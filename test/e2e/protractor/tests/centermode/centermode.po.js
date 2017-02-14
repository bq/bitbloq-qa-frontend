'use strict';

var Login = require('../login/login.po.js'),
    Header = require('../header/header.po.js'),
    Variables = require('../commons/variables.js'),
    Modals = require('../modals/modals.po.js'),
    MyCenter = require('./mycenter/myCenter.po.js');

var login = new Login(),
    header = new Header(),
    modals = new Modals(),
    vars = new Variables(),
    mycenter = new MyCenter();

var CenterMode = function() {

    this.createHeadMaster = function() {
        var user = login.loginWithRandomUser(false);
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
        browser.sleep(vars.timeToWaitFadeModals);
        login.logout();
        return user;
    };

    this.createTeacher = function(headMaster) {
        var teacher = login.loginWithRandomUser(false);
        browser.sleep(vars.timeToWaitTab);
        login.logout();
        browser.sleep(vars.timeToWaitTab);
        login.get();
        login.login(headMaster.user,headMaster.password);
        mycenter.addNewTeacher(teacher.userEmail);
        login.logout();
        return teacher;
    };

    this.createStudent = function() {
        var student = login.loginWithRandomUser(false);
        browser.sleep(vars.timeToWaitTab);
        header.centerModeBanner.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.okDialog.click();
        modals.okDialog.click();
        browser.sleep(vars.timeToWaitFadeModals);
        login.logout();
        return student;
    };


};

module.exports = CenterMode;
