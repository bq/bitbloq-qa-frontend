'use strict';

var Login = require('../../login/login.po.js'),
    Variables = require('../../commons/variables.js'),
    Header = require('../../header/header.po.js'),
    Make = require('../../bloqsproject/make.po.js'),
    Modals = require('../../modals/modals.po.js'),
    GlobalFunctions = require('../../commons/globalFunctions.js'),
    Forum = require('../forum.po.js');

var login = new Login(),
    vars = new Variables(),
    header = new Header(),
    make = new Make(),
    modals = new Modals(),
    globalFunctions = new GlobalFunctions(),
    forum = new Forum();

globalFunctions.xmlReport('faq');

describe('FAQ ', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    xit('bbb-192:faq:Appears the FAQs with a registered user', function() {
        login.loginWithRandomUser();
        header.navForum.click();
        forum.faqCategory.click();
        expect(forum.categoryTopicTitleArray.count()).toBe(10);
        browser.getCurrentUrl().then(function(url) {
            expect(url).toMatch(/#\/forum\/Preguntas%20frecuentes/);
            login.logout();
        });
    });

    xit('bbb-193:faq:Verify that we can open a faq (registered user)', function() {
        login.loginWithRandomUser();
        header.navForum.click();
        forum.faqCategory.click();
        expect(forum.categoryTopicTitleArray.count()).toBe(10);
        forum.categoryTopicTitle.click();
        expect(forum.isPresentTitle()).toBe(true);
        expect(forum.isPresentContentThread()).toBe(true);
        login.logout();
    });

    xit('bbb-195:faq:Appears the FAQs with an unregistered user', function() {
        make.get();
        modals.attentionContinueGuest.click();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitTab);
        header.navForum.click();
        expect(globalFunctions.toNumber(forum.faqCastellanoThreadCounter.getText())).not.toBeLessThan(vars.numberOfFaqs);
        forum.faqCategory.click();
        expect(forum.categoryTopicTitleArray.count()).toBe(10);
        browser.getCurrentUrl().then(function(url) {
            expect(url).toMatch(/#\/forum\/Preguntas%20frecuentes/);
        });
    });

    xit('bbb-196:faq:Verify that we can open a faq (unregistered user)', function() {
        make.get();
        modals.attentionContinueGuest.click();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        header.navForum.click();
        expect(globalFunctions.toNumber(forum.faqCastellanoThreadCounter.getText())).not.toBeLessThan(vars.numberOfFaqs);
        forum.faqCategory.click();
        expect(forum.categoryTopicTitleArray.count()).toBe(10);
        forum.categoryTopicTitle.click();
        expect(forum.isPresentTitle()).toBe(true);
        expect(forum.isPresentContentThread()).toBe(true);
    });

    xit('bbb-345:faq:Appears all language FAQs with a registered user', function() {
        login.loginWithRandomUser();
        header.navForum.click();
        expect(globalFunctions.toNumber(forum.faqEnglishThreadCounter.getText())).not.toBeLessThan(vars.numberOfFaqs);
        expect(globalFunctions.toNumber(forum.faqNetherlandsThreadCounter.getText())).not.toBeLessThan(vars.numberOfFaqs);
        expect(globalFunctions.toNumber(forum.faqPyccknnThreadCounter.getText())).not.toBeLessThan(vars.numberOfFaqs);
        expect(globalFunctions.toNumber(forum.faqItalianoThreadCounter.getText())).not.toBeLessThan(vars.numberOfFaqs);
        expect(globalFunctions.toNumber(forum.faqEuskaraThreadCounter.getText())).not.toBeLessThan(vars.numberOfFaqs);
        expect(globalFunctions.toNumber(forum.faqCatalaThreadCounter.getText())).not.toBeLessThan(vars.numberOfFaqs);
        expect(globalFunctions.toNumber(forum.faqFrancaisThreadCounter.getText())).not.toBeLessThan(vars.numberOfFaqs);
        expect(globalFunctions.toNumber(forum.faqDeutschThreadCounter.getText())).not.toBeLessThan(vars.numberOfFaqs);
        expect(globalFunctions.toNumber(forum.faqPortuguesThreadCounter.getText())).not.toBeLessThan(vars.numberOfFaqs);
        expect(globalFunctions.toNumber(forum.faqGalegoThreadCounter.getText())).not.toBeLessThan(vars.numberOfFaqs);
        expect(globalFunctions.toNumber(forum.faqChineseThreadCounter.getText())).not.toBeLessThan(vars.numberOfFaqs);
    });

    xit('bbb-346:faq:Appears all language FAQs with an unregistered user', function() {
        make.get();
        modals.attentionContinueGuest.click();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        header.navForum.click();
        expect(globalFunctions.toNumber(forum.faqEnglishThreadCounter.getText())).not.toBeLessThan(vars.numberOfFaqs);
        expect(globalFunctions.toNumber(forum.faqNetherlandsThreadCounter.getText())).not.toBeLessThan(vars.numberOfFaqs);
        expect(globalFunctions.toNumber(forum.faqPyccknnThreadCounter.getText())).not.toBeLessThan(vars.numberOfFaqs);
        expect(globalFunctions.toNumber(forum.faqItalianoThreadCounter.getText())).not.toBeLessThan(vars.numberOfFaqs);
        expect(globalFunctions.toNumber(forum.faqEuskaraThreadCounter.getText())).not.toBeLessThan(vars.numberOfFaqs);
        expect(globalFunctions.toNumber(forum.faqCatalaThreadCounter.getText())).not.toBeLessThan(vars.numberOfFaqs);
        expect(globalFunctions.toNumber(forum.faqFrancaisThreadCounter.getText())).not.toBeLessThan(vars.numberOfFaqs);
        expect(globalFunctions.toNumber(forum.faqDeutschThreadCounter.getText())).not.toBeLessThan(vars.numberOfFaqs);
        expect(globalFunctions.toNumber(forum.faqPortuguesThreadCounter.getText())).not.toBeLessThan(vars.numberOfFaqs);
        expect(globalFunctions.toNumber(forum.faqGalegoThreadCounter.getText())).not.toBeLessThan(vars.numberOfFaqs);
        expect(globalFunctions.toNumber(forum.faqChineseThreadCounter.getText())).not.toBeLessThan(vars.numberOfFaqs);
    });
});
