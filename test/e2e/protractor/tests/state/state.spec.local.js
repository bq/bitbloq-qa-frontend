/**
 * Commons Spec to state
 */

'use strict';

var Login = require('../login/login.po.js'),
    Make = require('../bloqsproject/make.po.js'),
    GlobalFunctions = require('../commons/globalFunctions.js'),
    Modals = require('../modals/modals.po.js'),
    Projects = require('../projects/projects.po.js'),
    Modals = require('../modals/modals.po.js'),
    path = require('path');

var login = new Login(),
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

    xit('bba-256:Save a bloqs project', function() {
        var name = 'Ultrasonidos_Bloqs';
        make.importFileGuestUser(path.resolve() + '/test/e2e/protractor/res/' + name +'.json');
        login.loginFromHeader('bloqsproject');
        modals.rejectTour();
        expect(make.projectName.getText()).toEqual(name);
        projects.get();
        expect(projects.getProjectCount()).toBe(1);
        login.logout();
    });

});
