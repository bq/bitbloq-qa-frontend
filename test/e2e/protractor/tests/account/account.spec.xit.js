/**
 *Spec to account.spec.js
 * User Account view
 */

'use strict';

var GlobalFunctions = require('../commons/globalFunctions.js'),
    Account = require('./account.po.js'),
    Variables = require('../commons/variables.js'),
    Landing = require('../landing/landing.po.js'),
    Login = require('../login/login.po.js');

var globalFunctions = new GlobalFunctions(),
    vars = new Variables(),
    account = new Account(),
    landing = new Landing(),
    login = new Login();

globalFunctions.xmlReport('accountLocalXit');

describe('User account view', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bba-158:accountLocalXit:Verify fields from new google user', function() {

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

    it('bba-159:accountLocalXit:Verify fields from new facebook user', function() {

        landing.openLandingMenu.click();
        landing.enterButton.click();
        var facebookAccount = vars.account('facebook');
        login.loginFb(facebookAccount.email, facebookAccount.password);
        account.get();

        expect(account.firstname.getAttribute('value')).toBe(facebookAccount.user);
        expect(account.lastname.getAttribute('value')).toBe(facebookAccount.lastname);
        expect(account.username.getAttribute('value')).toBe(facebookAccount.username.toLowerCase());
        expect(account.email.getAttribute('value')).toBe(facebookAccount.email);

        login.logout();

    });
});
