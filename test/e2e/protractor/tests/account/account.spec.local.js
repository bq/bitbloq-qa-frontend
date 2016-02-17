/**
 *Spec to account.spec.js
 * User Account view
 */

'use strict';

var GlobalFunctions = require('../commons/globalFunctions.js'),
    Account = require('./account.po.js'),
    Variables = require('../commons/variables.js'),
    Landing = require('../landing/landing.po.js'),
    path = require('path'),
    Commons = require('../commons/commons.po.js'),
    Login = require('../login/login.po.js');

var globalFunctions = new GlobalFunctions(),
    vars = new Variables(),
    account = new Account(),
    landing = new Landing(),
    commons = new Commons(),
    login = new Login();

globalFunctions.xmlReport('accountLocal');

describe('User account view', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    xit('bba-158:Verify fields from new google user', function() {

        landing.openLandingMenu.click();
        landing.enterButton.click();
        var googleAccount = vars.account('google');
        login.loginGoogle(googleAccount.user, googleAccount.password);
        account.get();
        expect(account.firstname.getAttribute('value')).toBe(googleAccount.firstname);
        expect(account.lastname.getAttribute('value')).toBe(googleAccount.lastname);
        expect(account.username.getAttribute('value')).toBe(googleAccount.username);
        expect(account.email.getAttribute('value')).toBe(googleAccount.user);

        login.logout();

    });

    xit('bba-159:Verify fields from new facebook user', function() {

        landing.openLandingMenu.click();
        landing.enterButton.click();
        var facebookAccount = vars.account('facebook');
        login.loginFb(facebookAccount.email, facebookAccount.password);
        account.get();

        expect(account.firstname.getAttribute('value')).toBe(facebookAccount.user);
        expect(account.lastname.getAttribute('value')).toBe(facebookAccount.lastname);
        expect(account.username.getAttribute('value')).toBe(facebookAccount.user.toLowerCase());
        expect(account.email.getAttribute('value')).toBe(facebookAccount.email);

        login.logout();

    });

    it('bba-60: verify user image upload', function() {

        var smallImagePath = path.resolve() + '/test/e2e/protractor/res/smallPicture.jpg',
            bigImagePath = path.resolve() + '/test/e2e/protractor/res/morethanonemb.jpg',
            perfectImagePath = path.resolve() + '/test/e2e/protractor/res/perfectimage.jpg',
            notImagePath = path.resolve() + '/test/e2e/protractor/res/imagen.sh',
            smallImageAbsolutePath =  globalFunctions.filePath(smallImagePath),
            bigImageAbsolutePath = globalFunctions.filePath(bigImagePath),
            perfectImageAbsolutePath = globalFunctions.filePath(perfectImagePath),
            notImageAbsolutePath = globalFunctions.filePath(notImagePath);

        login.loginWithRandomUser();

        account.get();
        browser.sleep(vars.timeToWaitFadeModals);
        account.fileinput.sendKeys(smallImageAbsolutePath);
        browser.sleep(vars.timeToWaitAutoSave);

        globalFunctions.navigatorLanguage()
            .then(function(language) {
                if (language === 'es') {
                    expect(commons.alertTextToast.getText()).toMatch(vars.pictureSmall);
                } else {
                    expect(commons.alertTextToast.getText()).toMatch(vars.pictureSmallEN);
                }
            });

        account.fileinput.sendKeys(bigImageAbsolutePath);
        browser.sleep(vars.timeToWaitAutoSave);

        globalFunctions.navigatorLanguage()
            .then(function(language) {
                if (language === 'es') {
                    expect(commons.alertTextToast.getText()).toMatch(vars.pictureBig);
                } else {
                    expect(commons.alertTextToast.getText()).toMatch(vars.pictureBigEN);
                }
            });

        account.fileinput.sendKeys(perfectImageAbsolutePath);
        browser.sleep(vars.timeToWaitAutoSave);
        browser.sleep(vars.timeToWaitAutoSave);
        account.get();
        expect(account.accountImage.getAttribute('src')).not.toBe('');
        account.fileinput.sendKeys(notImageAbsolutePath);
        browser.sleep(vars.timeToWaitAutoSave);

        globalFunctions.navigatorLanguage()
            .then(function(language) {
                if (language === 'es') {
                    expect(commons.alertTextToast.getText()).toMatch(vars.fileNoPicture);
                } else {
                    expect(commons.alertTextToast.getText()).toMatch(vars.fileNoPictureEN);
                }
            });
            
        login.logout();

    });

});
