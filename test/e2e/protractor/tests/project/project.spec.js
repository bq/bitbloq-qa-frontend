/**
 *Spec para la ficha de projecto
 */

'use strict';

var Login = require('../login/login.po.js'),
    Project = require('./project.po.js'),
    Make = require('../bloqsproject/make.po.js'),
    Variables = require('../commons/variables.js'),
    Modals = require('../modals/modals.po.js');

var login = new Login(),
    project = new Project(),
    make = new Make(),
    vars = new Variables(),
    modals = new Modals();

describe('Project ', function() {

    //beforeEach commons
    vars.beforeTest();

    it('Project must to have a name', function() {

        login.loginWithRandomUser();

        make.get();
        modals.rejectTour();
        expect(project.name.isPresent()).toBe(true);
        expect(project.name.getText()).toBe('Proyecto sin título');

        login.logout();
    });


});
