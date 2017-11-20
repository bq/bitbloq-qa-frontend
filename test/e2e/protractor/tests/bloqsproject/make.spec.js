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

    it('bbb-156:bloqsproject:Save project', function () {
        make.saveProjectNewUserAndLogout();
    });

    it('bbb-154:bloqsproject:We can move between all tabs', function () {
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

    it('bbb-145:bloqsproject:We can insert and save tag', function () {

        var userLogin = login.loginWithRandomUser();
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

        //add tag
        infotab.infotabTaginputText.sendKeys('TestTag_ONE_1');
        infotab.infotabTaginputButton.click();
        infotab.infotabTaginputText.sendKeys('TestTag_TWO_2');
        infotab.infotabTaginputButton.click();
        browser.sleep(vars.timeToWaitAutoSave);
        infotab.infotabTaginputText.sendKeys('TestTag__3,TestTag__4');
        browser.sleep(vars.timeToWaitSendKeys);
        infotab.infotabTaginputButton.click();
        infotab.infotabTaginputText.sendKeys('TestTag,Test,t,t,t,e,e,s,t');
        browser.sleep(vars.timeToWaitSendKeys);
        infotab.infotabTaginputButton.click();

        //Show saved tag
        expect(element.all(by.repeater('tag in currentProject.userTags').row(0)).getText()).toContain('TestTag_ONE_1');
        expect(element.all(by.repeater('tag in currentProject.userTags').row(1)).getText()).toContain('TestTag_TWO_2');
        expect(element.all(by.repeater('tag in currentProject.userTags').row(2)).getText()).toContain('TestTag__3');
        expect(element.all(by.repeater('tag in currentProject.userTags').row(3)).getText()).toContain('TestTag__4');
        expect(element.all(by.repeater('tag in currentProject.userTags').row(4)).getText()).toContain('TestTag');
        expect(element.all(by.repeater('tag in currentProject.userTags').row(5)).getText()).toContain('Test');
        expect(element.all(by.repeater('tag in currentProject.userTags').row(6)).getText()).toContain('t');
        expect(element.all(by.repeater('tag in currentProject.userTags').row(7)).getText()).toContain('e');
        expect(element.all(by.repeater('tag in currentProject.userTags').row(8)).getText()).toContain('s');
        expect(element.all(by.repeater('tag in currentProject.userTags')).count()).toBe(9);

        //Logout and Login last user and test project exist with yours tags
        login.logout();
        login.get();
        login.login({ 'user': userLogin.user, 'password': userLogin.password });
        projects.get();
        //Open saved project
        myprojects.overMyProjects.click().then(function () {
            browser.sleep(vars.timeToWaitTab);
            browser.getAllWindowHandles().then(function (handles) {
                browser.switchTo().window(handles[1]).then(function () {
                    make.infoTab.click();
                    //Show saved tag
                    expect(element.all(by.repeater('tag in currentProject.userTags').row(0)).getText()).toContain('TestTag_ONE_1');
                    expect(element.all(by.repeater('tag in currentProject.userTags').row(1)).getText()).toContain('TestTag_TWO_2');
                    expect(element.all(by.repeater('tag in currentProject.userTags').row(2)).getText()).toContain('TestTag__3');
                    expect(element.all(by.repeater('tag in currentProject.userTags').row(3)).getText()).toContain('TestTag__4');
                    expect(element.all(by.repeater('tag in currentProject.userTags').row(4)).getText()).toContain('TestTag');
                    expect(element.all(by.repeater('tag in currentProject.userTags').row(5)).getText()).toContain('Test');
                    expect(element.all(by.repeater('tag in currentProject.userTags').row(6)).getText()).toContain('t');
                    expect(element.all(by.repeater('tag in currentProject.userTags').row(7)).getText()).toContain('e');
                    expect(element.all(by.repeater('tag in currentProject.userTags').row(8)).getText()).toContain('s');
                    expect(element.all(by.repeater('tag in currentProject.userTags')).count()).toBe(9);
                    login.logout();
                    browser.close().then(browser.switchTo().window(handles[0]));

                });
            });
        });
    });

    it('bbb-146:bloqsproject:Delete tag', function () {
        var userLogin = login.loginWithRandomUser();
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

        //add tag
        infotab.infotabTaginputText.sendKeys('TestTag_ONE_1');
        infotab.infotabTaginputButton.click();
        infotab.infotabTaginputText.sendKeys('TestTag_TWO_2');
        infotab.infotabTaginputButton.click();
        browser.sleep(vars.timeToWaitAutoSave);

        //Show saved tag
        expect(element.all(by.repeater('tag in currentProject.userTags').row(0)).getText()).toContain('TestTag_ONE_1');
        expect(element.all(by.repeater('tag in currentProject.userTags').row(1)).getText()).toContain('TestTag_TWO_2');

        //Eliminate tag
        element.all(by.repeater('tag in currentProject.userTags').row(0)).click();
        browser.sleep(vars.timeToWaitFadeModals);
        infotab.infotabRemoveTag.click();
        infotab.infotabRemoveTag.click();
        browser.sleep(vars.timeToWaitFadeModals);
        browser.sleep(vars.timeToWaitAutoSave);

        expect(element(by.repeater('tag in currentProject.userTags')).isPresent()).toBe(false);

        //Logout and Login last user and test tags are deleted
        login.logout();
        login.get();
        login.login({ 'user': userLogin.user, 'password': userLogin.password });
        projects.get();
        //Open saved project
        myprojects.overMyProjects.click().then(function () {
            browser.sleep(vars.timeToWaitTab);
            browser.getAllWindowHandles().then(function (handles) {
                console.log(handles);
                browser.switchTo().window(handles[1]).then(function () {
                    //Test eliminate tag tag
                    make.infoTab.click();
                    expect(element(by.repeater('tag in currentProject.userTags')).isPresent()).toBe(false);
                    login.logout();
                    browser.close().then(browser.switchTo().window(handles[0]));
                });
            });
        });
    });

    it('bbb-155:bloqsproject:Rename project in make and test change in project', function () {
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

    it('bbb-158:bloqsproject:Project must have a name', function () {

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

    it('bbb-152:bloqsproject:verify header-compile is blocked when clicked', function () {
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

    it('bbb-147:bloqsproject:verify robot and board tags', function () {
        login.loginWithRandomUser();
        make.get();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        hwtab.boardsTab.click();
        hwtab.hwBoardBQZum.click();
        make.infoTab.click();
        expect(infotab.infotabBQZumTag.getText()).toMatch('bq ZUM', 'The tag Bqz ZUM does not matches');
        expect(infotab.infotabBQZumDeleteTag.isPresent()).toBe(false, 'Bq ZUM tag can be removed');
        make.hardwareTab.click();
        hwtab.boardsTab.click();
        hwtab.hwBoardFreaduinoUno.click();
        make.infoTab.click();
        expect(infotab.infotabFreaduinoUnoTag.getText()).toMatch('Freaduino UNO', 'The Freaduino UNO tag does not matches');
        expect(infotab.infotabFreaduinoUnoDeleteTag.isPresent()).toBe(false, 'Freaduino UNO tag can be removed');
        expect(infotab.infotabBQZumTag.isPresent()).toBe(false, 'Bq ZUM tag was not removed');
        make.hardwareTab.click();
        hwtab.robotsTab.click();
        hwtab.hwRobotMBot.click();
        modals.cancel();
        make.infoTab.click();
        expect(infotab.infotabMCoreTag.getText()).toMatch('MCore', 'The MCore tag does not matches');
        expect(infotab.infotabMCoreDeleteTag.isPresent()).toBe(false, 'MCore tag can be removed');
        expect(infotab.infotabMBotTag.getText()).toMatch('mBot', 'The MBot tag does not matches');
        expect(infotab.infotabMBotDeleteTag.isPresent()).toBe(false, 'MBot tag can be removed');
        expect(infotab.infotabBQZumTag.isPresent()).toBe(false, 'Bq ZUM tag was not removed');
        expect(infotab.infotabFreaduinoUnoTag.isPresent()).toBe(false, 'Freaduino UNO tag was not removed');

        login.logout();
    });

});
