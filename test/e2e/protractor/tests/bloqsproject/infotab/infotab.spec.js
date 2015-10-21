/**
 *Spec to infotab
 */
'use strict';

var Variables = require('../../commons/variables.js'),
    GlobalFunctions = require('../../commons/globalFunctions.js'),
    InfoTab = require('../infotab/infotab.po.js'),
    Make = require('../make.po.js'),
    Modals = require('../../modals/modals.po.js');

var vars = new Variables(),
    globalFunctions = new GlobalFunctions(),
    infoTab = new InfoTab(),
    make = new Make(),
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
});