'use strict';

var Login = require('../login/login.po.js'),
    Modals = require('../modals/modals.po.js'),
    Variables = require('../commons/variables.js'),
    Commons = require('../commons/commons.po.js'),
    Infotab = require('../bloqsproject/infotab/infotab.po.js'),
    Bloqsproject = require('../bloqsproject/make.po.js');

var login = new Login(),
    modals = new Modals(),
    vars = new Variables(),
    commons = new Commons(),
    infotab = new Infotab(),
    bloqsproject = new Bloqsproject();

var Codeproject = function() {

    this.url = '#/codeproject';
    this.codeInfotabChooseBoard = $('[data-element="infotab-chooseboard"]');
    this.codeInfotabHeading = $('[data-element="infotab-chooseboard-heading"]');

    this.get = function() {
        browser.get(this.url);
    };

    this.saveCodeProject = function(nameProject) {
        var nameSavedProject = nameProject || 'Test_Save_' + Number(new Date());
        this.get();
        infotab.infoTab.click();
        infotab.infotabProjectName.clear();
        infotab.infotabProjectName.sendKeys(nameSavedProject);
        browser.sleep(vars.timeToWaitAutoSave);
    };

    this.saveCodeProjectNewUser = function() {
        var user = login.loginWithRandomUser();
        var nameSavedProject = 'Test_Save_' + Number(new Date());
        bloqsproject.get();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        bloqsproject.softwareTab.click();
        bloqsproject.codeTab.click();
        bloqsproject.softwareEditCode.click();
        modals.modalAlertOk.click();
        browser.sleep(vars.timeToWaitAutoSave);
        commons.expectToastTimeOut(commons.editToast);
        bloqsproject.infoTab.click();
        expect(infotab.infotabProjectName.isPresent()).toBe(true);
        infotab.infotabProjectName.clear();
        infotab.infotabProjectName.sendKeys(nameSavedProject);
        browser.sleep(vars.timeToWaitAutoSave);
        //Create and check saved project
        return {
            projectName: nameSavedProject,
            user: user
        };
    };

    this.saveCodeProjectAndPublishNewUserAndLogout = function() {
        var user = login.loginWithRandomUser();
        var nameSavedProject = 'Test_Save_' + Number(new Date());
        bloqsproject.get();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        bloqsproject.softwareTab.click();
        bloqsproject.codeTab.click();
        bloqsproject.softwareEditCode.click();
        modals.modalAlertOk.click();
        browser.sleep(vars.timeToWaitAutoSave);
        commons.expectToastTimeOut(commons.editToast);
        bloqsproject.infoTab.click();
        expect(infotab.infotabProjectName.isPresent()).toBe(true);
        infotab.infotabProjectName.clear();
        infotab.infotabProjectName.sendKeys(nameSavedProject);
        browser.sleep(vars.timeToWaitAutoSave);
        bloqsproject.publishProject();
        browser.sleep(vars.timeToWaitAutoSave);
        login.logout();
        //Create and check saved project
        return {
            projectName: nameSavedProject,
            user: user
        };

    };

};

module.exports = Codeproject;
