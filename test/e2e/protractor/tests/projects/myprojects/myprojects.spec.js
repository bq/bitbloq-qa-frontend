/**
 *Spec to  para la tab de projects, es decir, para la pestaña de mis proyectos
 */

'use strict';

var Variables = require('../../commons/variables.js'),
    GlobalFunctions = require('../../commons/globalFunctions.js'),
    Make = require('../../bloqsproject/make.po.js'),
    Login = require('../../login/login.po.js'),
    Projects = require('../projects.po.js'),
    MyProjects = require('./myprojects.po.js'),
    Modals = require('../../modals/modals.po.js'),
    Infotab = require('../../bloqsproject/infotab/infotab.po.js'),
    MakeActions = require('../../bloqsproject/makeActions/makeActions.po.js'),
    Header = require('../../header/header.po.js'),
    Explore = require('../../explore/explore.po.js');

var vars = new Variables(),
    globalFunctions = new GlobalFunctions(),
    login = new Login(),
    make = new Make(),
    projects = new Projects(),
    myprojects = new MyProjects(),
    modals = new Modals(),
    infotab = new Infotab(),
    makeActions = new MakeActions(),
    header = new Header(),
    explore = new Explore();

globalFunctions.xmlReport('projects');

describe('My Projects', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    //TODO Check --> Alert (toast) && Create click into "Projecto sin titulo"
    it('bba-105:Correct elemination --> Create project and eliminate ', function() {

        //Create and check saved project
        var newLoginRandom = login.loginWithRandomUser();
        make.get();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        make.infoTab.click();
        infotab.infotabProjectName.clear();

        //Nombre del projecto
        var name = 'Test_Save_' + Number(new Date());
        infotab.infotabProjectName.sendKeys(name);
        browser.sleep(vars.timeToWaitAutoSave);

        //Comprobar que se ha guardado el projecto por el nombre
        projects.get();
        expect(projects.projectsName.getText()).toEqual(name);

        //Eliminar el projecto
        myprojects.overMyProjects.click();
        browser.sleep(vars.timeToWaitFadeModals);
        myprojects.eliminateMyProjects.click();
        browser.sleep(18000);
        //Comprobar que aparece la alerta de se ha eliminado
        //expect(projects.alert.isDisplayed()).toBeTruthy();

        login.logout();

        //Login with a user creator last project
        login.get();
        login.login(newLoginRandom.user, newLoginRandom.password);

        //Check no exist las project
        projects.get();
        expect(projects.projectsName.isPresent()).toBe(false);
        login.logout();

    });

    it('bba-58:Verify that the Search bar work correctly', function() {

        //Save and publish 2 project begining in test_save__ , and use name of one
        // make.saveProjectAndPublish(true);

        make.saveProjectAndPublishNewUserAndLogout().then(function(savedProject) {
            // promise because expect return promise
            make.saveProjectAndPublishUser(savedProject.user.user, savedProject.user.password).then(function(project) {
                projects.get();

                projects.findBar.clear().sendKeys(project.projectName).then(function() {
                    browser.sleep(2000);
                    projects.getProjectCount().then(function(result) {
                        expect(Number(result)).toEqual(1);
                    });
                });

                projects.findBar.clear().sendKeys('test_save_').then(function() {
                    browser.sleep(2000);
                    projects.getProjectCount().then(function(result) {
                        expect(Number(result) >= 1).toBeTruthy();
                    });
                });

                projects.findBar.clear().sendKeys('no_test' + Number(new Date())).then(function() {
                    browser.sleep(2000);
                    projects.getProjectCount().then(function(result) {
                        expect(Number(result)).toEqual(0);
                    });
                });
                login.logout();
                return true;
            });
        });

    });

    it('bba-44:Verify that the project can be published', function() {

        var nameProject = make.saveProjectNewUser().projectName;
        projects.get();
        var projectElem = projects.project;
        browser.actions().mouseMove(projectElem).perform();
        browser.sleep(6000);
        //Publish the project. Click on publish icon
        var icon = projectElem.$('[data-element="myprojects-footer-publish"]');
        icon.click();
        //confirm that we want publish our project.
        makeActions.publishButton.click();
        header.navExplore.click();
        //Check that the project is displayed in explora page.
        explore.exploreFind.clear().sendKeys(nameProject).then(function() {
            explore.exploreCounts.getText().then(function(value) {
                value = value.split('/');
                // Verify that it has a result
                expect(Number(value[1])).toEqual(1);
                header.navProjects.click();
                browser.actions().mouseMove(projectElem).perform();
                browser.sleep(6000);
                //Publish the project. Click on publish icon
                icon = projectElem.$('[data-element="myprojects-footer-private"]');
                icon.click();
                //confirm that we want publish our project.
                makeActions.privateButton.click();
                header.navExplore.click();
                //Check that the project isn't displayed in explora page.
                explore.exploreFind.clear().sendKeys(nameProject).then(function() {
                    explore.exploreCounts.getText().then(function(value) {
                        value = value.split('/');
                        // Verify that it hasn't any result
                        expect(Number(value[1])).toEqual(0);
                        login.logout();
                    });
                });

            });
        });

    });

});
