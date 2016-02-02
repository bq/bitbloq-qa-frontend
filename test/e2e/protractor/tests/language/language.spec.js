'use strict';

var
    GlobalFunctions = require('../commons/globalFunctions.js'),
    Landing = require('../landing/landing.po.js'),
    Variables = require('../commons/variables.js');

var
    globalFunctions = new GlobalFunctions(),
    landing = new Landing(),
    vars = new Variables();

globalFunctions.xmlReport('language');

describe('Language', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bba-238:Supports email dependent of language', function() {

        var checkSupportEmail = function(language, firstScroll) {
            var buttonLanguage;
            var supportEmail;
            var noButton = false;
            switch (language) {
                case 'ES':
                    buttonLanguage = landing.spanishLanguage;
                    supportEmail = vars.supportEmailES;
                    break;
                case 'EN':
                    buttonLanguage = landing.englishLanguage;
                    supportEmail = vars.supportEmailEN;
                    break;
                case 'FR':
                    buttonLanguage = landing.frenchLanguage;
                    supportEmail = vars.supportEmailFR;
                    break;
                case 'DE':
                    buttonLanguage = landing.germanLanguage;
                    supportEmail = vars.supportEmailDE;
                    break;
                case 'PT':
                    buttonLanguage = landing.portugueseLanguage;
                    supportEmail = vars.supportEmailPT;
                    break;
                case 'RU':
                    buttonLanguage = landing.russianLanguage;
                    supportEmail = vars.supportEmailRU;
                    break;
                case 'IT':
                    buttonLanguage = landing.italianLanguage;
                    supportEmail = vars.supportEmailIT;
                    break;
                case 'NL':
                    buttonLanguage = landing.nederlandsLanguage;
                    supportEmail = vars.supportEmailEN;
                    break;
                case 'EU':
                    buttonLanguage = landing.basqueLanguage;
                    supportEmail = vars.supportEmailES;
                    break;
                case 'CA':
                    buttonLanguage = landing.catalanLanguage;
                    supportEmail = vars.supportEmailES;
                    break;
                case 'GL':
                    buttonLanguage = landing.galicianLanguage;
                    supportEmail = vars.supportEmailES;
                    break;
                case 'CN':
                    buttonLanguage = landing.chineseLanguage;
                    supportEmail = vars.supportEmailEN;
                    break;
                default:
                    noButton = true;
                    supportEmail = vars.supportEmailEN;
            }

            if (firstScroll) {
                var script = landing.landingPage + '.scrollTo(0,6000);';
                browser.sleep(5000); //Time to wait load explora project on landing (not wait angular)
                browser.executeScript(script).then(function() {
                    if (!noButton) {
                        buttonLanguage.click();
                    }
                    expect(landing.contactButton.getAttribute('href')).toMatch(supportEmail);
                });

            } else {
                if (!noButton) {
                    buttonLanguage.click();
                }
                expect(landing.contactButton.getAttribute('href')).toMatch(supportEmail);
            }

        };

        checkSupportEmail('ES',true);
        checkSupportEmail('EN');
        checkSupportEmail('FR');
        checkSupportEmail('DE');
        checkSupportEmail('PT');
        checkSupportEmail('RU');
        checkSupportEmail('IT');
        //checkSupportEmail('NL');
        checkSupportEmail('EU');
        checkSupportEmail('CA');
        checkSupportEmail('GL');
        checkSupportEmail('CN');

    });

});
