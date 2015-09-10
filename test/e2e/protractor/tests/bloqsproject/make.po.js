'use strict';

var Login = require('../login/login.po.js'),
    Projects = require('../projects/projects.po.js'),
    Variables = require('../commons/variables.js'),
    Modals = require('../modals/modals.po.js'),
    Infotab = require('./infotab/infotab.po.js'),
    Header = require('../header/header.po.js'),
    MakeActions = require('./makeActions/makeActions.po.js');

var login = new Login(),
    modals = new Modals(),
    projects = new Projects(),
    vars = new Variables(),
    infotab = new Infotab(),
    header = new Header(),
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

    this.get = function() {
        browser.get('#/bloqsproject');
    };

    //@noLogout --> If true no logout && no check prjects && return name project and user
    this.saveProject = function(noLogout) {
        //Create and check saved project
        var nameSavedProject = 'Test_Save_' + Number(new Date());
        var userName = login.loginWithRandomUser();
        this.get();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        this.infoTab.click();
        expect(infotab.infotabProjectName.isPresent()).toBe(true);
        infotab.infotabProjectName.clear();
        infotab.infotabProjectName.sendKeys(nameSavedProject);
        browser.sleep(vars.timeToWaitAutoSave);
        if (noLogout) {
            return {
                projectName: nameSavedProject,
                user: userName
            };
        } else {
            projects.get();
            expect(projects.projectsName.isPresent()).toBe(true);
            expect(projects.projectsName.getText()).toEqual(nameSavedProject);
            login.logout();
        }

    };
    //@first --> if true when the user doesn't have a project
    //@publish --> if true when you want publish the project
    this.saveProjectAndPublish = function(first,publish) {
        var that = this;
        var nameSavedProject = 'Test_Save__' + Number(new Date());
        header.createNewProject();
        browser.getAllWindowHandles().then(function(handles) {
            browser.sleep(vars.timeToWaitTab);
            browser.switchTo().window(handles[1]).then(function(){
                if (first) {
                    modals.rejectTour();
                    browser.sleep(vars.timeToWaitFadeModals); 
                }
                that.infoTab.click();
                expect(infotab.infotabProjectName.isPresent()).toBe(true);
                infotab.infotabProjectName.clear();
                infotab.infotabProjectName.sendKeys(nameSavedProject);
                browser.sleep(vars.timeToWaitAutoSave);
                if (publish) {
                    makeActions.publishProject();
                }
                browser.close().then(function() {
                    browser.switchTo().window(handles[0]);
                });
            });
        });
        return nameSavedProject;   
    };
};

module.exports = Make;