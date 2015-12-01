/**
 *Spec to infotab
 */
'use strict';

var Variables = require('../../commons/variables.js'),
    GlobalFunctions = require('../../commons/globalFunctions.js'),
    Commons = require('../../commons/commons.po.js'),
    InfoTab = require('../infotab/infotab.po.js'),
    Make = require('../make.po.js'),
    Modals = require('../../modals/modals.po.js'),
    Login = require('../../login/login.po.js'),
    path = require('path');

var vars = new Variables(),
    globalFunctions = new GlobalFunctions(),
    commons = new Commons(),
    infoTab = new InfoTab(),
    make = new Make(),
    modals = new Modals(),
    login = new Login();

globalFunctions.xmlReport('infotab');

describe('Info tab', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bba-123: Verificar la subida de la imagen', function() {
        var smallImagePath = '../../../res/550x350.jpg',
            bigImagePath = '../../../res/morethanonemb.jpg',
            perfectImagePath = '../../../res/perfectimage.jpg',
            notImagePath='../../../res/imagen.sh',
            smallImageAbsolutePath = path.resolve(__dirname, smallImagePath),
            bigImageAbsolutePath = path.resolve(__dirname, bigImagePath),
            perfectImageAbsolutePath = path.resolve(__dirname, perfectImagePath),
            notImageAbsolutePath=path.resolve(__dirname, notImagePath);

        login.loginWithRandomUser();
        make.get();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        make.infoTab.click();
        infoTab.infotabFileUpload.sendKeys(smallImageAbsolutePath);
        browser.sleep(vars.timeToWaitSendKeys);
        expect(commons.alertTextToast.getText()).toMatch('Las dimensiones de la imagen son demasiado pequeñas');
        infoTab.infotabFileUpload.sendKeys(bigImageAbsolutePath);
        browser.sleep(vars.timeToWaitSendKeys);
        expect(commons.alertTextToast.getText()).toMatch('Las dimensiones de la imagen son muy grandes');
        infoTab.infotabFileUpload.sendKeys(perfectImageAbsolutePath);
        browser.sleep(vars.timeToWaitSendKeys);
        expect(infoTab.infotabProjectImage.getAttribute('src')).not.toBe('');
        infoTab.infotabFileUpload.sendKeys(notImageAbsolutePath);
        browser.sleep(vars.timeToWaitSendKeys);
        expect(commons.alertTextToast.getText()).toMatch('El archivo no es una imagen');
        login.logout();
    });
});
