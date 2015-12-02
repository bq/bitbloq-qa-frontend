/**
 * Commons Spec to state
 */

'use strict';

var Login = require('../login/login.po.js'),
    Make = require('../bloqsproject/make.po.js'),
    GlobalFunctions = require('../commons/globalFunctions.js'),
    Modals = require('../modals/modals.po.js'),
    Projects = require('../projects/projects.po.js'),
    Variables = require('../commons/variables.js'),
    Modals = require('../modals/modals.po.js');

var login = new Login(),
    make = new Make(),
    modals = new Modals(),
    projects = new Projects(),
    vars = new Variables(),
    modals = new Modals(),
    globalFunctions = new GlobalFunctions();

globalFunctions.xmlReport('state');

describe('State ', function() {
    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    fit('bba-257:Save a code project', function() {
        make.get();
        modals.attentionContinueGuest.click();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        make.softwareTab.click();
        browser.sleep(vars.timeToWaitTab);
        make.codeTab.click();
        make.softwareEditCode.click();
        modals.modalAlertOk.click();
        login.loginFromHeader();
        projects.get();
        expect(projects.getProjectCount()).toBe(1);
        login.logout();
    });
});
