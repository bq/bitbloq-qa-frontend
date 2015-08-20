'use strict';

var Login = require('../login/login.po.js'),
    Projects = require('../projects/projects.po.js'),
    Variables = require('../commons/variables.js'),
    Modals = require('../modals/modals.po.js'),
    Infotab = require('./infotab/infotab.po.js');

var login = new Login(),
    modals = new Modals(),
    projects = new Projects(),
    vars = new Variables(),
    infotab = new Infotab();

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
};

module.exports = Make;
