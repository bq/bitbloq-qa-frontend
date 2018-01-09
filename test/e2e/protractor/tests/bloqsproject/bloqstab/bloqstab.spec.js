/**
 *Spec to login
 */

'use strict';

var GlobalFunctions = require('../commons/globalFunctions.js'),
    Make = require('./make.po.js');

var globalFunctions = new GlobalFunctions(),
    make = new Make();

globalFunctions.xmlReport('bloqstab');

describe('make tab', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('SWBIT-2969:bloqsproject:Save project', function() {
        make.saveProjectNewUser();
        make.softwareTab.click();
        expect(make.componentsIcon.isVisible()).toBe(true);
    });

});
