'use strict';

var Login = require('../login/login.po.js'),
    Variables = require('../commons/variables.js'),
    GlobalFunctions = require('../commons/globalFunctions.js'),
    Modals = require('../modals/modals.po.js'),
    Infotab = require('./infotab/infotab.po.js'),
    MakeActions = require('./makeActions/makeActions.po.js');

var login = new Login(),
    globalFunctions = new GlobalFunctions(),
    modals = new Modals(),
    vars = new Variables(),
    infotab = new Infotab(),
    makeActions = new MakeActions();

var Make = function() {

    this.hardwareTab = $('[data-element="hardware-tab"]');
    this.softwareTab = $('[data-element="software-tab"]');
    this.infoTab = $('[data-element="info-tab"]');

    this.bloqsTab = $('[data-element="bloqs-tab"]');
    this.codeTab = $('[data-element="code-tab"]');
    this.projectSave = $('[data-element="project-saved"]');
    this.projectNotAllowSave = $('[data-element="project-not-allow-save"]');

    this.swToolboxFunctions = $('[data-element="sw-toolbox-functions"]');
    this.projectName = $('[data-element="project-name"]');
    this.hideBar = $('[data-element="hide-bar"]');
    this.url = '#/bloqsproject';

    this.softwareEditCode = $('[data-element="software-edit-code"]');

    this.get = function() {
        browser.get(this.url);
    };

    this.saveProject = function(nameProject) {
        var nameSavedProject = nameProject || 'Test_Save_' + Number(new Date());
        this.get();
        this.infoTab.click();
        expect(infotab.infotabProjectName.isPresent()).toBe(true);
        infotab.infotabProjectName.clear();
        infotab.infotabProjectName.sendKeys(nameSavedProject);
        browser.sleep(vars.timeToWaitAutoSave);
        return {
            projectName: nameSavedProject
        };
    };

    this.saveProjectNewUser = function(nameProject) {
        var user = login.loginWithRandomUser();
        var nameSavedProject = nameProject || 'Test_Save_' + Number(new Date());
        this.get();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        this.infoTab.click();
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

    this.saveProjectNewUserAndLogout = function() {
        var project = this.saveProjectNewUser();
        login.logout();
        return {
            projectName: project.projectName,
            user: project.userName
        };

    };

    this.saveProjectUser = function(user, password) {
        login.get();
        login.login(user, password);
        var project = this.saveProject();
        return {
            projectName: project.projectName
        };
    };

    this.saveProjectUserAndLogout = function(user, password) {
        login.login(user, password);
        var project = this.saveProject();
        login.logout();
        return {
            projectName: project.projectName
        };

    };

    this.saveProjectAndPublishNewUser = function() {
        var projectUser = this.saveProjectNewUser();
        this.publishProject();
        return browser.wait(function() {
            return browser.getCurrentUrl().then(function(url) {
                return {
                    projectName: projectUser.projectName,
                    user: projectUser.user,
                    urlid: url
                };
            });
        }, 1000, ' browser.getCurrentUrl TimeOut');

    };

    this.saveProjectAndPublishNewUserAndLogout = function() {
        var projectUser = this.saveProjectNewUser();
        this.publishProject();
        browser.sleep(vars.timeToWaitAutoSave);
        return browser.wait(function() {
            return browser.getCurrentUrl().then(function(url) {
                login.logout();
                return {
                    projectName: projectUser.projectName,
                    user: projectUser.user,
                    urlid: url
                };
            });
        }, 1000, ' browser.getCurrentUrl TimeOut');

    };

    this.saveProjectAndPublishUser = function(user, password) {
        var projectUser = this.saveProjectUser(user, password);
        browser.sleep(vars.timeToWaitAutoSave);
        this.publishProject();
        browser.sleep(vars.timeToWaitAutoSave);
        return browser.wait(function() {
            return browser.getCurrentUrl().then(function(url) {
                return {
                    projectName: projectUser.projectName,
                    urlid: url
                };
            });
        }, 1000, ' browser.getCurrentUrl TimeOut');

    };

    this.saveProjectAndPublishUserAndLogout = function(user, password) {
        var projectUser = this.saveProjectUser(user, password);
        this.publishProject();
        browser.sleep(vars.timeToWaitAutoSave);
        return browser.wait(function() {
            return browser.getCurrentUrl().then(function(url) {
                login.logout();
                return {
                    projectName: projectUser.projectName,
                    urlid: url
                };
            });
        }, 1000, ' browser.getCurrentUrl TimeOut');

    };

    this.publishProject = function() {
        makeActions.menuShare.click();
        browser.sleep(vars.timeToWaitMenu);
        makeActions.menuSharePublish.click();
        browser.sleep(vars.timeToWaitMenu);
        makeActions.publishButton.click();
    };

    this.publishProjectWithName = function(name) {

        makeActions.menuFile.click();
        browser.sleep(vars.timeToWaitMenu);
        makeActions.menuChangeName.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.inputModalChangeN.clear();
        modals.inputModalChangeN.sendKeys(name);
        modals.okDialog.click();
        browser.sleep(vars.timeToWaitAutoSave);
        makeActions.menuShare.click();
        browser.sleep(vars.timeToWaitMenu);
        makeActions.menuSharePublish.click();
        browser.sleep(vars.timeToWaitMenu);
        makeActions.publishButton.click();
    };

    this.importFile = function(file) {
        browser.get('#/bloqsproject');
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        file = globalFunctions.filePath(file);
        makeActions.inputUploadFile.sendKeys(file);
        return browser.sleep(vars.timeToWaitAutoSave);

    };

    this.importFileGuestUser = function(file) {
        browser.get('#/bloqsproject');
        modals.attentionContinueGuest.click();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        file = globalFunctions.filePath(file);
        makeActions.inputUploadFile.sendKeys(file);
        browser.sleep(vars.timeToWaitFadeModals);

    };

    this.importFileNewUser = function(file) {
        var user = login.loginWithRandomUser();
        return this.importFile(file).then(function() {
            return {
                user: user
            };
        });
    };

    this.importFileUserLogin = function(file, user) {
        login.login(user.user, user.password);
        browser.get('#/bloqsproject');
        file = globalFunctions.filePath(file);
        makeActions.inputUploadFile.sendKeys(file);
        browser.sleep(vars.timeToWaitFadeModals);
    };

    this.importFileUser = function(file) {
        browser.get('#/bloqsproject');
        file = globalFunctions.filePath(file);
        makeActions.inputUploadFile.sendKeys(file);
        browser.sleep(vars.timeToWaitFadeModals);
    };
};

module.exports = Make;
