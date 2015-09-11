/**
 *Spec to makeActionsFile.spec.js
 * Menu File of makeActions
 */

'use strict';

var Variables = require('../../../commons/variables.js'),
   GlobalFunctions = require('../../../commons/globalFunctions.js'),
   MakeActions = require('../makeActions.po.js'),
   Make = require('../../make.po.js'),
   Modals = require('../../../modals/modals.po.js'),
   path = require('path'),
   fs = require('fs'),
   Login = require('../../../login/login.po.js'),
   Infotab = require('../../infotab/infotab.po.js');

var vars = new Variables(),
   globalFunctions = new GlobalFunctions(),
   makeActions = new MakeActions(),
   make = new Make(),
   modals = new Modals(),
   login = new Login(),
   infotab = new Infotab();

globalFunctions.xmlReport('makeActionsFileLocal');

describe('Menu file of MakeActions, specs only in local ', function() {

   //beforeEach commons
   globalFunctions.beforeTest();

   // afterEach commons
   globalFunctions.afterTest();

   it('bba-89:Download project', function() {

      login.loginWithRandomUser();
      make.get();
      modals.rejectTour();
      browser.sleep(vars.timeToWaitFadeModals);
      //create new project
      make.infoTab.click();
      infotab.infotabProjectName.clear();
      infotab.infotabProjectName.sendKeys('Test_Save');
      browser.sleep(vars.timeToWaitAutoSave);
      //modals.attentionContinueGuest.click();
      //browser.sleep(vars.timeToWaitFadeModals);

      var project = element(by.id('currentproject')).evaluate('project'),
         filename = path.resolve() + '/target/Test_Save.json';

      var projectObj = {};

      project.then(function(value) {
         projectObj = {
            'name': value.name,
            'description': value.description,
            'software': value.software,
            'hardware': value.hardware,
            'hardwareTags': value.hardwareTags,
            'userTags': value.userTags
         };
         delete projectObj.software.freeBloqs;
         delete projectObj.hardware.boardMetadata;
      });

      makeActions.menuFile.click();
      makeActions.menuDownload.click();

      //Wait to download file
      browser.driver.wait(function() {
         // Wait until the file has been downloaded.
         // We need to wait thus as otherwise protractor has a nasty habit of
         // trying to do any following tests while the file is still being
         // downloaded and hasn't been moved to its final location.
         return fs.existsSync(filename);
      }, 4000).then(function() {
         // Do whatever checks you need here.  This is a simple comparison;
         // for a larger file you might want to do calculate the file's MD5
         // hash and see if it matches what you expect.
         expect(JSON.parse(fs.readFileSync(filename, 'utf8'))).toEqual(projectObj);
      });

      login.logout();
   });

   it('bba-90:Open from file, download and compare if is equal ', function() {

      make.get();
      modals.attentionContinueGuest.click();
      modals.rejectTour();
      browser.sleep(vars.timeToWaitFadeModals);

      //Upload file
      var fileToUpload = path.resolve() + '/test/e2e/protractor/res/onlyBoardZum.json';
      makeActions.inputUploadFile.sendKeys(fileToUpload);

      //If file download exist, delete it
      var fileDownload = path.resolve() + '/target/onlyBoardZum.json';

      //Download file
      makeActions.menuFile.click();
      makeActions.menuDownload.click();

      //Wait to download file and compare upload file to download file
      browser.driver.wait(function() {
         return fs.existsSync(fileDownload);
      }, 4000).then(function() {

         expect(JSON.parse(fs.readFileSync(fileDownload, 'utf8'))).toEqual(JSON.parse(fs.readFileSync(fileToUpload, 'utf8')));

      });


   });

   // OjO need fix bug --> not charge dropdowns
   it('bba-91:Check export in arduino project (only one project)', function() {

      make.get();
      modals.attentionContinueGuest.click();
      modals.rejectTour();
      browser.sleep(vars.timeToWaitFadeModals);

      //Upload file
      var fileToUpload = path.resolve() + '/test/e2e/protractor/res/Creando_un_voltimetro_con_bitbloq.json';
      var fileToCompare = path.resolve() + '/test/e2e/protractor/res/Creando_un_voltimetro_con_bitbloq.ino';

      makeActions.inputUploadFile.sendKeys(fileToUpload);

      //If file download exist, delete it (a export file, no a upload file )
      var fileDownload = path.resolve() + '/target/Creando_un_voltimetro_con_bitbloq.ino';
      if (fs.existsSync(fileDownload)) {
         // Make sure the browser doesn't have to rename the download.
         fs.unlinkSync(fileDownload);
      }

      //Download file
      makeActions.menuFile.click();
      makeActions.menuExportArduino.click();

      //Wait to download file and compare upload file to download file

      browser.driver.wait(function() {
         return fs.existsSync(fileDownload);
      }, 4000).then(function() {

         expect(fs.readFileSync(fileDownload, 'utf8')).toEqual(fs.readFileSync(fileToCompare, 'utf8'));
      });

      // TODO , first fix bug upload second project

      //Upload other project

      //Upload file
      // fileToUpload = path.resolve() + '/test/e2e/protractor/res/Comunicacion_Serie_USB_con_bitbloq__Leer.json';
      // fileToCompare = path.resolve() + '/test/e2e/protractor/res/Comunicacion_Serie_USB_con_bitbloq__Leer.ino';

      //makeActions.inputUploadFile.sendKeys(fileToUpload);
      //
      ////If file download exist, delete it (a export file, no a upload file )
      //fileDownload = path.resolve() + '/target/e2e/protractor/Comunicacion_Serie_USB_con_bitbloq__Leer.ino';
      //if (fs.existsSync(fileDownload)) {
      //    // Make sure the browser doesn't have to rename the download.
      //    fs.unlinkSync(fileDownload);
      //}

      ////Download file
      //makeActions.menuFile.click();
      //makeActions.menuExportArduino.click();
      //
      ////Wait to download file and compare upload file to download file
      //browser.driver.wait(function() {
      //    return fs.existsSync(fileDownload);
      //}, 4000).then(function() {
      //
      //    expect(fs.readFileSync(fileDownload, 'utf8')).toEqual(fs.readFileSync(fileToCompare, 'utf8'));
      //
      //    fs.unlink(fileDownload, done);
      //});


   });

});
