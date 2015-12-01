'use strict';

var
    GlobalFunctions = require('../commons/globalFunctions.js'),
    Unsupported = require('./unsupported.po.js'),
    Variables = require('../commons/variables.js');

var
    globalFunctions = new GlobalFunctions(),
    unsupported = new Unsupported(),
    vars = new Variables();

globalFunctions.xmlReport('unsupportedDesktop');

describe('Check unsupported in desktop', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bba-69:Check if open bitbloq on firefox redirect to unsupported/desktop', function() {
        expect(browser.getCurrentUrl()).toMatch(browser.baseUrl + '#/unsupported/desktop');
    });

    it('bba-71:If click on "continuar de todos modos" redirect home page', function() {
        unsupported.continueButton.click();
        expect(browser.getCurrentUrl()).toMatch(browser.baseUrl);
    });

    it('bba-72:If click on "Descargar Google Chrome" redirect google chrome web', function() {
        unsupported.downloadGoogleButton.click();
        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {
            browser.ignoreSynchronization = true;
            browser.switchTo().window(handles[1]).then(function() {
                browser.sleep(vars.timeToWaitTab);
                expect(browser.getCurrentUrl()).toMatch('https://www.google.com/chrome/browser/desktop/index.html');
                // Check is present CSS button download chrome in google web
                expect(element(by.css('#marquee > a')).isPresent()).toBe(true);
                browser.close().then(function() {
                    browser.switchTo().window(handles[0]);
                    browser.ignoreSynchronization = false;
                });
            });
        });

    });

});
