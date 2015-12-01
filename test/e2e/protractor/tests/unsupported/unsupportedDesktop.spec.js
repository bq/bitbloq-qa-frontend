'use strict';

var
    GlobalFunctions = require('../commons/globalFunctions.js');

var
    globalFunctions = new GlobalFunctions();

globalFunctions.xmlReport('unsupportedDesktop');

describe('Check unsupported in desktop', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bba-69:Check if open bitbloq on firefox redirect to unsupported/desktop', function() {
        expect(browser.getCurrentUrl()).toMatch(browser.baseUrl + '#/unsupported/desktop');
    });

});
