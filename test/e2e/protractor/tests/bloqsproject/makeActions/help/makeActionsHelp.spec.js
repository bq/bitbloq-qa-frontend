/**
 *Spec to makeActionsHelp.spec.js
 * Menu Help of makeActions
 */

'use strict';

var Variables = require('../../../commons/variables.js'),
   GlobalFunctions = require('../../../commons/globalFunctions.js'),
   MakeActions = require('../makeActions.po.js'),
   Login = require('../../../login/login.po.js'),
   Make = require('../..//make.po.js'),
   Modals = require('../../../modals/modals.po.js');

var vars = new Variables(),
   globalFunctions = new GlobalFunctions(),
   makeActions = new MakeActions(),
   login = new Login(),
   make = new Make(),
   modals = new Modals();

globalFunctions.xmlReport('makeActionsHelp');

describe('Menu Help of MakeActions', function() {

   //beforeEach commons
   globalFunctions.beforeTest();

   // afterEach commons
   globalFunctions.afterTest();

   it('bba-94:Login and test if there are all items visibles && redirect to faq, forum and help', function() {

      login.loginWithRandomUser();
      make.get();
      modals.rejectTour();
      browser.sleep(vars.timeToWaitFadeModals);
      makeActions.menuHelp.click();

      //test item "Enviar comentarios" && "Informar de un error"  are enable
      expect(makeActions.menuHelpComments.getAttribute('disabled')).not.toBeTruthy();
      expect(makeActions.menuHelpErrorFeedback.getAttribute('disabled')).not.toBeTruthy();

      // Test redirect to faq, forum and help

      function _toMatchUrl(url) {
         browser.sleep(vars.timeToWaitTab);
         return browser.getAllWindowHandles().then(function(handles) {
            return browser.switchTo().window(handles[1]).then(function() {
               expect(browser.getCurrentUrl()).toMatch(url);
               return browser.close().then(function() {
                  return browser.switchTo().window(handles[0]);
               });
            });
         });
      }

      makeActions.menuHelpFaq.click().then(function() {
         browser.sleep(vars.timeToWaitTab);
         _toMatchUrl(/#\/help/).then(function() {

            makeActions.menuHelpTutorial.click().then(function() {
               browser.sleep(vars.timeToWaitTab);
               _toMatchUrl(/#\/help\/tutorial/).then(function() {

                  // FOrum not ready yet to test
                  // makeActions.menuHelpForum.click().then(function() {
                  //     browser.sleep(vars.timeToWaitTab);
                  //     _toMatchUrl(/#\/help\/forum/);
                  // });

               });
            });

         });
      });

      login.logout();
   });

   //TODO CHECK TOAST
   it('bba-103:Login and send comments', function() {

      login.loginWithRandomUser();
      make.get();

      modals.rejectTour();
      browser.sleep(vars.timeToWaitFadeModals);

      makeActions.menuHelp.click();
      makeActions.menuHelpComments.click();

      modals.sendCommentsName.sendKeys('TestName');
      modals.sendCommentsTextarea.sendKeys('Hell text area');
      modals.confirmOnly.click();

      // TOAST
      // browser.sleep(500);
      // expect(element(by.id('modal-comments-done')).isDisplayed()).toBeTruthy();
      // expect(element(by.id('modal-comments-done')).isPresent()).toBe(true);

      login.logout();
   });

   //TODO CHECK TOAST
   it('bba-104:Login and feedback error', function() {

      login.loginWithRandomUser();
      make.get();
      modals.rejectTour();
      browser.sleep(vars.timeToWaitFadeModals);
      makeActions.menuHelp.click();
      makeActions.menuHelpErrorFeedback.click();

      modals.notifyErrorTextArea.sendKeys('Text write in text area');
      modals.notifyErrorSO.sendKeys('Text write S.O Ubuntu ;)');
      modals.notifyErrorBrowser.sendKeys('Text write browser');
      modals.confirmOnly.click();

      login.logout();
   });


   it('bba-106:NO login, send comment and feedback modal are not displayed but it posible send mailto', function() {

      make.get();
      modals.attentionContinueGuest.click();
      modals.rejectTour();
      browser.sleep(vars.timeToWaitFadeModals);

      makeActions.menuHelp.click();
      ///test item "Enviar comentarios" && "Informar de un error"  are enable
      expect(makeActions.menuHelpComments.getAttribute('href')).toMatch('mailto:support-bitbloq@bq.com');
      expect(makeActions.menuHelpErrorFeedback.getAttribute('href')).toMatch('mailto:support-bitbloq@bq.com');

   });

});
