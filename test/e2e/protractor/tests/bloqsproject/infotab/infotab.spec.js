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
    Commons = require('../../commons/commons.po.js'),
    BloqsTab = require('../bloqstab/bloqstab.po.js');

var vars = new Variables(),
    globalFunctions = new GlobalFunctions(),
    infoTab = new InfoTab(),
    make = new Make(),
    commons = new Commons(),
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
        browser.sleep(vars.timeToWaitFadeModals);
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        make.infoTab.click();
        browser.sleep(vars.timeToWaitTab);
        expect(infoTab.infotabProjectName.getAttribute('disabled')).toBe('true');
        expect(infoTab.infotabDescription.getAttribute('disabled')).toBe('true');
        expect(infoTab.infotabYoutubeVideoInput.getAttribute('disabled')).toBe('true');
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

    it('bba-164: Verify the Youtube URL', function() {
        var validYoutubeUrl = 'https://youtu.be/f2WME8N8qXc?list=PL3AshJDPy8GQhVWkzsjc5IvrzD5ctpQXN';
        login.loginWithRandomUser();
        make.get();
        modals.rejectTour();
        make.infoTab.click();
        infoTab.infotabYoutubeVideoInput.sendKeys('https://www.youtube.com/user/TheRedsMusic');
        browser.sleep(vars.timeToWaitAutoSave);
        globalFunctions.navigatorLanguage()
            .then(function(language) {
                if (language === 'es') {
                    expect(commons.alertTextToast.getText()).toMatch(vars.enterValidYoutubeUrl);
                } else {
                    expect(commons.alertTextToast.getText()).toMatch(vars.enterValidYoutubeUrlEN);
                }
            });
        infoTab.infotabYoutubeVideoInput.clear();
        infoTab.infotabYoutubeVideoInput.sendKeys(validYoutubeUrl);
        browser.sleep(vars.timeToWaitAutoSave);
        browser.refresh();
        make.infoTab.click();
        expect(infoTab.infotabYoutubeVideoInput.getAttribute('value')).toBe(validYoutubeUrl);
        infoTab.infotabYoutubeVideoInput.clear();
        infoTab.infotabYoutubeVideoInput.sendKeys('');
        browser.sleep(vars.timeToWaitAutoSave);
        browser.refresh();
        make.infoTab.click();
        expect(infoTab.infotabYoutubeVideoInput.getAttribute('value')).toBe('');

    });
});
