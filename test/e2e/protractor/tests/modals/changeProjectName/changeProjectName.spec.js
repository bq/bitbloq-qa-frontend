/**
 *Page spec modals*.html
 */

'use strict';

var Login = require('../../login/login.po.js'),
    Make = require('../../bloqsproject/make.po.js'),
    Vars = require('../../commons/variables.js'),
    Modals = require('./../modals.po.js'),
    Projects = require('../../projects/projects.po.js');

var login = new Login(),
    make = new Make(),
    vars = new Vars(),
    modals = new Modals(),
    projects = new Projects();

describe('Rename modal on make', function() {

    vars.beforeTest();

    it('Rename project and save', function() {

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


    it('Rename project and not save', function() {

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
    });
});
