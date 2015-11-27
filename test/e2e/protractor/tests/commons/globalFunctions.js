/**
 * Global functions
 */

'use strict';

var CookiesBar = require('../cookiesBar/cookiesBar.po.js');

var cookiesBar = new CookiesBar(),
os = require('os').type;

var Global = function() {

   this.beforeTest = function() {
      beforeEach(function() {
         browser.manage().window().setSize(1024, 768);
         browser.get(browser.baseUrl);
         browser.waitForAngular();
         cookiesBar.closeCookiesBar();
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

   this.filePath = function(nameFile) {
     if (os() === 'Windows_NT') {
         nameFile = nameFile.replace('/', '\\');
     }
     return nameFile;
   };

};

module.exports = Global;
