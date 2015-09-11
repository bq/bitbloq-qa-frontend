/**
 * Global functions
 */

'use strict';

var Commons = require('./commons.po.js');
var commons = new Commons();

var Global = function() {

   this.beforeTest = function() {
      beforeEach(function() {
         browser.manage().window().setSize(1024, 768);
         browser.get(browser.baseUrl);
         browser.waitForAngular();
         // Close cookies bar
         commons.cookiesBar.click();
         browser.sleep(1000);
      });
   };

   this.afterTest = function() {
      afterEach(function() {
         browser.executeScript('window.sessionStorage.clear();');
         browser.executeScript('window.localStorage.clear();');
         browser.manage().deleteAllCookies();
      });
   };

   this.xmlReport = function(fileName) {
      beforeAll(function() {
         var jasmineReporters = require('jasmine-reporters');
         jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            filePrefix: fileName,
            savePath: 'target/report/'
         }));
      });
   };

};

module.exports = Global;
