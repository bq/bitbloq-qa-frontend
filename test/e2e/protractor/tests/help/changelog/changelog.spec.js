'use strict';

var Login = require('../../login/login.po.js'),
    Header = require('../../header/header.po.js'),
    Help = require('./../help.po.js'),
    Make = require('../../bloqsproject/make.po.js'),
    Modals = require('../../modals/modals.po.js'),
    Variables = require('../../commons/variables.js'),
    Forum = require('../forum/forum.po.js'),
    GlobalFunctions = require('../../commons/globalFunctions.js');

var login = new Login(),
    header = new Header(),
    help = new Help(),
    make = new Make(),
    modals = new Modals(),
    vars = new Variables(),
    forum = new Forum(),
    globalFunctions = new GlobalFunctions();

globalFunctions.xmlReport('helpChangelog');

describe('Changelog ', function() { //This pages has been deleted

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();


    it('bbb-135:changelog:Verify that we can open changelog category (Registered user)', function() {
        login.loginWithRandomUser();
        header.navForum.click();
        forum.versionCategory.click();
        browser.getCurrentUrl().then(function(url) {
            expect(url).toMatch(/#\/forum\/Versiones%20de%20Bitbloq/);
            login.logout();
        });
    });

    it('bbb-136:changelog:Verify that we can open changelog category  (Unregistered user)', function() {
        make.get();
        modals.attentionContinueGuest.click();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitTab);
        header.navForum.click();
        forum.versionCategory.click();
        browser.getCurrentUrl().then(function(url) {
            expect(url).toMatch(/#\/forum\/Versiones%20de%20Bitbloq/);
        });
    });

    it('changelog:Verify that the last changelog post tell about the last version Bitbloq  (Registered user)', function() {
        login.loginWithRandomUser();
        header.navForum.click();
        forum.versionCategory.click();
        expect(forum.categoryTopicTitle.getText()).toMatch(vars.versionBitbloq);
    });

    it('changelog:Verify that the last changelog post tell about the last version Bitbloq  (Unregistered user)', function() {
        make.get();
        modals.attentionContinueGuest.click();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitTab);
        header.navForum.click();
        forum.versionCategory.click();
        expect(forum.categoryTopicTitle.getText()).toMatch(vars.versionBitbloq);
    });

    it('changelog:Verify that we can open the last changelog post  (Registered user)', function() {
        login.loginWithRandomUser();
        header.navForum.click();
        forum.versionCategory.click();
        forum.categoryTopicTitle.click();
        expect(forum.isPresentTitle()).toBe(true);
        expect(forum.isPresentContentThread()).toBe(true);
    });

    it('changelog:Verify that we can open the last changelog post (Unregistered user)', function() {
        make.get();
        modals.attentionContinueGuest.click();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitTab);
        header.navForum.click();
        forum.versionCategory.click();
        forum.categoryTopicTitle.click();
        expect(forum.isPresentTitle()).toBe(true);
        expect(forum.isPresentContentThread()).toBe(true);
    });

    xit('bbb-137:helpChangelog:Verify that the change and bugs appears in the changelog tab (Registered user)', function() {
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

    xit('bbb-138:helpChangelog:Verify that the change and bugs appears in the changelog tab (Unregistered user)', function() {
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
