'use strict';

var
    GlobalFunctions = require('../commons/globalFunctions.js'),
    Unsupported = require('./unsupported.po.js');

var
    globalFunctions = new GlobalFunctions(),
    unsupported = new Unsupported();

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

});
