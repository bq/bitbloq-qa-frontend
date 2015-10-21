/**
 *Spec to infotab
 */
'use strict';

var Variables = require('../../commons/variables.js'),
    GlobalFunctions = require('../../commons/globalFunctions.js'),
    InfoTab = require('../infotab/infotab.po.js'),
    Make = require('../make.po.js'),
    Modals = require('../../modals/modals.po.js'),
    Login = require('../../login/login.po.js'),
    BloqsTab = require('../bloqstab/bloqstab.po.js');

var vars = new Variables(),
    globalFunctions = new GlobalFunctions(),
    infoTab = new InfoTab(),
    make = new Make(),
    bloqsTab = new BloqsTab(),
    login = new Login(),
    modals = new Modals();

globalFunctions.xmlReport('infotab');

describe('Info tab', function() {
    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bba-7: Verificar en el tab de información que no aparecen las opciones que requieren registro', function() {
        make.get();
        modals.attentionContinueGuest.click();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        make.infoTab.click();
        expect(infoTab.infotabProjectName.getAttribute('disabled')).toBe('true');
        expect(infoTab.infotabDescription.getAttribute('disabled')).toBe('true');
        expect(infoTab.infotabYoutubeVideo.getAttribute('disabled')).toBe('true');
        expect(infoTab.infotabTaginputButton.getAttribute('disabled')).toBe('true');
    });

    it('bba-124: Verificar el cambio de tema del proyecto', function() {
        function setThemeColor(color) {
            var themeColor;
            if (color === 'gray') {
                themeColor = infoTab.infotabOptionGrayTheme;
            } else {
                themeColor = infoTab.infotabOptionColorTheme;
            }
            make.infoTab.click();
            infoTab.infotabChooseThemeButton.click();
            themeColor.click();
            make.softwareTab.click();
            bloqsTab.infotabToolboxFunctions.click();
        }
        login.loginWithRandomUser();
        make.get();
        modals.rejectTour();
        setThemeColor('gray');
        expect(element(by.css('.bloq-void-function')).getCssValue('color')).toBe('rgba(221, 90, 10, 1)');
        setThemeColor('color');
        expect(element(by.css('.bloq-void-function')).getCssValue('color')).toBe('rgba(255, 255, 255, 1)');
        login.logout();
        make.get();
        modals.attentionContinueGuest.click();
        modals.rejectTour();
        setThemeColor('gray');
        expect(element(by.css('.bloq-void-function')).getCssValue('color')).toBe('rgba(221, 90, 10, 1)');
        setThemeColor('color');
        expect(element(by.css('.bloq-void-function')).getCssValue('color')).toBe('rgba(255, 255, 255, 1)');
    });
});