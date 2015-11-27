'use strict';

var Login = require('../login/login.po.js'),
    Header = require('../header/header.po.js'),
    Help = require('./help.po.js'),
    Modals = require('../modals/modals.po.js'),
    Variables = require('../commons/variables.js'),
    GlobalFunctions = require('../commons/globalFunctions.js');

var login = new Login(),
    header = new Header(),
    help = new Help(),
    modals = new Modals(),
    vars = new Variables(),
    globalFunctions = new GlobalFunctions();

globalFunctions.xmlReport('help');

describe('Help ', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bba-38:Comprobar botones Informar de un error en usuario invitado', function() {
        help.get();
        expect(help.contactUsLink.getAttribute('href')).toEqual(vars.supportEmail);
        expect(help.feedbackAboutAnError.getAttribute('href')).toEqual(vars.supportEmail);
        expect(help.feedbackIdeas.getAttribute('href')).toEqual(vars.supportEmail);
    });

    it('bba-175:Comprobar botones Informar de un error en usuario registrado', function() {

        login.loginWithRandomUser();
        header.navHelp.click();

        help.contactUsLink.click();
        browser.sleep(vars.timeToWaitFadeModals);

        expect(modals.modalTitle.getText()).toEqual(vars.sendCommentsLiteral);

        modals.bladeClose.click();
        browser.sleep(vars.timeToWaitFadeModals);

        help.feedbackAboutAnError.click();
        browser.sleep(vars.timeToWaitFadeModals);

        expect(modals.modalTitle.getText()).toEqual(vars.infoErrorLiteral);

        modals.bladeClose.click();
        browser.sleep(vars.timeToWaitFadeModals);

        help.feedbackIdeas.click();
        browser.sleep(vars.feedbackIdeas);

        expect(modals.modalTitle.getText()).toEqual(vars.sendCommentsLiteral);

    });

});
