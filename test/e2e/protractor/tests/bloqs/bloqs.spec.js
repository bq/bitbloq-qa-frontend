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

    it('detect if vars was stored on rename', function() {
        //login.loginWithRandomUser();
        make.get();

        modals.attentionContinueGuest.click();

        modals.rejectTour();
        make.softwareTab.click();

        bloqs.getBloq('functions', 'bloq-void-function').then(function(voidFunctionBloq) {
            bloqs.moveBloq(voidFunctionBloq, {
                x: -100,
                y: 0
            });

            bloqs.moveBloq(voidFunctionBloq, {
                x: -100,
                y: 0
            });

            bloqs.getBloq('functions', 'bloq-void-function').then(function(voidFunctionBloq2) {
                bloqs.moveBloq(voidFunctionBloq2, {
                    x: 0,
                    y: 0
                });

                bloqs.moveBloq(voidFunctionBloq2, {
                    x: 0,
                    y: 100
                });

                bloqs.moveBloq(voidFunctionBloq2, {
                    x: 0,
                    y: 100
                });

                bloqs.connectBloqs('up', voidFunctionBloq, voidFunctionBloq2);

                browser.pause();
            });
        });

        //browser.executeScript('document.querySelectorAll(\'[data-element="toolbox-functions"] .bloq-void-function\')[0].setAttribute("holatom", "10")').then(function() {

        //});

        // Q.all([voidFunctionBloq.getLocation(), executeFunctionBloq.getLocation()]).then(function(pos1, pos2) {
        //     console.log('positions');
        //     console.log(pos1);
        //     console.log(pos2);
        //     browser.sleep(1000);
        //     browser.pause();
        // });

    });

});