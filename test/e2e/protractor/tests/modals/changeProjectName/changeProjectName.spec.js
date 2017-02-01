/**
 *Page spec modals*.html
 */

'use strict';

var Login = require('../../login/login.po.js'),
    Make = require('../../bloqsproject/make.po.js'),
    Vars = require('../../commons/variables.js'),
    GlobalFunctions = require('../../commons/globalFunctions.js'),
    Modals = require('./../modals.po.js'),
    Projects = require('../../projects/projects.po.js');

var login = new Login(),
    make = new Make(),
    vars = new Vars(),
    globalFunctions = new GlobalFunctions(),
    modals = new Modals(),
    projects = new Projects();

globalFunctions.xmlReport('modalsChangeProjectName');

describe('Rename modal on make', function() {

  //beforeEach commons
  globalFunctions.beforeTest();

  // afterEach commons
  globalFunctions.afterTest();

    it('bbb-267:modalsChangeProjectName:Rename project and save', function() {

        login.loginWithRandomUser();
        make.get();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        make.projectName.click();
        modals.inputModalChangeN.clear();
        modals.inputModalChangeN.sendKeys('ChangeTestName');
        modals.okDialog.click();
        browser.sleep(vars.timeToWaitAutoSave);
        expect(make.projectName.getText()).toEqual('ChangeTestName');
        // Comprobar cuando le da a aceptar, que abres de nuevo el proyecto y tiene el nombre nuevo
        projects.get();
        expect(projects.projectsName.getText()).toEqual('ChangeTestName');

        login.logout();
    });


    it('bbb-268:modalsChangeProjectName:Rename project and not save', function() {

        //test no saved if click in cancel modal
        login.loginWithRandomUser();
        make.get();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        make.projectName.click();
        modals.inputModalChangeN.clear();
        modals.inputModalChangeN.sendKeys('ChangeTestName');
        modals.cancelDialog.click();
        expect(make.projectName.getText()).not.toEqual('ChangeTestName');

        browser.sleep(vars.timeToWaitFadeModals);

        //test no saved if click in blade modal
        make.projectName.click();
        modals.inputModalChangeN.clear();
        modals.inputModalChangeN.sendKeys('ChangeTestName');
        modals.bladeClose.click();
        expect(make.projectName.getText()).not.toEqual('ChangeTestName');
        projects.get();
        login.logout();
    });

    xit('bbb-269:modalsChangeProjectName:Verify save name when sendKeys enter in modal', function() {

        //test no saved if click in cancel modal
        login.loginWithRandomUser();
        make.get();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        make.projectName.click();
        modals.inputModalChangeN.clear();
        modals.inputModalChangeN.sendKeys('ChangeTestName');
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        expect(make.projectName.getText()).toEqual('ChangeTestName');

        browser.sleep(vars.timeToWaitFadeModals);
        projects.get();
        login.logout();
    });

    it('bbb-272:modalsChangeProjectName:Verify save name when sendKeys ESCAPE in modal no save name', function() {

        //test no saved if click in cancel modal
        login.loginWithRandomUser();
        make.get();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        make.projectName.click();
        modals.inputModalChangeN.clear();
        modals.inputModalChangeN.sendKeys('ChangeTestName');
        browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
        expect(make.projectName.getText()).not.toEqual('ChangeTestName');

        browser.sleep(vars.timeToWaitFadeModals);
        projects.get();
        login.logout();
    });


});
