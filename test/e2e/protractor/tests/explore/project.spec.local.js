'use strict';

var GlobalFunctions = require('../commons/globalFunctions.js'),
    Explore = require('../explore/explore.po.js'),
    Header = require('../header/header.po.js'),
    Make = require('../bloqsproject/make.po.js'),
    Variables = require('../commons/variables.js'),
    Modals = require('../modals/modals.po.js'),
    Project = require('./project.po.js'),
    Projects = require('../projects/projects.po.js'),
    Login = require('../login/login.po.js');

var globalFunctions = new GlobalFunctions(),
    explore = new Explore(),
    path = require('path'),
    fs = require('fs'),
    header = new Header(),
    make = new Make(),
    vars = new Variables(),
    modals = new Modals(),
    project = new Project(),
    projects = new Projects(),
    login = new Login();

globalFunctions.xmlReport('projectLocal');

describe('Publish project', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bba-42:Verify that the project can be downloaded', function() {
        //Unregistered user
        var projectElem, filename;
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
                filename = path.resolve() + '/target/' + project1.projectName + '.json';
                //Se comprueba que el boton "descargar" descarga el proyecto
                project.downloadProjectButton.click();
                browser.driver.wait(function() {
                    return fs.existsSync(filename);
                }, 4000);
                make.saveProjectAndPublishNewUser().then(function(project2) {
                    projects.get();
                    header.navExplore.click();
                    //Se busca el primer proyecto (no es propietario)
                    explore.exploreFind.clear().sendKeys(project1.projectName).then(function() {
                        projectElem = explore.projectElem;
                        projectElem.click();
                        browser.sleep(vars.timeToWaitFadeModals);
                        explore.projectMoreInfoButton.click();
                        //Se comprueba que el boton "descargar" descarga el proyecto
                        filename = path.resolve() + '/target/' + project1.projectName + '.json';
                        project.downloadProjectButton.click();
                        browser.driver.wait(function() {
                            return fs.existsSync(filename);
                        }, 4000);
                        header.navExplore.click();
                        explore.exploreFind.clear().sendKeys(project2.projectName).then(function() {
                            projectElem = explore.projectElem;
                            projectElem.click();
                            browser.sleep(vars.timeToWaitFadeModals);
                            explore.projectMoreInfoButton.click();
                            //Se comprueba que el boton "descargar" descarga el proyecto
                            filename = path.resolve() + '/target/' + project2.projectName + '.json';
                            project.downloadProjectButton.click();
                            browser.driver.wait(function() {
                                return fs.existsSync(filename);
                            }, 4000);
                            login.logout();
                        });
                    });
                });
            });
        });
    });

    it('bba-153:Verify the downloaded counter', function() {
        //Unregistered user
        var projectElem, filename;
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
                filename = path.resolve() + '/target/' + project1.projectName + '.json';
                project.timesDownloaded.getText().then(function(timesDownBefore) {
                    //Se comprueba que el boton "descargar" descarga el proyecto
                    project.downloadProjectButton.click();
                    browser.driver.wait(function() {
                        return fs.existsSync(filename);
                    }, 4000);
                    project.timesDownloaded.getText().then(function(timesDownAfter) {
                        expect(Number(timesDownBefore)).toEqual(Number(timesDownAfter));
                    });
                    make.get();
                    make.saveProjectAndPublishNewUser().then(function(project2) {
                        projects.get();
                        header.navExplore.click();
                        //Se busca el primer proyecto (no es propietario)
                        explore.exploreFind.clear().sendKeys(project1.projectName).then(function() {
                            projectElem = explore.projectElem;
                            projectElem.click();
                            browser.sleep(vars.timeToWaitFadeModals);
                            explore.projectMoreInfoButton.click();
                            //Se comprueba que el boton "descargar" descarga el proyecto
                            filename = path.resolve() + '/target/' + project1.projectName + '.json';
                            project.timesDownloaded.getText().then(function(timesDownBefore1) {
                                project.downloadProjectButton.click();
                                browser.driver.wait(function() {
                                    return fs.existsSync(filename);
                                }, 4000);
                                project.timesDownloaded.getText().then(function(timesDownAfter2) {
                                    expect(Number(timesDownBefore1) < Number(timesDownAfter2)).toBe(true);
                                });
                                header.navExplore.click();
                                explore.exploreFind.clear().sendKeys(project2.projectName).then(function() {
                                    projectElem = explore.projectElem;
                                    projectElem.click();
                                    browser.sleep(vars.timeToWaitFadeModals);
                                    explore.projectMoreInfoButton.click();
                                    //Se comprueba que el boton "descargar" descarga el proyecto
                                    filename = path.resolve() + '/target/' + project2.projectName + '.json';
                                    project.timesDownloaded.getText().then(function(timesDownBefore2) {
                                        project.downloadProjectButton.click();
                                        browser.driver.wait(function() {
                                            return fs.existsSync(filename);
                                        }, 4000);
                                        project.timesDownloaded.getText().then(function(timesDownAfter2) {
                                            expect(Number(timesDownBefore2)).toEqual(Number(timesDownAfter2));
                                            login.logout();
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});
