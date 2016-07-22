/**
 * Spec to explore.html
 */

'use strict';
/* jshint loopfunc: true */

var GlobalFunctions = require('../commons/globalFunctions.js'),
    Explore = require('../explore/explore.po.js'),
    Landing = require('../landing/landing.po.js'),
    Login = require('../login/login.po.js'),
    Header = require('../header/header.po.js'),
    Make = require('../bloqsproject/make.po.js'),
    Variables = require('../commons/variables.js'),
    Modals = require('../modals/modals.po.js'),
    Project = require('./project.po.js'),
    Projects = require('../projects/projects.po.js');

var globalFunctions = new GlobalFunctions(),
    explore = new Explore(),
    landing = new Landing(),
    login = new Login(),
    header = new Header(),
    make = new Make(),
    vars = new Variables(),
    modals = new Modals(),
    project = new Project(),
    projects = new Projects();

globalFunctions.xmlReport('explore');

describe('Explore tab', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    //TODO test show toast
    it('bbb-182:explore:Verify that the Search bar work correctly', function() {

        //Save and publish 2 project begining in test_save__ , and use name of one
        make.saveProjectAndPublishNewUserAndLogout();
        // promise because expect return promise
        make.saveProjectAndPublishNewUser().then(function(project) {

            /*** No login search in explore check ***/
            explore.get();

            // Verify that it has more than one result
            explore.exploreFind.clear().sendKeys('Test_Save_').then(function() {
                explore.exploreCounts.getText().then(function(value) {
                    value = value.split('/');
                    expect(Number(value[1]) >= 1).toBeTruthy();
                });
            });

            // Verify that it hasn't any result
            explore.exploreFind.clear().sendKeys('no_test' + Number(new Date())).then(function() {
                explore.exploreCounts.getText().then(function(value) {
                    value = value.split('/');
                    expect(Number(value[1])).toEqual(0);
                });
            });

            // Verify that it has a result
            explore.exploreFind.clear().sendKeys(project.projectName).then(function() {
                explore.exploreCounts.getText().then(function(value) {
                    value = value.split('/');
                    expect(Number(value[1])).toEqual(1);
                });
            });

            login.logout();
            /*** Login search in explore check ***/
            landing.get();
            login.loginWithRandomUser();
            header.navExplore.click();

            // Verify that it has more than one result
            explore.exploreFind.clear().sendKeys('Test_Save_').then(function() {
                explore.exploreCounts.getText().then(function(value) {
                    value = value.split('/');
                    expect(Number(value[1]) >= 1).toBeTruthy();
                });
            });

            // Verify that it hasn't any result
            explore.exploreFind.clear().sendKeys('no_test' + Number(new Date())).then(function() {
                explore.exploreCounts.getText().then(function(value) {
                    value = value.split('/');

                    expect(Number(value[1])).toEqual(0);
                });
            });

            // Verify that it has a result
            explore.exploreFind.clear().sendKeys(project.projectName).then(function() {
                explore.exploreCounts.getText().then(function(value) {
                    value = value.split('/');
                    expect(Number(value[1])).toEqual(1);
                });
            });

            login.logout();
            return true;
        });

    });

    it('bbb-180:explore:Verify that the explore view is displayed correctly', function() {
        //Unregistered user
        var projectElem;
        //Se salva un proyecto para que al menos explora tenga un proyecto
        make.saveProjectAndPublishNewUserAndLogout().then(function(project1) {
            //Entramos como invitado para comprobar la vista de explora
            make.get();
            modals.attentionContinueGuest.click();
            modals.rejectTour();
            browser.sleep(vars.timeToWaitFadeModals);
            header.navExplore.click();
            //Se busca el proyecto creado con anterioridad
            explore.exploreFind.clear().sendKeys(project1.projectName).then(function() {
                projectElem = explore.projectElem;
                projectElem.click();
                browser.sleep(vars.timeToWaitFadeModals);
                explore.projectMoreInfoButton.click();
                //Se comprueba que los botones de "ver proyecto", "descargar proyecto" aparecen
                //y el boton de "anadir proyecto" no aparece
                expect(project.seeProjectButton.isDisplayed()).toBe(true);
                expect(project.downloadProjectButton.isDisplayed()).toBe(true);
                expect(project.addProjectButton.isDisplayed()).toBe(false);

                //Registered user
                //Entramos como usuario registrado y creamos un proyecto propio
                make.saveProjectAndPublishNewUser().then(function(project2) {
                    projects.get();
                    header.navExplore.click();
                    //Se busca el primer proyecto (no es propietario)
                    explore.exploreFind.clear().sendKeys(project1.projectName).then(function() {
                        projectElem = explore.projectElem;
                        projectElem.click();
                        browser.sleep(vars.timeToWaitFadeModals);
                        explore.projectMoreInfoButton.click();
                        //Se comprueba que los botones de "ver proyecto", "descargar proyecto"
                        //y el boton de "anadir proyecto" aparecen
                        expect(project.seeProjectButton.isDisplayed()).toBe(true);
                        expect(project.downloadProjectButton.isDisplayed()).toBe(true);
                        expect(project.addProjectButton.isDisplayed()).toBe(true);
                        header.navExplore.click();
                        //Se busca el segundo proyecto (Es propietario)
                        explore.exploreFind.clear().sendKeys(project2.projectName).then(function() {
                            projectElem = explore.projectElem;
                            projectElem.click();
                            browser.sleep(vars.timeToWaitFadeModals);
                            explore.projectMoreInfoButton.click();
                            //Se comprueba que los botones de "ver proyecto", "descargar proyecto" aparecen
                            //y el boton de "anadir proyecto" no aparece
                            browser.sleep(vars.timeToWaitTab);
                            expect(project.seeProjectButton.isDisplayed()).toBe(true);
                            expect(project.downloadProjectButton.isDisplayed()).toBe(true);
                            expect(project.addProjectButton.isDisplayed()).toBe(false);

                            login.logout();
                        });
                    });
                });
            });
        });
    });
});
