'use strict';

var
    GlobalFunctions = require('../commons/globalFunctions.js'),
    Unsupported = require('./unsupported.po.js'),
    Variables = require('../commons/variables.js'),
    Bloqsproject = require('../bloqsproject/make.po.js'),
    Register = require('../register/register.po.js'),
    Explore = require('../explore/explore.po.js'),
    Forum = require('../forum/forum.po.js'),
    Codeproject = require('../codeproject/codeproject.po.js');

var
    globalFunctions = new GlobalFunctions(),
    unsupported = new Unsupported(),
    vars = new Variables(),
    bloqsproject = new Bloqsproject(),
    register = new Register(),
    explore = new Explore(),
    forum = new Forum(),
    codeproject = new Codeproject();

globalFunctions.xmlReport('unsupportedDesktop');

describe('Check unsupported in desktop', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('SWBIT-3219:Check if open bitbloq on firefox redirect to unsupported/desktop', function() {
        expect(browser.getCurrentUrl()).toMatch(browser.baseUrl + '#/unsupported/desktop');
    });

    it('SWBIT-3220:If click on "continuar de todos modos" redirect home page', function() {
        unsupported.continueButton.click();
        expect(browser.getCurrentUrl()).toMatch(browser.baseUrl);
    });

    it('SWBIT-3221:If click on "Descargar Google Chrome" redirect google chrome web', function() {
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

    it('SWBIT-2888:Check if open bitbloq on firefox redirect to unsupported/desktop only first time', function() {
        unsupported.continueButton.click();
        expect(browser.getCurrentUrl()).toMatch(browser.baseUrl);
        bloqsproject.get();
        expect(browser.getCurrentUrl()).toMatch(browser.baseUrl + bloqsproject.url);
        register.get();
        expect(browser.getCurrentUrl()).toMatch(browser.baseUrl + register.url);
        explore.get();
        expect(browser.getCurrentUrl()).toMatch(browser.baseUrl + explore.url);
        codeproject.get();
        expect(browser.getCurrentUrl()).toMatch(browser.baseUrl + codeproject.url);
        forum.get();
        expect(browser.getCurrentUrl()).toMatch(browser.baseUrl + forum.url);
    });

});
