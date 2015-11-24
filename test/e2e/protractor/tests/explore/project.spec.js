/**
 * Spec to project.html
 */

'use strict';
/* jshint loopfunc: true */

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
    header = new Header(),
    make = new Make(),
    vars = new Variables(),
    modals = new Modals(),
    project = new Project(),
    projects = new Projects(),
    login = new Login();

globalFunctions.xmlReport('project');

describe('Publish project', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    xit('bba-41:Verify that the "Add to my project" option is displayed', function() {
        var projectElem;
        //Se salva un proyecto para que al menos explora tenga un proyecto
        make.saveProjectAndPublishNewUserAndLogout().then(function(project1) {
            //Registered user
            //Entramos como usuario registrado y creamos un proyecto propio
            login.loginWithRandomUser();
            header.navExplore.click();
            //Se busca el primer proyecto (no es propietario)
            explore.exploreFind.clear().sendKeys(project1.projectName).then(function() {
                projectElem = explore.projectElem;
                projectElem.click();
                browser.sleep(vars.timeToWaitFadeModals);
                explore.projectMoreInfoButton.click();
                //Se comprueba la funcionalidad del boton anadir
                project.addProjectButton.click();
                modals.okDialog.click();
                //Se comprueba que se ha añadido el proyecto
                header.navProjects.click();
                projects.findBar.clear().sendKeys('Copia de ' + project1.projectName).then(function() {
                    projects.getProjectCount().then(function(result) {
                        expect(Number(result) >= 1).toBeTruthy();
                        login.logout();
                    });
                });

            });
        });
    });

    it('bba-43:Verify that the project can be displayed', function() {
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
                browser.getCurrentUrl().then(function(url) {
                    //Se parte la URL para obtener el id del proyecto
                    url = url.split('/');
                    //Se comprueba la funcionalidad del boton "ver proyecto"
                    project.seeProjectButton.click();
                    browser.sleep(vars.timeToWaitTab);
                    browser.getAllWindowHandles().then(function(handles) {
                        browser.switchTo().window(handles[1]);
                        browser.sleep(vars.timeToWaitTab);
                        //el id que se obtuvo anteriormente debe ser el mismo que
                        // en la URL en la que se encuentra el navegador
                        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/bloqsproject/' + url[url.length - 1]);
                        browser.close().then(browser.switchTo().window(handles[0]));
                        //Registered user
                        //Entramos como usuario registrado
                        login.loginWithRandomUser();
                        header.navExplore.click();
                        //Se busca el primer proyecto (no es propietario)
                        explore.exploreFind.clear().sendKeys(project1.projectName).then(function() {
                            projectElem = explore.projectElem;
                            projectElem.click();
                            browser.sleep(vars.timeToWaitFadeModals);
                            explore.projectMoreInfoButton.click();
                            browser.getCurrentUrl().then(function(url2) {
                                //Se parte la URL para obtener el id de proyecto
                                url2 = url2.split('/');
                                //Se comprueba la funcionalidad del boton "ver proyecto"
                                project.seeProjectButton.click();
                                browser.sleep(vars.timeToWaitTab);
                                browser.getAllWindowHandles().then(function(handles) {
                                    browser.switchTo().window(handles[1]);
                                    browser.sleep(vars.timeToWaitTab);
                                    //el id que se obtuvo anteriormente debe ser el mismo que
                                    // en la URL en la que se encuentra el navegador
                                    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/bloqsproject/' + url2[url2.length - 1]);
                                    browser.close().then(browser.switchTo().window(handles[0]));
                                    login.logout();
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    it('bba-152:Verify the viewered counter', function() {
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

                //Se comprueba la funcionalidad del boton "ver proyecto"
                project.timesViewed.getText().then(function(timesViewedBefore) {
                    project.seeProjectButton.click();
                    browser.sleep(vars.timeToWaitTab);
                    browser.getAllWindowHandles().then(function(handles) {
                        browser.switchTo().window(handles[1]);
                        browser.sleep(vars.timeToWaitTab);
                        //el id que se obtuvo anteriormente debe ser el mismo que
                        // en la URL en la que se encuentra el navegador
                        browser.close().then(browser.switchTo().window(handles[0]));
                        project.timesViewed.getText().then(function(timesViewedAfter) {
                            expect(Number(timesViewedBefore)).toEqual(Number(timesViewedAfter));
                        });
                        //Registered user
                        //Entramos como usuario registrado
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
                                //Se comprueba la funcionalidad del boton "ver proyecto"
                                project.timesViewed.getText().then(function(timesViewedBefore2) {
                                    project.seeProjectButton.click();
                                    browser.sleep(vars.timeToWaitTab);
                                    browser.getAllWindowHandles().then(function(handles) {
                                        browser.switchTo().window(handles[1]);
                                        browser.sleep(vars.timeToWaitTab);
                                        //el id que se obtuvo anteriormente debe ser el mismo que
                                        // en la URL en la que se encuentra el navegador
                                        browser.close().then(browser.switchTo().window(handles[0]));
                                        project.timesViewed.getText().then(function(timesViewedAfter2) {
                                            expect(Number(timesViewedBefore2) < Number(timesViewedAfter2)).toBe(true);
                                        });
                                        header.navExplore.click();
                                        explore.exploreFind.clear().sendKeys(project2.projectName).then(function() {
                                            projectElem = explore.projectElem;
                                            projectElem.click();
                                            browser.sleep(vars.timeToWaitFadeModals);
                                            explore.projectMoreInfoButton.click();
                                            //Se comprueba la funcionalidad del boton "ver proyecto"
                                            project.timesViewed.getText().then(function(timesViewedBefore3) {
                                                project.seeProjectButton.click();
                                                browser.sleep(vars.timeToWaitTab);
                                                browser.getAllWindowHandles().then(function(handles) {
                                                    browser.switchTo().window(handles[1]);
                                                    browser.sleep(vars.timeToWaitTab);
                                                    //el id que se obtuvo anteriormente debe ser el mismo que
                                                    // en la URL en la que se encuentra el navegador
                                                    browser.close().then(browser.switchTo().window(handles[0]));
                                                    project.timesViewed.getText().then(function(timesViewedAfter3) {
                                                        expect(Number(timesViewedBefore3)).toEqual(Number(timesViewedAfter3));
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
        });
    });

    xit('bba-153:Verify the "Add to my project" counter', function() {
        var projectElem;
        //Se salva un proyecto para que al menos explora tenga un proyecto
        make.saveProjectAndPublishNewUserAndLogout().then(function(project1) {
            //Registered user
            //Entramos como usuario registrado y creamos un proyecto propio
            login.loginWithRandomUser();
            header.navExplore.click();
            //Se busca el primer proyecto (no es propietario)
            explore.exploreFind.clear().sendKeys(project1.projectName).then(function() {
                projectElem = explore.projectElem;
                projectElem.click();
                browser.sleep(vars.timeToWaitFadeModals);
                explore.projectMoreInfoButton.click();
                project.timesAdded.getText().then(function(timesAdded) {
                    //Se comprueba la funcionalidad del boton anadir
                    project.addProjectButton.click();
                    modals.okDialog.click();
                    project.timesAdded.getText().then(function(timesAdded2) {
                        expect(Number(timesAdded)<Number(timesAdded2)).toBeTruthy();
                        //Se comprueba que se ha añadido el proyecto
                        header.navProjects.click();
                        projects.findBar.clear().sendKeys('Copia de ' + project1.projectName).then(function() {
                            projects.getProjectCount().then(function(result) {
                                expect(Number(result) >= 1).toBeTruthy();
                                login.logout();
                            });
                        });
                    });

                });


            });
        });
    });
});
