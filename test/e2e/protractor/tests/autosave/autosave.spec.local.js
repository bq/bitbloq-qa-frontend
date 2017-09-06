/**
 *Spec to login
 */

'use strict';

var GlobalFunctions = require('../commons/globalFunctions.js'),
    Variables = require('../commons/variables.js'),
    Make = require('../bloqsproject/make.po.js'),
    MyProjects = require('../projects/myprojects/myprojects.po.js'),
    Login = require('../login/login.po.js'),
    path = require('path'),
    InfoTab = require('../bloqsproject/infotab/infotab.po.js'),
    Hwtab = require('../bloqsproject/hwtab/hwtab.po.js'),
    Header = require('../header/header.po.js'),
    Modals = require('../modals/modals.po.js');

var globalFunctions = new GlobalFunctions(),
    vars = new Variables(),
    make = new Make(),
    myprojects = new MyProjects(),
    login = new Login(),
    infotab = new InfoTab(),
    hwtab = new Hwtab(),
    header = new Header(),
    modals = new Modals();

globalFunctions.xmlReport('autosaveLocal');

describe('Check makeActions actions in codeProjects', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bbb-49:autosaveLocal:Verify that the autosave is launched when you delete a board or a robot', function() {
        //BOARD
        var name = 'Arduino_Bloqs';
        make.importFileNewUser(path.resolve() + '/test/e2e/protractor/res/' + name + '.json');
        header.navLogo.click();
        myprojects.overMyProjects.click();
        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {
            browser.switchTo().window(handles[1]).then(function() {
                expect(make.isProjectSavedShown()).toBeFalsy();
                browser.actions().mouseMove(element(by.id('boardSchema'))).perform();
                browser.actions().click(protractor.Button.RIGHT).perform();
                hwtab.hwContextMenuDeleteBoard.click();
                browser.sleep(vars.timeToWaitAutoSave);
                expect(make.isProjectSavedShown()).toBeTruthy();
                browser.close().then(browser.switchTo().window(handles[0]));
                login.logout();
            });
        });
        //ROBOTS
        name = 'zowibloqs';
        make.importFileNewUser(path.resolve() + '/test/e2e/protractor/res/' + name + '.json');
        header.navLogo.click();
        myprojects.overMyProjects.click();
        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {
            browser.switchTo().window(handles[1]).then(function() {
                expect(make.isProjectSavedShown()).toBeFalsy();
                browser.actions().mouseMove(element(by.id('robotSchema'))).perform();
                browser.actions().click(protractor.Button.RIGHT).perform();
                hwtab.hwContextMenuDeleteRobot.click();
                browser.sleep(vars.timeToWaitAutoSave);
                expect(make.isProjectSavedShown()).toBeTruthy();
                browser.close().then(browser.switchTo().window(handles[0]));
                login.logout();
            });
        });
    });

    it('bbb-56:autosaveLocal:Verify that the autosave is launched when you delete a component', function() {

        var name = 'VariosComponentes';
        make.importFileNewUser(path.resolve() + '/test/e2e/protractor/res/' + name + '.json');
        header.navLogo.click();
        myprojects.overMyProjects.click();
        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {
            browser.switchTo().window(handles[1]).then(function() {
                expect(make.isProjectSavedShown()).toBeFalsy();
                browser.actions().mouseMove(hwtab.sampleBoton).perform();
                browser.actions().click(protractor.Button.RIGHT).perform();
                hwtab.hwContextMenuDeleteComponent.click();
                browser.sleep(vars.timeToWaitAutoSave);
                expect(make.isProjectSavedShown()).toBeTruthy();
                browser.close().then(browser.switchTo().window(handles[0]));
                login.logout();
            });
        });
    });

    it('bbb-57:autosaveLocal:Verify that the autosave is launched when you disconnect a component', function() {

        var name = 'VariosComponentes';
        make.importFileNewUser(path.resolve() + '/test/e2e/protractor/res/' + name + '.json');
        header.navLogo.click();
        myprojects.overMyProjects.click();
        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {
            browser.switchTo().window(handles[1]).then(function() {
                expect(make.isProjectSavedShown()).toBeFalsy();
                browser.actions().mouseMove(hwtab.sampleBoton).perform();
                browser.actions().click(protractor.Button.RIGHT).perform();
                hwtab.hwContextMenuDisconnectComponent.click();
                browser.sleep(vars.timeToWaitAutoSave);
                expect(make.isProjectSavedShown()).toBeTruthy();
                browser.actions().mouseMove(element(by.id('boardSchema'))).perform();
                browser.actions().click(protractor.Button.RIGHT).perform();
                hwtab.hwContextMenuDisconnectBoard.click();
                browser.sleep(vars.timeToWaitAutoSave);
                expect(make.isProjectSavedShown()).toBeTruthy();
                browser.close().then(browser.switchTo().window(handles[0]));
                login.logout();
            });
        });
    });

    it('bbb-51:autosaveLocal:Verify that the autosave is launched when you change the information of the projects', function() {
        var perfectImagePath = '../../res/perfectimage.jpg',
            perfectImageAbsolutePath = path.resolve(__dirname, perfectImagePath);

        make.saveProjectNewUser();
        expect(make.isProjectSavedShown()).toBeTruthy();
        header.navLogo.click();

        myprojects.overMyProjects.click();
        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {
            browser.switchTo().window(handles[1]).then(function() {
                browser.sleep(vars.timeToWaitTab);
                infotab.infoTab.click();
                make.projectName.click();
                modals.inputModalChangeN.clear();
                modals.inputModalChangeN.sendKeys('hola');
                modals.okDialog.click();
                browser.sleep(vars.timeToWaitAutoSave);
                expect(make.isProjectSavedShown()).toBeTruthy();
                browser.close().then(browser.switchTo().window(handles[0]));
            });
        });

        header.navLogo.click();
        myprojects.overMyProjects.click();
        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {
            browser.switchTo().window(handles[1]).then(function() {
                browser.sleep(vars.timeToWaitTab);
                infotab.infoTab.click();
                infotab.infotabDescription.clear().sendKeys('Esto es una descripcion');
                browser.sleep(vars.timeToWaitAutoSave);
                expect(make.isProjectSavedShown()).toBeTruthy();
                browser.close().then(browser.switchTo().window(handles[0]));
            });
        });

        header.navLogo.click();
        myprojects.overMyProjects.click();
        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {
            browser.switchTo().window(handles[1]).then(function() {
                browser.sleep(vars.timeToWaitTab);
                infotab.infoTab.click();
                infotab.infotabYoutubeVideoInput.clear().sendKeys('https://www.youtube.com/watch?v=6R89_YL5ALM');
                browser.sleep(vars.timeToWaitAutoSave);
                expect(make.isProjectSavedShown()).toBeTruthy();
                browser.close().then(browser.switchTo().window(handles[0]));
            });
        });

        header.navLogo.click();
        myprojects.overMyProjects.click();
        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {
            browser.switchTo().window(handles[1]).then(function() {
                browser.sleep(vars.timeToWaitTab);
                infotab.infoTab.click();
                infotab.infotabFileUpload.sendKeys(perfectImageAbsolutePath);
                browser.sleep(vars.timeToWaitSendKeys);
                browser.sleep(vars.timeToWaitAutoSave);
                expect(make.isProjectSavedShown()).toBeTruthy();
                browser.close().then(browser.switchTo().window(handles[0]));
            });
        });

        header.navLogo.click();
        myprojects.overMyProjects.click();
        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {
            browser.switchTo().window(handles[1]).then(function() {
                browser.sleep(vars.timeToWaitTab);
                infotab.infoTab.click();
                infotab.infotabTaginputText.clear().sendKeys('hola');
                infotab.infotabTaginputButton.click();
                browser.sleep(vars.timeToWaitAutoSave);
                expect(make.isProjectSavedShown()).toBeTruthy();
                browser.close().then(browser.switchTo().window(handles[0]));
            });
        });

        header.navLogo.click();
        myprojects.overMyProjects.click();
        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {
            browser.switchTo().window(handles[1]).then(function() {
                browser.sleep(vars.timeToWaitTab);
                infotab.infoTab.click();
                element.all(by.repeater('tag in currentProject.userTags').row(0)).click();
                infotab.infotabRemoveTag.click();
                expect(make.isProjectSavedShown()).toBeTruthy();
                browser.close().then(browser.switchTo().window(handles[0]));
            });
        });
        header.navLogo.click();
        myprojects.overMyProjects.click();
        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {
            browser.switchTo().window(handles[1]).then(function() {
                browser.sleep(vars.timeToWaitTab);
                infotab.infoTab.click();
                infotab.infotabChooseThemeButton.click();
                infotab.infotabOptionGrayTheme.click();
                expect(make.isProjectSavedShown()).toBeTruthy();
                browser.close().then(browser.switchTo().window(handles[0]));
            });
        });
        login.logout();
    });

    fit('bbb-48:autosaveLocal:Verify that the autosave is launched when you add a board or a robot', function() {

        var num;
        login.loginWithRandomUser();

        make.get();
        browser.sleep(vars.timeToWaitTab);
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        make.hardwareTab.click();
        hwtab.boardsTab.click();
        hwtab.boardsElem.count().then(function(totalBoards) {
            for (num = 0; num < totalBoards; num += 1) {
                hwtab.boardsElem.get(num).click();
                expect(make.isProjectSavedShown()).toBeTruthy();
                browser.sleep(1000);
                hwtab.boardsTab.click();
            }
        });

        browser.sleep(2000);

        make.get();
        browser.sleep(vars.timeToWaitTab);
        make.hardwareTab.click();
        hwtab.robotsTab.click();
        hwtab.robotsElem.count().then(function(totalRobots) {
            for (num = 0; num < totalRobots; num += 1) {
                hwtab.robotsElem.get(num).click();
                if (num > 1 && num < totalRobots - 1) {
                    modals.cancelDialog.click();
                }
                expect(make.isProjectSavedShown()).toBeTruthy();
                browser.sleep(1000);
                hwtab.robotsTab.click();
            }
            login.logout();
        });
    });

    it('bbb-52:autosaveLocal:Verify that the autosave is launched when you modify the component name', function() {

        var name = 'makeblockComponents';
        make.importFileNewUser(path.resolve() + '/test/e2e/protractor/res/' + name + '.bitbloq');
        header.navLogo.click();
        myprojects.overMyProjects.click();
        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {
            browser.switchTo().window(handles[1]).then(function() {
                expect(make.isProjectSavedShown()).toBeFalsy();
                browser.ignoreSynchronization = true;
                hwtab.lightSensor.click();
                hwtab.hwComponentNameInput.clear().sendKeys('Cambio');
                browser.ignoreSynchronization = false;
                expect(make.isProjectSavedShown()).toBeTruthy();
                browser.sleep(vars.timeToWaitTab);
                name = 'VariosComponentes';
                browser.sleep(vars.timeToWaitTab);
                login.logout();
                browser.close().then(browser.switchTo().window(handles[0]));
            });
        });
        name = 'VariosComponentes';
        make.importFileNewUser(path.resolve() + '/test/e2e/protractor/res/' + name + '.json');
        header.navLogo.click();
        myprojects.overMyProjects.click();
        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {
            browser.switchTo().window(handles[1]).then(function() {
                expect(make.isProjectSavedShown()).toBeFalsy();
                browser.ignoreSynchronization = true;
                hwtab.sampleBoton.click();
                hwtab.hwComponentNameInput.clear().sendKeys('Cambio');
                browser.ignoreSynchronization = false;
                expect(make.isProjectSavedShown()).toBeTruthy();
                login.logout();
            });
        });

    });
});