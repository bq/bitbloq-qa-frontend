/**
 *Spec to account.spec.js
 * User Account view
 */

'use strict';

var GlobalFunctions = require('../commons/globalFunctions.js'),
    Account = require('../account/account.po.js'),
    Variables = require('../commons/variables.js'),
    Landing = require('../landing/landing.po.js'),
    Login = require('../login/login.po.js'),
    Social = require('../social/social.po.js'),
    Mock = require('../commons/mock.js');

var globalFunctions = new GlobalFunctions(),
    vars = new Variables(),
    account = new Account(),
    landing = new Landing(),
    login = new Login(),
    social = new Social(),
    mock = new Mock();

globalFunctions.xmlReport('socialLocal');

describe('User account view', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    xit('bba-2: Asociate Social to account', function() {

        mock.deleteUser('testprove2016@gmail.com', 'next');
        login.loginWithRandomUser();
        account.get();
        globalFunctions.scrollBottomPage().then(function() {
        browser.pause();

        login.logout();
        });

        landing.openLandingMenu.click();
        landing.enterButton.click();
        var googleAccount = vars.account('googleProve');
        social.registerGoogle(googleAccount.user, googleAccount.password, googleAccount.username);
        account.get();
        expect(account.firstname.getAttribute('value')).toBe(googleAccount.firstname);
        expect(account.lastname.getAttribute('value')).toBe(googleAccount.lastname);
        // expect(account.username.getAttribute('value')).toBe(googleAccount.username);
        expect(account.email.getAttribute('value')).toBe(googleAccount.user);
        login.logout();

    });

});
