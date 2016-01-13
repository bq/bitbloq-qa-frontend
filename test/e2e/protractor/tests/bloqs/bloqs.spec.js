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

        var advanced = true;

        bloqs.getBloq('functions', 'bloq-return-function', !advanced).then(function(bloque1) {
            bloqs.addToGroup('vars', bloque1);
            bloqs.closeTab();
            bloqs.getBloq('maths', 'bloq-random', !advanced).then(function(bloque2) {
                bloqs.connectElementReturn('RETURN', bloque1, bloque2);
                bloqs.closeTab();
                bloqs.getBloq('maths', 'bloq-random', !advanced).then(function(bloque3) {
                    bloqs.connectElementNested('ARG1', bloque2, bloque3);
                    bloqs.closeTab();
                    bloqs.getBloq('maths', 'bloq-number', !advanced).then(function(bloque5) {
                        bloqs.connectElementNested('ARG1', bloque3, bloque5);
                        bloqs.closeTab();
                    });
                    bloqs.getBloq('maths', 'bloq-random', !advanced).then(function(bloque4) {
                        bloqs.connectElementNested('ARG2', bloque2, bloque4);
                        bloqs.closeTab();
                        bloqs.getBloq('maths', 'bloq-number', !advanced).then(function(bloque6) {
                            bloqs.connectElementNested('ARG2', bloque4, bloque6);
                            bloqs.closeTab();
                        });
                    });
                    bloqs.getBloq('maths', 'bloq-number', !advanced).then(function(bloque9) {
                        bloqs.connectElementNested('ARG2', bloque3, bloque9);
                        bloqs.closeTab();
                    });
                });
            });
        });

        bloqs.getBloq('vars', 'bloq-declare-variable', !advanced).then(function(bloque1) {
            bloqs.addToGroup('setup', bloque1);
            bloqs.closeTab();
            bloqs.getBloq('maths', 'bloq-random', !advanced).then(function(bloque2) {
                bloqs.connectElementFixed('VALUE', bloque1, bloque2);
                bloqs.closeTab();
                bloqs.getBloq('maths', 'bloq-random', !advanced).then(function(bloque3) {
                    bloqs.connectElementNested('ARG1', bloque2, bloque3);
                    bloqs.closeTab();
                    bloqs.getBloq('maths', 'bloq-number', !advanced).then(function(bloque6) {
                        bloqs.connectElementNested('ARG2', bloque2, bloque6);
                        bloqs.closeTab();
                    });
                    bloqs.getBloq('control', 'bloq-if', !advanced).then(function(bloque8) {
                        bloqs.connectBloqs('down', bloque1, bloque8);
                        bloqs.closeTab();
                        bloqs.getBloq('control', 'bloq-millis', !advanced).then(function(bloque6) {
                            bloqs.connectElementHeader('ARG1', bloque8, bloque6);
                            bloqs.closeTab();
                        });
                        bloqs.getBloq('maths', 'bloq-number', !advanced).then(function(bloque9) {
                            bloqs.connectElementHeader('ARG2', bloque8, bloque9);
                            bloqs.closeTab();
                        });
                    });
                    bloqs.getBloq('maths', 'bloq-number', !advanced).then(function(bloque9) {
                        bloqs.connectElementNested('ARG2', bloque3, bloque9);
                        bloqs.closeTab();
                    });
                });
            });
        });
        browser.pause();
    });
});
