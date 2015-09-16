/**
 *Spec to cookiesBar
 */

'use strict';

var CookiesBar = require('./cookiesBar.po.js'),
   GlobalFunctions = require('../commons/globalFunctions.js'),
   Variables = require('../commons/variables.js'),
   Make = require('../bloqsproject/make.po.js'),
   Modals = require('../modals/modals.po.js');

var cookiesBar = new CookiesBar(),
   globalFunctions = new GlobalFunctions(),
   vars = new Variables(),
   make = new Make(),
   modals = new Modals();

globalFunctions.xmlReport('cookiesBar');

describe('Test CookiesBar', function() {

   /* No globalFunctions.beforeTest because is necessary check close cookies bar for each check.
    *
    * In this test is necessary open diferent browser (new instances --> new session --> differents cookies)
    * to check open or not open CookiesBar
    *
    * No expect in this test because testing is click in cookies bar, if no click no cookies bar and throw error
    *
    * Info some browser in same test:
    * https://github.com/angular/protractor/blob/master/docs/browser-setup.md#using-multiple-browsers-in-the-same-test
    *
    */

   it('bba-125:Check cookies bar shows any page if not login user', function() {

      //check landing
      browser.manage().window().setSize(1024, 768);
      browser.get(browser.baseUrl);
      browser.waitForAngular();
      cookiesBar.closeCookiesBar();
      //browser.close(); NO CLOSE SESSION, use this instance to create id project (make.saveProjectAndPublish())

      //check bloqsproject
      var browserBloqsPrjectUrl = browser.forkNewDriverInstance(),
         $2 = browserBloqsPrjectUrl.$;
      browserBloqsPrjectUrl.get(browser.baseUrl + '#/bloqsproject');
      browserBloqsPrjectUrl.manage().window().setSize(1024, 768);
      browserBloqsPrjectUrl.waitForAngular();
      $2(modals.attentionContinueGuest.elementArrayFinder_.locator_.value).click();
      $2(modals.rejectTourPO.elementArrayFinder_.locator_.value).click();
      browserBloqsPrjectUrl.sleep(vars.timeToWaitFadeModals);
      $2(cookiesBar.cookiesBar.elementArrayFinder_.locator_.value).click();
      browserBloqsPrjectUrl.close();

      //check explora
      var browserExplore = browser.forkNewDriverInstance();
      $2 = browserExplore.$;
      browserExplore.get(browser.baseUrl + '#/explore');
      browserExplore.manage().window().setSize(1024, 768);
      browserExplore.waitForAngular();
      $2(cookiesBar.cookiesBar.elementArrayFinder_.locator_.value).click();
      browserExplore.close();

      //check codeproject
      var browserCodeproject = browser.forkNewDriverInstance();
      $2 = browserCodeproject.$;
      browserCodeproject.get(browser.baseUrl + '#/codeproject');
      browserCodeproject.manage().window().setSize(1024, 768);
      browserCodeproject.waitForAngular();
      $2(cookiesBar.cookiesBar.elementArrayFinder_.locator_.value).click();
      browserCodeproject.close();


      //check bloqsproject/<id> && codeproject/<id>

      make.saveProjectAndPublish().then(function(project) {

         var browserBloqsProjectID = browser.forkNewDriverInstance();
         $2 = browserBloqsProjectID.$;
         browserBloqsProjectID.get(project.urlid);
         browserBloqsProjectID.manage().window().setSize(1024, 768);
         browserBloqsProjectID.waitForAngular();
         $2(cookiesBar.cookiesBar.elementArrayFinder_.locator_.value).click();
         browserBloqsProjectID.close();

         var browserCodeProjectID = browser.forkNewDriverInstance();
         $2 = browserCodeProjectID.$;
         browserCodeProjectID.get(project.urlid);
         browserCodeProjectID.manage().window().setSize(1024, 768);
         browserCodeProjectID.waitForAngular();
         $2(make.softwareTab.elementArrayFinder_.locator_.value).click();
         $2(make.codeTab.elementArrayFinder_.locator_.value).click();
         $2(cookiesBar.cookiesBar.elementArrayFinder_.locator_.value).click();
         browserCodeProjectID.close();

         return true;
      });

      browser.close();

   });

    xit('bba-126:Check, If you close cookies bar it not appear again in other pages (in same session)', function() {
      //TODO
    });

    xit('bba-127:Check, Login user accept cookies and never appear in other session', function() {
      //TODO
    });

});
