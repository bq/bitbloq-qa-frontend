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

    it('bba-62:Appears the tutorial with a registered user', function() {
        login.loginWithRandomUser();
        header.navHelp.click();
        help.tutorialTab.click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/help/tutorial');
        expect(help.basicTutorialTable.isPresent());
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
        expect(help.basicTutorialTable.isPresent());
    });

    xit('bba-173:Verify that you can click on tutorial (registered user)', function() {
        login.loginWithRandomUser();
        header.navHelp.click();
        help.tutorialTab.click();
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

    xit('bba-174:Verify that you can click on tutorial (unregistered user)', function() {
        make.get();
        modals.attentionContinueGuest.click();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        header.navHelp.click();
        help.tutorialTab.click();
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
        });
    });

    it('bba-63:Verificar la acción de sugerir un tutorial', function() {

        var emailto = 'mailto:support-bitbloq@bq.com',
            script = help.helpView + '.scrollTo(0,5000);';

        help.get();

        help.tutorialTab.click();

        browser.executeScript(script).then(function() {
            expect(help.contactUsTutorials.getAttribute('href')).toEqual(emailto);
        });

        login.loginWithRandomUser();
        header.navHelp.click();

        help.tutorialTab.click();

        browser.executeScript(script).then(function() {
            help.contactUsTutorials.click();
            browser.sleep(vars.feedbackIdeas);
            expect(modals.modalTitle.getText()).toEqual('Enviar comentarios a bitbloq');
            modals.bladeClose.click();
            browser.sleep(vars.timeToWaitFadeModals);
        });

    });

  });
