'use strict';

var HelpSpec = function() {

    var Login = require('../login/login.po.js'),
        Header = require('../header/header.po.js'),
        Help = require('./help.po.js'),
        Make = require('../bloqsproject/make.po.js'),
        Modals = require('../modals/modals.po.js'),
        Variables = require('../commons/variables.js');

    var login = new Login(),
        header = new Header(),
        help = new Help(),
        make = new Make(),
        modals = new Modals(),
        vars = new Variables();

    describe('Help ', function() {

        //beforeEach commons
        vars.beforeTest();

        // afterEach commons
        vars.afterTest();

        it('bba-32:Appears the FAQs with a registered user', function() {
            login.loginWithRandomUser();
            header.navHelp.click();
            help.tutorialTab.click();
            help.faqTab.click();
            expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/help/faq');
            login.logout();
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
        });

        it('bba-62:Appears the tutorial with a registered user', function() {
            login.loginWithRandomUser();
            header.navHelp.click();
            help.tutorialTab.click();
            expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/help/tutorial');
            login.logout();
        });

        it('bba-80:Appears the tutorial with an unregistered user', function() {
            make.get();
            modals.attentionContinueGuest.click();
            modals.rejectTour();
            browser.sleep(vars.timeToWaitFadeModals);
            header.navHelp.click();
            help.tutorialTab.click();
            expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/help/tutorial');
        });
    });
};

module.exports = new HelpSpec();
