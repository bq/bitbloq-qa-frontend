/**
 * Spec to makeActionsHelp.spec.js
 * Menu Share of makeActions
 */

'use strict';

var GlobalFunctions = require('../../../commons/globalFunctions.js'),
    MakeActions = require('../makeActions.po.js'),
    Make = require('../../make.po.js'),
    Explore = require('../../../explore/explore.po.js'),
    Login = require('../../../login/login.po.js'),
    Variables = require('../../../commons/variables.js'),
    Project = require('../../../explore/project.po.js');

var globalFunctions = new GlobalFunctions(),
    makeActions = new MakeActions(),
    make = new Make(),
    explore = new Explore(),
    login = new Login(),
    vars = new Variables(),
    project = new Project();

globalFunctions.xmlReport('makeActionsShare');
describe('Menu Help of MakeActions', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    //TODO test TOAST
    it('bba-109:Publish project', function() {

        var projectName = make.saveProjectNewUser();

        makeActions.menuShare.click();
        browser.sleep(vars.timeToWaitTab);
        makeActions.menuSharePublish.click();
        browser.sleep(vars.timeToWaitTab);
        makeActions.publishButton.click();
        explore.get();
        explore.exploreFind.sendKeys(projectName.projectName);
        browser.sleep(2000);
        expect(explore.projectName.getText()).toContain(projectName.projectName);
        login.logout();

    });
    it('bba-56:make private a project', function() {
        var projectName = make.saveProjectNewUser();

        makeActions.menuShare.click();
        browser.sleep(vars.timeToWaitTab);
        makeActions.menuSharePublish.click();
        browser.sleep(vars.timeToWaitTab);
        makeActions.publishButton.click();
        explore.get();
        explore.exploreFind.sendKeys(projectName.projectName);
        browser.sleep(vars.timeToWaitLoadExporeProjects);
        expect(explore.projectName.getText()).toContain(projectName.projectName);

        explore.projectElem.click();
        browser.sleep(vars.timeToWaitFadeModals);
        explore.projectMoreInfoButton.click();

        project.seeProjectButton.click();

        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {

            browser.sleep(vars.timeToWaitTab);
            browser.switchTo().window(handles[1]).then(function() {
                makeActions.menuShare.click();
                browser.sleep(vars.timeToWaitTab);
                makeActions.menuSharePrivate.click();
                browser.sleep(vars.timeToWaitTab);
                makeActions.privateButton.click();

                explore.get();
                explore.exploreFind.sendKeys(projectName.projectName);
                browser.sleep(2000);
                explore.exploreCounts.getText().then(function(value) {
                    value = value.split('/');
                    expect(Number(value[1])).toEqual(0);
                });
            });
            login.logout();
        });
    });

});
