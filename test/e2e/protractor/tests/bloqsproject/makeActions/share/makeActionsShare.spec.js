/**
 * Spec to makeActionsHelp.spec.js
 * Menu Share of makeActions
 */

'use strict';

var GlobalFunctions = require('../../../commons/globalFunctions.js'),
    MakeActions = require('../makeActions.po.js'),
    Make = require('../../make.po.js'),
    Explore = require('../../../explore/explore.po.js');

var globalFunctions = new GlobalFunctions(),
    makeActions = new MakeActions(),
    make = new Make(),
    explore = new Explore();

globalFunctions.xmlReport('makeActionsShare');
describe('Menu Help of MakeActions', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    //TODO test TOAST
    it('bba-109:Publish project', function() {

        var projectName = make.saveProject(true);

        makeActions.menuShare.click();
        makeActions.menuSharePublish.click();
        makeActions.publishButton.click();
        explore.get();
        explore.exploreFind.sendKeys(projectName.projectName);
        browser.sleep(2000);
        expect(explore.projectName.getText()).toContain(projectName.projectName);

    });

});