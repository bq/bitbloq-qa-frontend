'use strict';

var Login = require('../login/login.po.js'),
    Header = require('../header/header.po.js'),
    Help = require('./help.po.js'),
    Make = require('../bloqsproject/make.po.js'),
    Modals = require('../modals/modals.po.js'),
    Variables = require('../commons/variables.js'),
    GlobalFunctions = require('../commons/globalFunctions.js');

var login = new Login(),
    header = new Header(),
    help = new Help(),
    make = new Make(),
    modals = new Modals(),
    vars = new Variables(),
    globalFunctions = new GlobalFunctions();

globalFunctions.xmlReport('help');

describe('Help ', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bba-32:Appears the FAQs with a registered user', function() {
        login.loginWithRandomUser();
        header.navHelp.click();
        help.tutorialTab.click();
        help.faqTab.click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/help/faq');
        login.logout();
    });

    it('bba-38:Comprobar botones Informar de un error en usuario invitado', function() {
        help.get();
        var emailto = 'mailto:support-bitbloq@bq.com';

        expect(help.contactUsLink.getAttribute('href')).toEqual(emailto);
        expect(help.feedbackAboutAnError.getAttribute('href')).toEqual(emailto);
        expect(help.feedbackIdeas.getAttribute('href')).toEqual(emailto);
    });

    it('bba-175:Comprobar botones Informar de un error en usuario registrado', function() {

        login.loginWithRandomUser();
        header.navHelp.click();

        help.contactUsLink.click();
        browser.sleep(vars.timeToWaitFadeModals);

        expect(modals.modalTitle.getText()).toEqual('Enviar comentarios a bitbloq');

        modals.bladeClose.click();
        browser.sleep(vars.timeToWaitFadeModals);

        help.feedbackAboutAnError.click();
        browser.sleep(vars.timeToWaitFadeModals);

        expect(modals.modalTitle.getText()).toEqual('Informar de un error');

        modals.bladeClose.click();
        browser.sleep(vars.timeToWaitFadeModals);

        help.feedbackIdeas.click();
        browser.sleep(vars.feedbackIdeas);

        expect(modals.modalTitle.getText()).toEqual('Enviar comentarios a bitbloq');

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

    it('bba-33:Verify that we can open a faq (registered user)', function() {
        login.loginWithRandomUser();
        header.navHelp.click();
        help.tutorialTab.click();
        help.faqTab.click();
        var firstElement = help.elemsFaqTable.all(by.tagName('li')).first();
        firstElement.click();
        expect(firstElement.all(by.tagName('div')).count()).toEqual(2);
        browser.sleep(1000);
        firstElement.click();
        expect(firstElement.all(by.tagName('div')).count()).toEqual(1);
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
        var firstElement = help.elemsFaqTable.all(by.tagName('li')).first();
        firstElement.click();
        expect(firstElement.all(by.tagName('div')).count()).toEqual(2);
        browser.sleep(1000);
        firstElement.click();
        expect(firstElement.all(by.tagName('div')).count()).toEqual(1);
    });
});