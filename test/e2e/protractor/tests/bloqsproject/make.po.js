'use strict';

var Login = require('../login/login.po.js'),
    Variables = require('../commons/variables.js'),
    GlobalFunctions = require('../commons/globalFunctions.js'),
    Modals = require('../modals/modals.po.js'),
    Infotab = require('./infotab/infotab.po.js'),
    MakeActions = require('./makeActions/makeActions.po.js'),
    Hwtab = require('../bloqsproject/hwtab/hwtab.po.js'),
    ThirdPartyRobotsApi = require('../commons/api/ThirdPartyRobotsApi.js'),
    Bloqs = require('../bloqs/bloqs.po.js');

var login = new Login(),
    globalFunctions = new GlobalFunctions(),
    modals = new Modals(),
    vars = new Variables(),
    infotab = new Infotab(),
    makeActions = new MakeActions(),
    thirdPartyRobotsApi = new ThirdPartyRobotsApi(),
    bloqs = new Bloqs(),
    hwtab = new Hwtab(),
    flow = browser.controlFlow();

var Make = function () {

    this.hardwareTab = $('[data-element="hardware-tab"]');
    this.softwareTab = $('[data-element="software-tab"]');
    this.infoTab = $('[data-element="info-tab"]');
    this.bloqsTab = $('[data-element="bloqs-tab"]');
    this.codeTab = $('[data-element="code-tab"]');

    this.swToolboxFunctions = $('[data-element="sw-toolbox-functions"]');
    this.projectName = $('[data-element="project-name"]');
    this.hideBar = $('[data-element="hide-bar"]');
    this.url = '#/bloqsproject';
    this.savedMessageOK = $('[data-element="project-save-label-make-project-saved-ok"]');

    this.softwareEditCode = $('[data-element="software-edit-code"]');

    this.get = function () {
        browser.get(this.url);
    };

    this.saveProject = function (nameProject) {
        var nameSavedProject = nameProject || 'Test_Save_' + Number(new Date());
        this.get();
        this.infoTab.click();
        expect(infotab.infotabProjectName.isPresent()).toBe(true);
        this.projectName.click();
        modals.inputModalChangeN.clear();
        modals.inputModalChangeN.sendKeys(nameSavedProject);
        modals.okDialog.click();
        infotab.infotabDescription.sendKeys('Esto es una descripcion de ejemplo proyecto:' + nameSavedProject);
        browser.sleep(vars.timeToWaitAutoSave);
        return {
            projectName: nameSavedProject
        };
    };

    this.saveProjectNewUser = function (nameProject) {
        var user = login.loginWithRandomUser();
        var nameSavedProject = nameProject || 'Test_Save_' + Number(new Date());
        this.get();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        this.infoTab.click();
        expect(infotab.infotabProjectName.isPresent()).toBe(true);
        this.projectName.click();
        modals.inputModalChangeN.clear();
        modals.inputModalChangeN.sendKeys(nameSavedProject);
        modals.okDialog.click();
        infotab.infotabDescription.sendKeys('Esto es una descripcion de ejemplo proyecto:' + nameSavedProject);
        browser.sleep(vars.timeToWaitAutoSave);
        //Create and check saved project
        return {
            projectName: nameSavedProject,
            user: user
        };

    };

    this.saveProjectNewUserAndLogout = function () {
        var project = this.saveProjectNewUser();
        login.logout();
        return {
            projectName: project.projectName,
            user: project.userName
        };

    };

    this.saveProjectUser = function (user, password) {
        login.get();
        login.login(user, password);
        var project = this.saveProject();
        return {
            projectName: project.projectName
        };
    };

    this.saveProjectUserAndLogout = function (user, password) {
        login.login(user, password);
        var project = this.saveProject();
        login.logout();
        return {
            projectName: project.projectName
        };

    };

    this.saveProjectAndPublishNewUser = function () {
        var projectUser = this.saveProjectNewUser();
        browser.sleep(vars.timeToWaitAutoSave);
        var make = this;
        make.softwareTab.click();
        browser.sleep(vars.timeToWaitTab);
        bloqs.getBloqFunctions('bloq-return-function').then(function (bloque1) {
            bloqs.addToGroupVars(bloque1);
            bloqs.closeTab();
            browser.sleep(vars.timeToWaitAutoSave);
            make.publishProject();
            browser.sleep(vars.timeToWaitAutoSave);
        });
        return browser.wait(function () {
            return browser.getCurrentUrl().then(function (url) {
                return {
                    projectName: projectUser.projectName,
                    user: projectUser.user,
                    urlid: url
                };
            });
        }, 1000, ' browser.getCurrentUrl TimeOut');
    };

    this.saveProjectAndPublishNewUserAndLogout = function () {
        var projectUser = this.saveProjectNewUser();
        browser.sleep(vars.timeToWaitAutoSave);
        var make = this;
        make.softwareTab.click();
        browser.sleep(vars.timeToWaitTab);
        bloqs.getBloqFunctions('bloq-return-function').then(function (bloque1) {
            bloqs.addToGroupVars(bloque1);
            bloqs.closeTab();
            browser.sleep(vars.timeToWaitAutoSave);
            make.publishProject();
            browser.sleep(vars.timeToWaitAutoSave);
        });
        return browser.wait(function () {
            return browser.getCurrentUrl().then(function (url) {
                login.logout();
                return {
                    projectName: projectUser.projectName,
                    user: projectUser.user,
                    urlid: url
                };
            });
        }, 1000, ' browser.getCurrentUrl TimeOut');

    };

    this.saveProjectAndPublishUser = function (user, password) {
        var projectUser = this.saveProjectUser(user, password);
        browser.sleep(vars.timeToWaitAutoSave);
        var make = this;
        make.softwareTab.click();
        browser.sleep(vars.timeToWaitTab);
        bloqs.getBloqFunctions('bloq-return-function').then(function (bloque1) {
            bloqs.addToGroupVars(bloque1);
            bloqs.closeTab();
            browser.sleep(vars.timeToWaitAutoSave);
            make.publishProject();
            browser.sleep(vars.timeToWaitAutoSave);
        });
        return browser.wait(function () {
            return browser.getCurrentUrl().then(function (url) {
                return {
                    projectName: projectUser.projectName,
                    urlid: url
                };
            });
        }, 1000, ' browser.getCurrentUrl TimeOut');

    };

    this.saveProjectAndPublishUserAndLogout = function (user, password) {
        var projectUser = this.saveProjectUser(user, password);
        browser.sleep(vars.timeToWaitAutoSave);
        var make = this;
        make.softwareTab.click();
        browser.sleep(vars.timeToWaitTab);
        bloqs.getBloqFunctions('bloq-return-function').then(function (bloque1) {
            bloqs.addToGroupVars(bloque1);
            bloqs.closeTab();
            browser.sleep(vars.timeToWaitAutoSave);
            make.publishProject();
            browser.sleep(vars.timeToWaitAutoSave);
        });
        return browser.wait(function () {
            return browser.getCurrentUrl().then(function (url) {
                login.logout();
                return {
                    projectName: projectUser.projectName,
                    urlid: url
                };
            });
        }, 1000, ' browser.getCurrentUrl TimeOut');

    };

    this.publishProject = function () {
        makeActions.menuShare.click();
        browser.sleep(vars.timeToWaitMenu);
        makeActions.menuSharePublish.click();
        browser.sleep(vars.timeToWaitMenu);
        makeActions.publishButton.click();
    };

    this.publishProjectWithName = function (name) {

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

    this.importFile = function (file) {
        browser.get('#/bloqsproject');
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        file = globalFunctions.filePath(file);
        makeActions.inputUploadFile.sendKeys(file);
        return browser.sleep(vars.timeToWaitAutoSave);

    };

    this.importFileGuestUser = function (file) {
        browser.get('#/bloqsproject');
        modals.attentionContinueGuest.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        file = globalFunctions.filePath(file);
        makeActions.inputUploadFile.sendKeys(file);
        browser.sleep(vars.timeToWaitFadeModals);

    };

    this.importFileNewUser = function (file) {
        var user = login.loginWithRandomUser();
        return this.importFile(file).then(function () {
            return {
                user: user
            };
        });
    };

    this.importFileUserLogin = function (file, user) {
        login.login(user.user, user.password);
        browser.get('#/bloqsproject');
        file = globalFunctions.filePath(file);
        makeActions.inputUploadFile.sendKeys(file);
        browser.sleep(vars.timeToWaitFadeModals);
    };

    this.importFileUser = function (file) {
        browser.get('#/bloqsproject');
        file = globalFunctions.filePath(file);
        makeActions.inputUploadFile.sendKeys(file);
        browser.sleep(vars.timeToWaitFadeModals);
    };

    this.isProjectSavedShown = function () {
        var elem = element.all(by.xpath('//*[@data-element="project-save-label-make-project-saved-ok"]')).first();
        return elem.isPresent();
    };

    this.isProjectNotAllowSaveShown = function () {
        var elem = element.all(by.xpath('//*[@data-element="project-save-label-make-project-not-allow-to-save"]')).first();
        return elem.isPresent();
    };

    this.activateRobot = function (options) {
        options = options || {};
        flow.execute(thirdPartyRobotsApi['get' + options.robot + 'PersonalCode']).then(function (result) {
            console.log('result');
            console.log(result);
            modals.activateRobotCode1.sendKeys(result[0].code);
            modals.ok();
            browser.pause();

            expect(modals.activateRobotErrorText.isPresent()).toBe(false, 'Good code for mBot, error shouldnt appear');
            expect(hwtab.robotActivationInfoWindow.isDisplayed()).toBe(false, 'Activated robot/board still show a warning window ');

        });

    };
};

module.exports = Make;
