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
    Project = require('../../../explore/project.po.js'),
    Bloqs = require('../../../bloqs/bloqs.po.js');


var globalFunctions = new GlobalFunctions(),
    makeActions = new MakeActions(),
    make = new Make(),
    explore = new Explore(),
    login = new Login(),
    vars = new Variables(),
    project = new Project(),
    bloqs = new Bloqs();

globalFunctions.xmlReport('bloqsprojectMakeActionsShare');
describe('Menu Share of MakeActions', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    //TODO test TOAST
    it('SWBIT-2917:bloqsprojectMakeActionsShare:Publish project', function() {

        var projectName = make.saveProjectNewUser();
        make.softwareTab.click();
        browser.sleep(vars.timeToWaitTab);
        bloqs.getBloqFunctions('bloq-return-function').then(function(bloque1) {
            bloqs.addToGroupVars(bloque1);
            bloqs.closeTab();
            browser.sleep(vars.timeToWaitAutoSave);
            makeActions.menuShare.click();
            browser.sleep(vars.timeToWaitTab);
            makeActions.menuSharePublish.click();
            browser.sleep(vars.timeToWaitTab);
            makeActions.publishButton.click();
            browser.sleep(vars.timeToWaitTab);
            explore.get();
            explore.exploreFind.sendKeys(projectName.projectName);
            browser.sleep(3000);
            expect(explore.projectName.getText()).toContain(projectName.projectName);
            login.logout();
        });

    });

    it('SWBIT-2916:bloqsprojectMakeActionsShare:make private a project', function() {
        var projectName = make.saveProjectNewUser();
        make.softwareTab.click();
        browser.sleep(vars.timeToWaitTab);
        bloqs.getBloqFunctions('bloq-return-function').then(function(bloque1) {
            bloqs.addToGroupVars(bloque1);
            bloqs.closeTab();
            browser.sleep(vars.timeToWaitAutoSave);
            makeActions.menuShare.click();
            browser.sleep(vars.timeToWaitTab);
            makeActions.menuSharePublish.click();
            browser.sleep(vars.timeToWaitTab);
            makeActions.publishButton.click();
            browser.sleep(vars.timeToWaitFadeModals);
            explore.get();
            explore.exploreFind.sendKeys(projectName.projectName);
            browser.sleep(vars.timeToWaitLoadExporeProjects);
            expect(explore.projectName.getText()).toContain(projectName.projectName);

            explore.projectElem.click();
            browser.sleep(vars.timeToWaitFadeModals);
            explore.projectMoreInfoButton.click();
            browser.sleep(vars.timeToWaitFadeModals);
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
                    browser.sleep(vars.timeToWaitFadeModals);
                    explore.get();
                    browser.sleep(5000);
                    explore.exploreFind.sendKeys(projectName.projectName);
                    browser.sleep(3000);
                    explore.exploreCounts.getText().then(function(value) {
                        value = value.split('/');
                        expect(Number(value[1])).toEqual(0);
                    });
                });
                login.logout();
            });
        });
    });

});
