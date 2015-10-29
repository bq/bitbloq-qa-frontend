/**
 *Spec to account.spec.js
 * User Account view
 */

'use strict';

var GlobalFunctions = require('../commons/globalFunctions.js'),
    Account = require('./account.po.js'),
    Login = require('../login/login.po.js');

var globalFunctions = new GlobalFunctions(),
    account = new Account(),
    login = new Login();

globalFunctions.xmlReport('account');

describe('User account view', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bba-157:Verify fields from new normal user', function() {

        var randomUserInfo = login.loginWithRandomUser();
        account.get();

        expect(account.username.getAttribute('value')).toBe(randomUserInfo.user.toLowerCase());
        expect(account.email.getAttribute('value')).toBe(randomUserInfo.userEmail.toLowerCase());
        expect(account.firstname.getAttribute('value')).toBe('');
        expect(account.lastname.getAttribute('value')).toBe('');

        login.logout();

    });

});
