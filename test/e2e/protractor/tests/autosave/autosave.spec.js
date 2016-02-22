/**
 *Spec to login
 */

'use strict';

var GlobalFunctions = require('../commons/globalFunctions.js'),
    Variables = require('../commons/variables.js'),
    Make = require('../bloqsproject/make.po.js'),
    Projects = require('../projects/projects.po.js'),
    MyProjects = require('../projects/myprojects/myprojects.po.js'),
    CodeProjects = require('../codeproject/codeproject.po.js'),
    Login = require('../login/login.po.js');

var globalFunctions = new GlobalFunctions(),
    vars = new Variables(),
    make = new Make(),
    projects = new Projects(),
    myprojects = new MyProjects(),
    codeProjects = new CodeProjects(),
    login = new Login();

globalFunctions.xmlReport('autosave');

describe('Check makeActions actions in codeProjects', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bba-239:autosave:Verify that the project isnt autosaved when it is opened', function() {
        make.saveProjectNewUser();
        expect(make.projectSave.getAttribute('aria-hidden')).toBe('false');
        projects.get();
        myprojects.overMyProjects.click();
        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {
            browser.switchTo().window(handles[1]).then(function() {
                browser.sleep(vars.timeToWaitAutoSave);
                expect(make.projectSave.getAttribute('aria-hidden')).toBe('true');
                browser.close().then(browser.switchTo().window(handles[0]));
                login.logout();
            });
        });
        codeProjects.saveCodeProjectNewUser();
        expect(make.projectSave.getAttribute('aria-hidden')).toBe('false');
        projects.get();
        myprojects.overMyProjects.click();
        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {
            browser.switchTo().window(handles[1]).then(function() {
                browser.sleep(vars.timeToWaitAutoSave);
                expect(make.projectSave.getAttribute('aria-hidden')).toBe('true');
                login.logout();
                browser.close().then(browser.switchTo().window(handles[0]));

            });
        });
    });

    xit('bba-247:autosave:Verify that the autosave is launched when you change the information of the projects', function() {
    });

});
