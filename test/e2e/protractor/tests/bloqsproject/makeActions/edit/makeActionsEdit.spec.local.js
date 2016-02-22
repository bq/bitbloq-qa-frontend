/**
 *Spec to makeActionsEdit.spec.js
 * Menu Edit of makeActions
 */

'use strict';

var Variables = require('../../../commons/variables.js'),
    GlobalFunctions = require('../../../commons/globalFunctions.js'),
    Make = require('../../../bloqsproject/make.po.js'),
    Modals = require('../../../modals/modals.po.js'),
    HwTab = require('../../hwtab/hwtab.po.js'),
    MakeActions = require('../makeActions.po.js'),
    path = require('path');

var vars = new Variables(),
    globalFunctions = new GlobalFunctions(),
    modals = new Modals(),
    hwTab = new HwTab(),
    make = new Make(),
    makeActions = new MakeActions();

globalFunctions.xmlReport('makeactionsEditLocal');

describe('Menu file of MakeActions', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    xit('bba-133:makeactionsEditLocal: Verify undo&redo action on hwTab', function() {

        make.get();
        modals.attentionContinueGuest.click();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);

        //Upload file
        var fileToUpload = path.resolve() + '/test/e2e/protractor/res/servoWithLCD.json';
        makeActions.inputUploadFile.sendKeys(fileToUpload);

        browser.sleep(1000);

        expect(hwTab.sampleLed.isPresent()).toBe(true);
        expect(hwTab.sampleServo.isPresent()).toBe(true);

        hwTab.sampleLed.click();

        hwTab.sampleLed.sendKeys(protractor.Key.DELETE);

        expect(hwTab.sampleLed.isPresent()).toBe(false);

        makeActions.menuEdit.click();
        makeActions.menuEditUndo.click();

        expect(hwTab.sampleLed.isPresent()).toBe(true);

        makeActions.menuEdit.click();
        makeActions.menuEditRedo.click();

        expect(hwTab.sampleLed.isPresent()).toBe(false);

        browser.actions().mouseMove(hwTab.sampleServo).perform();
        browser.actions().click(protractor.Button.RIGHT).perform();

        hwTab.hwContextMenuDelete.click();

        expect(hwTab.sampleServo.isPresent()).toBe(false);

        makeActions.menuEdit.click();
        makeActions.menuEditUndo.click();

        expect(hwTab.sampleServo.isPresent()).toBe(true);

    });

});
