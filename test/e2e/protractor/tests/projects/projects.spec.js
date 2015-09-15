/**
 *Spec to  para la tab de projects, es decir, para la pestaña de mis proyectos
 */

'use strict';


var Variables = require('../commons/variables.js'),
   GlobalFunctions = require('../commons/globalFunctions.js'),
   Make = require('../bloqsproject/make.po.js'),
   Login = require('../login/login.po.js'),
   Projects = require('./projects.po.js'),
   MyProjects = require('../myprojects/myprojects.po.js'),
   Modals = require('../modals/modals.po.js'),
   Infotab = require('../bloqsproject/infotab/infotab.po.js');

var vars = new Variables(),
   globalFunctions = new GlobalFunctions(),
   login = new Login(),
   make = new Make(),
   projects = new Projects(),
   myprojects = new MyProjects(),
   modals = new Modals(),
   infotab = new Infotab();

globalFunctions.xmlReport('projects');

describe('Projects', function() {

   //beforeEach commons
   globalFunctions.beforeTest();

   // afterEach commons
   globalFunctions.afterTest();

   //TODO Check --> Alert (toast) && Create click into "Projecto sin titulo"
   it('bba-105:Correct elemination --> Create project and eliminate ', function() {

      //Create and check saved project
      var newLoginRandom = login.loginWithRandomUser();
      make.get();
      modals.rejectTour();
      browser.sleep(vars.timeToWaitFadeModals);
      make.infoTab.click();
      infotab.infotabProjectName.clear();

      //Nombre del projecto
      var name = 'Test_Save_' + Number(new Date());
      infotab.infotabProjectName.sendKeys(name);
      browser.sleep(7000);

      //Comprobar que se ha guardado el projecto por el nombre
      projects.get();
      expect(projects.projectsName.getText()).toEqual(name);

      //Eliminar el projecto
      myprojects.overMyProjects.click();
      myprojects.eliminateMyProjects.click();

      //Comprobar que aparece la alerta de se ha eliminado
      //expect(projects.alert.isDisplayed()).toBeTruthy();

      login.logout();

      //Login with a user creator last project
      login.get();
      login.login(newLoginRandom.user, newLoginRandom.password);

      //Check no exist las project
      projects.get();
      expect(projects.projectsName.isPresent()).toBe(false);
      login.logout();


   });

    it('bba-57:Verify that the Search bar work correctly', function() {
        login.loginWithRandomUser();
        var nameProject = make.saveProjectAndPublish(true, false);
        make.saveProjectAndPublish(false, false);
        make.saveProjectAndPublish(false, false);
        projects.get();

        projects.findBar.clear().sendKeys(nameProject).then(function() {
            browser.sleep(2000);
            projects.listProject.all(by.tagName('li')).count().then(function(result) {
                console.log(result);
                expect(Number(result)).toEqual(1);
            });
        });

        projects.findBar.clear().sendKeys('test_save__').then(function() {
            browser.sleep(2000);
            projects.listProject.all(by.tagName('li')).count().then(function(result) {
                console.log(result);
                expect(Number(result) >= 1).toBeTruthy();
            });
        });

        projects.findBar.clear().sendKeys('no_hay_test').then(function() {
            browser.sleep(2000);
            projects.listProject.all(by.tagName('li')).count().then(function(result) {
                console.log(result);
                expect(Number(result)).toEqual(0);
            });
        });

        login.logout();

    });

});
