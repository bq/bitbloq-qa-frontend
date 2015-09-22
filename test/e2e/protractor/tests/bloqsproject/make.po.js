'use strict';

var Login = require('../login/login.po.js'),
    Projects = require('../projects/projects.po.js'),
    Variables = require('../commons/variables.js'),
    Modals = require('../modals/modals.po.js'),
    Infotab = require('./infotab/infotab.po.js'),
    MakeActions = require('./makeActions/makeActions.po.js');

var login = new Login(),
    modals = new Modals(),
    projects = new Projects(),
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

    this.swToolboxFunctions = $('[data-element="sw-toolbox-functions"]');
    this.projectName = $('[data-element="project-name"]');
    this.hideBar = $('[data-element="hide-bar"]');
    this.url=  '#/bloqsproject';

    this.get = function() {
        browser.get(this.url);
    };


    /*
     * @noLogout {boolean} --> If true no logout && no check prjects && return name project and user
     * @isLogin {boolean} True if it is login before
     *  If user and password is undefined login with random user, unless login and save with user
     * @user {string} user login
     * @password {string} password login
    */
    this.saveProject = function(noLogout, isLogin, user, password) {

        var nameSavedProject = 'Test_Save_' + Number(new Date());

        if (typeof user === 'undefined' || typeof password === 'undefined') {

            //Create and check saved project
            var userName = login.loginWithRandomUser();
            this.get();
            modals.rejectTour();
            browser.sleep(vars.timeToWaitFadeModals);
            this.infoTab.click();
            expect(infotab.infotabProjectName.isPresent()).toBe(true);
            infotab.infotabProjectName.clear();
            infotab.infotabProjectName.sendKeys(nameSavedProject);
            browser.sleep(vars.timeToWaitAutoSave);
            if (!noLogout) {
                projects.get();
                expect(projects.projectsName.isPresent()).toBe(true);
                expect(projects.projectsName.getText()).toEqual(nameSavedProject);
                login.logout();
            }
            return {
                projectName: nameSavedProject,
                user: userName
            };
        } else {
            if (!isLogin) {
                login.login(user, password);
            }
            this.get();

            if (!isLogin) {
                modals.rejectTour();
            }
            browser.sleep(vars.timeToWaitFadeModals);
            this.infoTab.click();
            expect(infotab.infotabProjectName.isPresent()).toBe(true);
            infotab.infotabProjectName.clear();
            infotab.infotabProjectName.sendKeys(nameSavedProject);
            browser.sleep(vars.timeToWaitAutoSave);
            if (!noLogout) {
                projects.get();
                expect(projects.projectsName.isPresent()).toBe(true);
                expect(projects.projectsName.getText()).toEqual(nameSavedProject);
                login.logout();
            }
            return {
                projectName: nameSavedProject,
                user: user
            };

        }

    };


    /*
     * @noLogout {boolean} --> If true no logout && no check prjects && return name project and user
     * @isLogin {boolean} True if it is login before
     *  If user and password is undefined login with random user, unless login and save with user
     * @user {string} user login
     * @password {string} password login
    */
    this.saveProjectAndPublish = function(noLogout, isLogin, user, password) {
        var that = this,
            project;

        if (typeof user === 'undefined' || typeof password === 'undefined') {
            project = that.saveProject(true);
            makeActions.publishProject();
            browser.sleep(vars.timeToWaitAutoSave);

            return browser.wait(function() {
                return browser.getCurrentUrl().then(function(url) {
                    if (!noLogout) {
                        login.logout();
                    }
                    return {
                        projectName: project.projectName,
                        user: project.user,
                        urlid: url
                    };
                });
            }, 1000, ' browser.getCurrentUrl TimeOut');
        } else {
            project = that.saveProject(true, isLogin, user, password);
            makeActions.publishProject();
            browser.sleep(vars.timeToWaitAutoSave);

            return browser.wait(function() {
                return browser.getCurrentUrl().then(function(url) {
                    if (!noLogout) {
                        login.logout();
                    }
                    return {
                        projectName: project.projectName,
                        user: user,
                        urlid: url
                    };
                });
            }, 1000, ' browser.getCurrentUrl TimeOut');

        }

    };

};

module.exports = Make;
