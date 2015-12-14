/**
 *Spec to  para la tab de projects, es decir, para la pestaña de mis proyectos
 */

'use strict';

var Variables = require('../../commons/variables.js'),
    Projects = require('../projects.po.js'),
    MyProjects = require('./myprojects.po.js'),
    Make = require('../../bloqsproject/make.po.js'),
    Modals = require('../../modals/modals.po.js'),
    GlobalFunctions = require('../../commons/globalFunctions.js'),
    Login = require('../../login/login.po.js'),
    path = require('path'),
    fs = require('fs');

var vars = new Variables(),
    projects = new Projects(),
    myprojects = new MyProjects(),
    make = new Make(),
    modals = new Modals(),
    login = new Login(),
    globalFunctions = new GlobalFunctions();

globalFunctions.xmlReport('projects');

describe('My projects, local', function() {
    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bba-149:Verify copy a project', function() {
        var nameProject = 'test';
        make.saveProjectNewUser(nameProject);
        projects.get();
        browser.sleep(vars.timeToWaitTab);
        var file1 = path.resolve() + '/target/' + nameProject + '.ino';
        myprojects.overMyProjects.click();
        browser.sleep(vars.timeToWaitFadeModals);
        myprojects.downloadIno.click();
        browser.driver.wait(function() {
            return fs.existsSync(file1);
        }, 4000).then(function() {
            myprojects.overMyProjects.click();
            browser.sleep(vars.timeToWaitFadeModals);
            myprojects.copyProject.click();
            browser.sleep(vars.timeToWaitFadeModals);
            modals.okDialog.click();
            browser.sleep(vars.timeToWaitAutoSave).then(function() {
                expect(myprojects.projectName.getText()).toEqual('Copia de ' + nameProject);
                //var direccion = '/target/' + 'Copia_de_' + nameProject + '.ino';
                var file2 = path.resolve() + '/target/' + 'Copia_de_' + nameProject + '.ino';
                myprojects.overMyProjects.click();
                browser.sleep(vars.timeToWaitFadeModals);
                myprojects.downloadIno.click();
                browser.driver.wait(function() {
                    return fs.existsSync(file2);

                }, 4000).then(function() {
                    expect(fs.readFileSync(file1, 'utf8')).toEqual(fs.readFileSync(file2, 'utf8'));
                    login.logout();
                });
            });
        });

    });

});
