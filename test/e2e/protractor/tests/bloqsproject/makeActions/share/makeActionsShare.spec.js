/**
 * Spec to makeActionsHelp.spec.js
 * Menu Share of makeActions
 */

'use strict';

var Variables = require('../../../commons/variables.js'),
    MakeActions = require('../makeActions.po.js'),
    Make = require('../../make.po.js'),
    Explore = require('../../../explore/explore.po.js');

var vars = new Variables(),
    makeActions = new MakeActions(),
    make = new Make(),
    explore = new Explore();

describe('Menu Help of MakeActions', function() {

    //beforeEach commons
    vars.beforeTest();

    // afterEach commons
    vars.afterTest();

    //TODO test TOAST
    it('bba-109:Publish project', function() {

        var projectName = make.saveProject(true);

        makeActions.menuShare.click();
        makeActions.menuSharePublish.click();

        explore.get();
        explore.exploreFind.sendKeys(projectName.projectName);
        browser.sleep(2000);
        expect(explore.projectName.getText()).toContain(projectName.projectName);

    });

});
