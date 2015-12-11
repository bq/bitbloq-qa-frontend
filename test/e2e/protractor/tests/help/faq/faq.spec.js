'use strict';

var Login = require('../../login/login.po.js'),
    Header = require('../../header/header.po.js'),
    Help = require('../help.po.js'),
    Make = require('../../bloqsproject/make.po.js'),
    Modals = require('../../modals/modals.po.js'),
    Variables = require('../../commons/variables.js'),
    GlobalFunctions = require('../../commons/globalFunctions.js');

var login = new Login(),
    header = new Header(),
    help = new Help(),
    make = new Make(),
    modals = new Modals(),
    vars = new Variables(),
    globalFunctions = new GlobalFunctions();

globalFunctions.xmlReport('tutorial');

describe('Tutorial ', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bba-33:Verify that we can open a faq (registered user)', function() {
        login.loginWithRandomUser();
        header.navHelp.click();
        help.tutorialTab.click();
        help.faqTab.click();
        var firstElement = help.firstElementFAQ();
        firstElement.click();
        expect(help.isPresentTextFAQ(firstElement)).toBe(true);
        expect(help.isPresentAnswerFAQ(firstElement)).toBe(true);
        browser.sleep(1000);
        firstElement.click();
        expect(help.isPresentTextFAQ(firstElement)).toBe(true);
        expect(help.isPresentAnswerFAQ(firstElement)).toBe(false);
        login.logout();
    });

    it('bba-92:Verify that we can open a faq (unregistered user)', function() {
        make.get();
        modals.attentionContinueGuest.click();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        header.navHelp.click();
        help.tutorialTab.click();
        help.faqTab.click();
        var firstElement = help.firstElementFAQ();
        firstElement.click();
        expect(help.isPresentTextFAQ(firstElement)).toBe(true);
        expect(help.isPresentAnswerFAQ(firstElement)).toBe(true);
        browser.sleep(1000);
        firstElement.click();
        expect(help.isPresentTextFAQ(firstElement)).toBe(true);
        expect(help.isPresentAnswerFAQ(firstElement)).toBe(false);
    });

    it('bba-77:Appears the FAQs with an unregistered user', function() {
        make.get();
        modals.attentionContinueGuest.click();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        header.navHelp.click();
        help.tutorialTab.click();
        help.faqTab.click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/help/faq');
        expect(help.faqTable.isPresent());
    });

    it('bba-32:Appears the FAQs with a registered user', function() {
        login.loginWithRandomUser();
        header.navHelp.click();
        help.tutorialTab.click();
        help.faqTab.click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/help/faq');
        expect(help.faqTable.isPresent());
        login.logout();
    });
});