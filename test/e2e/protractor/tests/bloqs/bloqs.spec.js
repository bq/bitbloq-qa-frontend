'use strict';

var GlobalFunctions = require('../commons/globalFunctions.js'),
    Make = require('../bloqsproject/make.po.js'),
    Modals = require('../modals/modals.po.js'),
    Variables = require('../commons/variables.js'),
    Bloqs = require('./bloqs.po.js');

var globalFunctions = new GlobalFunctions(),
    make = new Make(),
    modals = new Modals(),
    vars = new Variables(),
    bloqs = new Bloqs();

globalFunctions.xmlReport('bloqs');

describe('bloqs', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('check api', function() {
        //login.loginWithRandomUser();
        make.get();

        modals.attentionContinueGuest.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        make.softwareTab.click();
        browser.sleep(vars.timeToWaitTab);

        bloqs.getBloqFunctions('bloq-return-function').then(function(bloque1) {
            bloqs.addToGroupVars(bloque1);
            bloqs.closeTab();
            bloqs.getBloqMaths('bloq-random').then(function(bloque2) {
                bloqs.connectElementReturn(bloque1, bloque2);
                bloqs.closeTab();
                bloqs.getBloqMaths('bloq-random').then(function(bloque3) {
                    bloqs.connectElementNested('ARG1', bloque2, bloque3);
                    bloqs.closeTab();
                    bloqs.getBloqMaths('bloq-number').then(function(bloque5) {
                        bloqs.connectElementNested('ARG1', bloque3, bloque5);
                        bloqs.closeTab();
                    });
                    bloqs.getBloqMaths('bloq-random').then(function(bloque4) {
                        bloqs.connectElementNested('ARG2', bloque2, bloque4);
                        bloqs.closeTab();
                        bloqs.getBloqMaths('bloq-number').then(function(bloque6) {
                            bloqs.connectElementNested('ARG2', bloque4, bloque6);
                            bloqs.closeTab();
                        });
                    });
                    bloqs.getBloqMaths('bloq-number').then(function(bloque9) {
                        bloqs.connectElementNested('ARG2', bloque3, bloque9);
                        bloqs.closeTab();
                    });
                });
            });
        });

        bloqs.getBloqVars('bloq-declare-variable').then(function(bloque1) {
            bloqs.addToGroupSetup(bloque1);
            bloqs.closeTab();
            bloqs.getBloqMaths('bloq-random').then(function(bloque2) {
                bloqs.connectElementFixed('VALUE', bloque1, bloque2);
                bloqs.closeTab();
                bloqs.getBloqMaths('bloq-random').then(function(bloque3) {
                    bloqs.connectElementNested('ARG1', bloque2, bloque3);
                    bloqs.closeTab();
                    bloqs.getBloqMaths('bloq-number').then(function(bloque6) {
                        bloqs.connectElementNested('ARG2', bloque2, bloque6);
                        bloqs.closeTab();
                    });
                    bloqs.getBloqControl('bloq-if').then(function(bloque8) {
                        bloqs.connectBloqsDown(bloque1, bloque8);
                        bloqs.closeTab();
                        bloqs.getBloqControl('bloq-millis').then(function(bloque6) {
                            bloqs.connectElementHeader('ARG1', bloque8, bloque6);
                            bloqs.closeTab();
                        });
                        bloqs.getBloqMaths('bloq-number').then(function(bloque9) {
                            bloqs.connectElementHeader('ARG2', bloque8, bloque9);
                            bloqs.closeTab();
                        });
                    });
                    bloqs.getBloqMaths('bloq-number').then(function(bloque9) {
                        bloqs.connectElementNested('ARG2', bloque3, bloque9);
                        bloqs.closeTab();
                    });
                });
            });
        });
        //browser.pause();
    });
});
