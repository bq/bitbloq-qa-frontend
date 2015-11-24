/**
 *Spec to hwtab.spec.js
 * hardwareTab tests
 */

'use strict';

var GlobalFunctions = require('../../commons/globalFunctions.js');

var globalFunctions = new GlobalFunctions();

globalFunctions.xmlReport('hardwareTab');

describe('hardwareTab testing', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('hwTab spec', function() {

        expect(true).toBe(true);

    });

});
