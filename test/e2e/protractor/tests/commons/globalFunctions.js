/**
 * Global functions
 */

'use strict';

var CookiesBar = require('../cookiesBar/cookiesBar.po.js'),
    Variables = require('../commons/variables.js');

var cookiesBar = new CookiesBar(),
    os = require('os').type,
    vars = new Variables();

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

    this.toMatchUrlInNewTab = function(url) {
        browser.sleep(vars.timeToWaitTab + 1000);
        return browser.getAllWindowHandles().then(function(handles) {
            browser.sleep(vars.timeToWaitTab + 1000);
            return browser.switchTo().window(handles[1]).then(function() {
                browser.sleep(vars.timeToWaitTab + 1000);
                expect(browser.getCurrentUrl()).toMatch(url);
                return browser.close().then(function() {
                    browser.sleep(vars.timeToWaitTab + 1000);
                    return browser.switchTo().window(handles[0]);
                });
            });
        });
    };

    /**
     * Scroll to the bottom of the page
     * @param  {webdriver.Builder} driver
     * @return {webdriver.promise}
     */
    this.scrollBottomPage = function(driver) {
        driver = driver || browser;
        return driver.executeScript('var windowHeight = $(document).height(); $(window).scrollTop(windowHeight); ');
    };

    this.navigatorLanguage = function() {
        return browser.executeScript('return navigator.language;').then(function(language) {
            return language.split('-')[0];
        });
    };

    this.hasClass = function(element, cls) {
        return element.getAttribute('class').then(function(classes) {
            return classes.split(' ').indexOf(cls) !== -1;
        });
    };

    this.toNumber = function(promiseOrValue) {
        // if it is not a promise, then convert a value
        if (!protractor.promise.isPromise(promiseOrValue)) {
            return parseInt(promiseOrValue, 10);
        }

        // if promise - convert result to number
        return promiseOrValue.then(function(stringNumber) {
            return parseInt(stringNumber, 10);
        });
    };
};

module.exports = Global;
