/**
 * Commons Spec to state
 */

'use strict';

var Login = require('../login/login.po.js'),
    Make = require('../bloqsproject/make.po.js'),
    GlobalFunctions = require('../commons/globalFunctions.js'),
    Modals = require('../modals/modals.po.js'),
    Variables = require('../commons/variables.js'),
    Projects = require('../projects/projects.po.js'),
    Modals = require('../modals/modals.po.js'),
    path = require('path');

var login = new Login(),
    vars = new Variables(),
    make = new Make(),
    modals = new Modals(),
    projects = new Projects(),
    modals = new Modals(),
    globalFunctions = new GlobalFunctions();

globalFunctions.xmlReport('stateLocal');

describe('State, specs only in local', function() {
    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bba-256:stateLocal:Save a bloqs project', function() {
        var name = 'Ultrasonidos_Bloqs';
        make.importFileGuestUser(path.resolve() + '/test/e2e/protractor/res/' + name +'.json');
        browser.sleep(vars.timeToWaitAutoSave);
        login.loginFromHeader('bloqsproject');
        browser.sleep('2000'); // on jenkins name change more slow
        expect(make.projectName.getText()).toEqual(name);
        projects.get();
        expect(projects.getProjectCount()).toBe(1);
        login.logout();
    });

    it('bba-257:stateLocal:Save a code project', function() {
        var name = 'Ultrasonidos_Bloqs';
        make.importFileGuestUser(path.resolve() + '/test/e2e/protractor/res/' + name +'.json');
        browser.sleep(vars.timeToWaitAutoSave);
        make.softwareTab.click();
        browser.sleep(vars.timeToWaitTab);
        make.codeTab.click();
        make.softwareEditCode.click();
        modals.modalAlertOk.click();
        login.loginFromHeader('codeproject');
        expect(make.projectName.getText()).toEqual(name);
        projects.get();
        expect(projects.getProjectCount()).toBe(1);
        login.logout();
    });
});
