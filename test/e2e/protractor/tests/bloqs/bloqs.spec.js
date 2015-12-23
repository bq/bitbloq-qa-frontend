'use strict';

var GlobalFunctions = require('../commons/globalFunctions.js'),
    Make = require('../bloqsproject/make.po.js'),
    Modals = require('../modals/modals.po.js'),
    Bloqs = require('./bloqs.po.js');

var globalFunctions = new GlobalFunctions(),
    make = new Make(),
    modals = new Modals(),
    bloqs = new Bloqs();

globalFunctions.xmlReport('bloqs');

describe('bloqs', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    xit('check bloqs connections', function() {
        //login.loginWithRandomUser();
        make.get();

        modals.attentionContinueGuest.click();

        modals.rejectTour();
        make.softwareTab.click();

        bloqs.connectElement();
        browser.pause();
    });

});
