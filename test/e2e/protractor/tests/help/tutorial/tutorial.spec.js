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

globalFunctions.xmlReport('helpTutorial');

describe('Tutorial ', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bbb-198:learn:Appears the tutorial with a registered user', function() {
        login.loginWithRandomUser();
        header.navLearn.click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/learn');
        expect(help.basicTutorialTable.isPresent());
        login.logout();
    });

    it('bbb-200:learn:Appears the tutorial with an unregistered user', function() {
        make.get();
        modals.attentionContinueGuest.click();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        header.navLearn.click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/learn');
        expect(help.basicTutorialTable.isPresent());
    });

    it('bbb-201:learn:Verify that you can click on tutorial (registered user)', function() {
        login.loginWithRandomUser();
        header.navLearn.click();
        var elemTutorial = help.firstElementTutorial();
        elemTutorial.click();
        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {
            browser.ignoreSynchronization = true;
            browser.switchTo().window(handles[1]);
            browser.sleep(vars.timeToWaitTab);
            expect(browser.getCurrentUrl()).toMatch('http://diwo.bq.com/');
            browser.close().then(browser.switchTo().window(handles[0]));
            browser.sleep(vars.timeToWaitTab);
            browser.ignoreSynchronization = false;
            login.logout();
        });

    });

    it('bbb-202:learn:Verify that you can click on tutorial (unregistered user)', function() {
        make.get();
        modals.attentionContinueGuest.click();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        header.navLearn.click();
        var elemTutorial = help.firstElementTutorial();
        elemTutorial.click();
        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {
            browser.ignoreSynchronization = true;
            browser.switchTo().window(handles[1]);
            browser.sleep(vars.timeToWaitTab);
            expect(browser.getCurrentUrl()).toMatch('http://diwo.bq.com/');
        });
    });

    it('learn:Verify that you can click on "Show more tutorials in DIWO" (registered user)', function() {
        login.loginWithRandomUser();
        header.navLearn.click();
        help.goToDIWOButton.click();
        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {
            browser.ignoreSynchronization = true;
            browser.switchTo().window(handles[1]);
            browser.sleep(vars.timeToWaitTab);
            expect(browser.getCurrentUrl()).toBe('http://diwo.bq.com/');
            browser.close().then(browser.switchTo().window(handles[0]));
            browser.sleep(vars.timeToWaitTab);
            browser.ignoreSynchronization = false;
            login.logout();
        });
    });

    it('learn:Verify that you can click on "Show more tutorials in DIWO" (unregistered user)', function() {
        make.get();
        modals.attentionContinueGuest.click();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        header.navLearn.click();
        help.goToDIWOButton.click();
        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {
            browser.ignoreSynchronization = true;
            browser.switchTo().window(handles[1]);
            browser.sleep(vars.timeToWaitTab);
            expect(browser.getCurrentUrl()).toBe('http://diwo.bq.com/');
        });
    });

    it('bbb-199:learn:Verify suggest a tutorial action (registered user)', function() {
        login.loginWithRandomUser();
        header.navLearn.click();
        help.contactUsTutorials.click();
        browser.sleep(vars.feedbackIdeas);
        globalFunctions.navigatorLanguage().then(function(language) {
            if (language === 'es') {
                expect(modals.modalTitle.getText()).toEqual(vars.sendCommentsLiteral);
            } else {
                expect(modals.modalTitle.getText()).toEqual(vars.sendCommentsLiteralEN);
            }
        });
    });

    it('learn:Verify suggest a tutorial action (unregistered user)', function() {
        help.get();
        browser.sleep(vars.timeToWaitFadeModals);
        globalFunctions.navigatorLanguage().then(function(language) {
            console.log('+++++++++++++++++++++++++++ ' + language);
            expect(help.contactUsTutorials.getAttribute('href')).toEqual(vars.supportEmail(language));
        });
    });

});
