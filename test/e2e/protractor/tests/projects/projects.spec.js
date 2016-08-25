/**
 *Spec to  para la tab de projects
 */

'use strict';

var GlobalFunctions = require('../commons/globalFunctions.js'),
    Projects = require('./projects.po.js'),
    Header = require('../header/header.po.js'),
    Variables = require('../commons/variables.js'),
    Help = require('../help/help.po.js'),
    Explore = require('../explore/explore.po.js'),
    Login = require('../login/login.po.js');

var globalFunctions = new GlobalFunctions(),
    projects = new Projects(),
    header = new Header(),
    vars = new Variables(),
    help = new Help(),
    explore = new Explore(),
    login = new Login();

globalFunctions.xmlReport('projects');

describe('Projects', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bbb-39:projects:New project button only appears in projects tab', function() {
        //search for the new project button w/ registered user
        login.loginWithRandomUser();
        expect(projects.newProject.isPresent()).toBe(true);
        projects.sharedProjects.click();
        expect(projects.newProject.isPresent()).toBe(true);
        header.navExplore.click();
        browser.sleep(vars.timeToWaitTab);
        expect(projects.newProject.isPresent()).toBe(false);
        header.navForum.click();
        browser.sleep(vars.timeToWaitTab);
        expect(projects.newProject.isPresent()).toBe(false);
        header.navLearn.click();
        expect(projects.newProject.isPresent()).toBe(false);
        //help.changelogTab.click();
        //expect(projects.newProject.isPresent()).toBe(false);
        login.logout();
        //search for new project button w/ unregistered user
        //you cannot get to projects without login
        projects.get();
        expect(browser.getCurrentUrl()).toMatch(login.url);
        explore.get();
        browser.sleep(vars.timeToWaitTab);
        expect(projects.newProject.isPresent()).toBe(false);
        header.navForum.click();
        browser.sleep(vars.timeToWaitTab);
        expect(projects.newProject.isPresent()).toBe(false);
        header.navLearn.click();
        expect(projects.newProject.isPresent()).toBe(false);
        //help.changelogTab.click();
        //expect(projects.newProject.isPresent()).toBe(false);

    });

});
