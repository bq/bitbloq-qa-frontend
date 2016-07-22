'use strict';

var Variables = require('../commons/variables.js'),
    GlobalFunctions = require('../commons/globalFunctions.js'),
    Landing = require('../landing/landing.po.js'),
    Login = require('../login/login.po.js'),
    Modals = require('../modals/modals.po.js'),
    Projects = require('../projects/projects.po.js');

var vars = new Variables(),
    globalFunctions = new GlobalFunctions(),
    landing = new Landing(),
    login = new Login(),
    modals = new Modals(),
    projects = new Projects();

globalFunctions.xmlReport('landing');

describe('Verify landing ', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bbb-251:landing:Check that links to legal documents work', function() {
        //landing.openLandingMenu.click();
        var cookies = '#/cookies',
            terms = '#/terms',
            script = landing.landingPage + '.scrollTo(0,5000);';
        browser.executeScript(script).then(function() {
            browser.sleep(5000);
            landing.cookiesButton.click();
            browser.getAllWindowHandles().then(function(handles) {
                browser.switchTo().window(handles[1]).then(function() {
                    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + cookies);
                    browser.close().then(browser.switchTo().window(handles[0]));
                });
            });
            landing.get();
            browser.executeScript(script).then(function() {
                browser.sleep(5000);
                landing.termsButton.click();
                browser.getAllWindowHandles().then(function(handles) {
                    browser.switchTo().window(handles[1]).then(function() {
                        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + terms);
                        browser.close().then(browser.switchTo().window(handles[0]));
                    });
                });
            });
        });
    });

    it('bbb-250:landing:check if NO login go to mailto in landing (link "contacto")', function() {

        landing.openLandingMenu.click();
        browser.sleep(1000);
        landing.helpButton.click();
        browser.sleep(5000); //Time to wait load explora project on landing (not wait angular)

        globalFunctions.navigatorLanguage().then(function(language) {
                expect(landing.contactUsLink.getAttribute('href')).toMatch(vars.supportEmail(language));
            });

    });

    it('bbb-252:landing:check if is login show modal feedback in landing (link "contacto")', function() {

        login.loginWithRandomUser();
        landing.get();
        landing.openLandingMenu.click();
        browser.sleep(1000);
        landing.helpButton.click();
        browser.sleep(5000); //Time to wait load explora project on landing (not wait angular)

        globalFunctions.navigatorLanguage().then(function(language) {
            if (language === 'es') {
                expect(landing.contactUsLink.getAttribute('href')).not.toMatch(vars.supportEmailES);
            } else {
                expect(landing.contactUsLink.getAttribute('href')).not.toMatch(vars.supportEmailEN);
            }
        });
        landing.contactUsLink.click();
        browser.sleep(vars.timeToWaitFadeModals);
        globalFunctions.navigatorLanguage().then(function(language) {
            if (language === 'es') {
                expect(modals.modalTitle.getText()).toEqual(vars.sendCommentsLiteral);
            } else {
                expect(modals.modalTitle.getText()).toEqual(vars.sendCommentsLiteralEN);
            }
        });
        modals.bladeClose.click();
        browser.sleep(vars.timeToWaitFadeModals);
        projects.get();
        login.logout();

    });

});
