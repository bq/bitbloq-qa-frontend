'use strict';

var Login = require('../../login/login.po.js'),
    Header = require('../../header/header.po.js'),
    Help = require('./../help.po.js'),
    // Make = require('../bloqsproject/make.po.js'),
    // Modals = require('../modals/modals.po.js'),
    // Variables = require('../commons/variables.js'),
    GlobalFunctions = require('../../commons/globalFunctions.js');

var login = new Login(),
    header = new Header(),
    help = new Help(),
    // make = new Make(),
    // modals = new Modals(),
    // vars = new Variables(),
    globalFunctions = new GlobalFunctions();

globalFunctions.xmlReport('helpChangelog');

describe('Changelog ', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bba-135:Verify that the changelog tab is displayed (Registered user)', function() {
        login.loginWithRandomUser();
        header.navHelp.click();
        help.changelogTab.click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/help/updates');
        login.logout();
    });

    it('bba-136:Verify that the changelog tab is displayed (Unregistered user)', function() {
        help.get();
        help.changelogTab.click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/help/updates');
    });

    xit('bba-137:Verify that the change and bugs appears in the changelog tab (Registered user)', function() {
        login.loginWithRandomUser();
        header.navHelp.click();
        help.changelogTab.click();
        help.changelogList.each(function(changelog) {
            changelog.click();
            changelog.getText().then(function(title) {
                var text = help.getTitleChangelog(title);
                expect(title).toEqual(text);
            });
        });
        login.logout();
    });

    xit('bba-138:Verify that the change and bugs appears in the changelog tab (Unregistered user)', function() {
        help.get();
        help.changelogTab.click();
        help.changelogList.each(function(changelog) {
            changelog.click();
            changelog.getText().then(function(title) {
                var text = help.getTitleChangelog(title);
                expect(title).toEqual(text);
            });
        });
    });

});
