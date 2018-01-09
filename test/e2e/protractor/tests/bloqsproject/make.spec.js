/**
 *Spec to login
 */

'use strict';

var Variables = require('../commons/variables.js'),
    GlobalFunctions = require('../commons/globalFunctions.js'),
    Make = require('./make.po.js'),
    Login = require('../login/login.po.js'),
    Projects = require('../projects/projects.po.js'),
    Infotab = require('./infotab/infotab.po.js'),
    MyProjects = require('../projects/myprojects/myprojects.po.js'),
    Modals = require('../modals/modals.po.js'),
    Hwtab = require('./hwtab/hwtab.po.js');

var vars = new Variables(),
    globalFunctions = new GlobalFunctions(),
    login = new Login(),
    make = new Make(),
    projects = new Projects(),
    infotab = new Infotab(),
    myprojects = new MyProjects(),
    modals = new Modals(),
    hwtab = new Hwtab();

globalFunctions.xmlReport('bloqsproject');

describe('make tab', function () {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('SWBIT-3000:bloqsproject:Save project', function () {
        make.saveProjectNewUserAndLogout();
    });

    it('SWBIT-2998:bloqsproject:We can move between all tabs', function () {
        login.loginWithRandomUser();
        make.get();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        make.softwareTab.click();
        make.codeTab.click();
        make.bloqsTab.click();
        make.infoTab.click();
        make.hardwareTab.click();
        login.logout();
    });

    it('SWBIT-2999:bloqsproject:Rename project in make and test change in project', function () {
        login.loginWithRandomUser();
        make.get();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        //create new project
        make.infoTab.click();
        make.projectName.click();
        modals.inputModalChangeN.clear();
        modals.inputModalChangeN.sendKeys('Test_Save');
        modals.okDialog.click();
        browser.sleep(vars.timeToWaitAutoSave);
        //Open saved project
        projects.get();
        myprojects.overMyProjects.click().then(function () {
            browser.sleep(vars.timeToWaitTab);
            browser.getAllWindowHandles().then(function (handles) {
                browser.switchTo().window(handles[1]).then(function () {
                    //Change name
                    make.projectName.click();
                    modals.inputModalChangeN.clear();
                    modals.inputModalChangeN.sendKeys('ChangeTestName');
                    modals.okDialog.click();
                    browser.sleep(vars.timeToWaitAutoSave);
                    expect(make.projectName.getText()).toEqual('ChangeTestName');
                    //Close tab make
                    browser.close();
                    // Test if name is change in projects tab (the first tab opened)
                    browser.switchTo().window(handles[0]).then(function () {
                        browser.sleep(vars.timeToWaitTab);
                        projects.get();
                        expect(projects.projectsName.getText()).toEqual('ChangeTestName');
                        myprojects.overMyProjects.click().then(function () {
                            browser.sleep(vars.timeToWaitTab);
                            browser.getAllWindowHandles().then(function (handles2) {
                                browser.switchTo().window(handles2[1]).then(function () {
                                    make.infoTab.click();
                                    infotab.infotabProjectName.clear();
                                    browser.sleep(vars.timeToWaitAutoSave);
                                    projects.get();
                                    expect(projects.projectsName.getText()).toEqual('Proyecto sin título');

                                    login.logout();

                                });

                            });

                        });

                    });
                });
            });
        });
    });

    it('SWBIT-3002:bloqsproject:Project must have a name', function () {

        login.loginWithRandomUser();

        make.get();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        expect(make.projectName.isPresent()).toBe(true);
        globalFunctions.navigatorLanguage()
            .then(function (language) {
                if (language === 'es') {
                    expect(make.projectName.getText()).toBe(vars.nameNewProject);
                } else {
                    expect(make.projectName.getText()).toBe(vars.nameNewProjectEN);
                }
            });
        make.infoTab.click();
        infotab.infotabProjectName.sendKeys('Prueba blanco').clear();
        browser.sleep(vars.timeToWaitAutoSave);
        projects.get();
        browser.sleep(vars.timeToWaitAutoSave);
        globalFunctions.navigatorLanguage()
            .then(function (language) {
                if (language === 'es') {
                    expect(myprojects.projectName.getText()).toBe(vars.nameNewProject);
                } else {
                    expect(myprojects.projectName.getText()).toBe(vars.nameNewProjectEN);
                }
            });
        login.logout();
    });

    it('SWBIT-2996:bloqsproject:verify header-compile is blocked when clicked', function () {
        //you have to accept open web2board links, or test fail
        login.loginWithRandomUser();
        make.get();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        make.compileButton.click();
        expect(make.compileButton.isEnabled()).toBe(false);
        browser.sleep(10000);
        expect(make.compileButton.isEnabled()).toBe(true);
        login.logout();
    });

});
