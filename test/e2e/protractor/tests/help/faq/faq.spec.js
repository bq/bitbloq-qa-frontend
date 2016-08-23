'use strict';

var Login = require('../../login/login.po.js'),
    Header = require('../../header/header.po.js'),
    Make = require('../../bloqsproject/make.po.js'),
    Modals = require('../../modals/modals.po.js'),
    GlobalFunctions = require('../../commons/globalFunctions.js'),
    Forum = require('../forum/forum.po.js');

var login = new Login(),
    header = new Header(),
    make = new Make(),
    modals = new Modals(),
    globalFunctions = new GlobalFunctions(),
    forum = new Forum();

globalFunctions.xmlReport('helpFaq');

describe('FAQ ', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bbb-192:faq:Appears the FAQs with a registered user', function() {
        login.loginWithRandomUser();
        header.navForum.click();
        forum.faqCategory.click();
        expect(forum.categoryTopicTitleArray.count()).toBe(10);
        browser.getCurrentUrl().then(function(url) {
            expect(url).toMatch(/#\/forum\/Preguntas%20frecuentes/);
            login.logout();
        });
    });

    it('bbb-193:faq:Verify that we can open a faq (registered user)', function() {
        login.loginWithRandomUser();
        header.navForum.click();
        forum.faqCategory.click();
        expect(forum.categoryTopicTitleArray.count()).toBe(10);
        forum.categoryTopicTitle.click();
        expect(forum.isPresentTitle()).toBe(true);
        expect(forum.isPresentContentThread()).toBe(true);
        login.logout();
    });

    it('bbb-195:faq:Appears the FAQs with an unregistered user', function() {
        make.get();
        modals.attentionContinueGuest.click();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitTab);
        header.navForum.click();
        forum.faqCategory.click();
        expect(forum.categoryTopicTitleArray.count()).toBe(10);
        browser.getCurrentUrl().then(function(url) {
            expect(url).toMatch(/#\/forum\/Preguntas%20frecuentes/);
        });
    });

    fit('bbb-196:faq:Verify that we can open a faq (unregistered user)', function() {
        make.get();
        modals.attentionContinueGuest.click();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        header.navForum.click();
        forum.faqCategory.click();
        expect(forum.categoryTopicTitleArray.count()).toBe(10);
        forum.categoryTopicTitle.click();
        expect(forum.isPresentTitle()).toBe(true);
        expect(forum.isPresentContentThread()).toBe(true);
    });
});
