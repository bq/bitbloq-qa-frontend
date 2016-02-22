/**
 *Spec to login
 */

'use strict';

var GlobalFunctions = require('../commons/globalFunctions.js'),
    Variables = require('../commons/variables.js'),
    Make = require('../bloqsproject/make.po.js'),
    Projects = require('../projects/projects.po.js'),
    MyProjects = require('../projects/myprojects/myprojects.po.js'),
    Login = require('../login/login.po.js'),
    path = require('path'),
    Hwtab = require('../bloqsproject/hwtab/hwtab.po.js');

var globalFunctions = new GlobalFunctions(),
    vars = new Variables(),
    make = new Make(),
    projects = new Projects(),
    myprojects = new MyProjects(),
    login = new Login(),
    hwtab = new Hwtab();

globalFunctions.xmlReport('autosaveLocal');

describe('Check makeActions actions in codeProjects', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bba-244:autosaveLocal:Verify that the autosave is launched when you delete a board or a robot', function() {
        //BOARD
        var name = 'Arduino_Bloqs';
        make.importFileNewUser(path.resolve() + '/test/e2e/protractor/res/' + name + '.json');
        projects.get();
        myprojects.overMyProjects.click();
        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {
            browser.switchTo().window(handles[1]).then(function() {
                expect(make.projectSave.getAttribute('aria-hidden')).toBe('true');
                browser.actions().mouseMove(element(by.id('boardSchema'))).perform();
                browser.actions().click(protractor.Button.RIGHT).perform();
                hwtab.hwContextMenuDeleteBoard.click();
                browser.sleep(vars.timeToWaitAutoSave);
                expect(make.projectSave.getAttribute('aria-hidden')).toBe('false');
                browser.close().then(browser.switchTo().window(handles[0]));
                login.logout();
            });
        });
        //ROBOTS
        name = 'zowibloqs';
        make.importFileNewUser(path.resolve() + '/test/e2e/protractor/res/' + name + '.json');
        projects.get();
        myprojects.overMyProjects.click();
        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {
            browser.switchTo().window(handles[1]).then(function() {
                expect(make.projectSave.getAttribute('aria-hidden')).toBe('true');
                browser.actions().mouseMove(element(by.id('robotSchema'))).perform();
                browser.actions().click(protractor.Button.RIGHT).perform();
                hwtab.hwContextMenuDeleteRobot.click();
                browser.sleep(vars.timeToWaitAutoSave);
                expect(make.projectSave.getAttribute('aria-hidden')).toBe('false');
                browser.close().then(browser.switchTo().window(handles[0]));
                login.logout();
            });
        });
    });

    it('bba-280:autosaveLocal:Verify that the autosave is launched when you delete a component', function() {

        var name = 'VariosComponentes';
        make.importFileNewUser(path.resolve() + '/test/e2e/protractor/res/' + name + '.json');
        projects.get();
        myprojects.overMyProjects.click();
        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {
            browser.switchTo().window(handles[1]).then(function() {
                expect(make.projectSave.getAttribute('aria-hidden')).toBe('true');
                browser.actions().mouseMove(hwtab.sampleBoton).perform();
                browser.actions().click(protractor.Button.RIGHT).perform();
                hwtab.hwContextMenuDeleteComponent.click();
                browser.sleep(vars.timeToWaitAutoSave);
                expect(make.projectSave.getAttribute('aria-hidden')).toBe('false');
                browser.close().then(browser.switchTo().window(handles[0]));
                login.logout();
            });
        });
    });

    it('bba-281:autosaveLocal:Verify that the autosave is launched when you disconnect a component', function() {

        var name = 'VariosComponentes';
        make.importFileNewUser(path.resolve() + '/test/e2e/protractor/res/' + name + '.json');
        projects.get();
        myprojects.overMyProjects.click();
        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {
            browser.switchTo().window(handles[1]).then(function() {
                expect(make.projectSave.getAttribute('aria-hidden')).toBe('true');
                browser.actions().mouseMove(hwtab.sampleBoton).perform();
                browser.actions().click(protractor.Button.RIGHT).perform();
                hwtab.hwContextMenuDisconnectComponent.click();
                browser.sleep(vars.timeToWaitAutoSave);
                expect(make.projectSave.getAttribute('aria-hidden')).toBe('false');
                browser.actions().mouseMove(element(by.id('boardSchema'))).perform();
                browser.actions().click(protractor.Button.RIGHT).perform();
                hwtab.hwContextMenuDisconnectBoard.click();
                browser.sleep(vars.timeToWaitAutoSave);
                expect(make.projectSave.getAttribute('aria-hidden')).toBe('false');
                browser.close().then(browser.switchTo().window(handles[0]));
                login.logout();
            });
        });
    });

});
