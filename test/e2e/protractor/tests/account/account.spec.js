/**
 *Spec to account.spec.js
 * User Account view
 */

'use strict';

var GlobalFunctions = require('../commons/globalFunctions.js'),
    Variables = require('../commons/variables.js'),
    Account = require('./account.po.js'),
    Header = require('../header/header.po.js'),
    Login = require('../login/login.po.js'),
    Modals = require('../modals/modals.po.js'),
    Commons = require('../commons/commons.po.js'),
    Alerts = require('../alerts/alerts.po.js');

var globalFunctions = new GlobalFunctions(),
    vars = new Variables(),
    account = new Account(),
    login = new Login(),
    modals = new Modals(),
    header = new Header(),
    commons = new Commons(),
    alerts = new Alerts();

globalFunctions.xmlReport('account');

describe('User account view', function () {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bbb-42:account:Verify fields from new normal user', function () {

        var randomUserInfo = login.loginWithRandomUser();
        account.get();

        expect(account.username.getAttribute('value')).toBe(randomUserInfo.user.toLowerCase());
        expect(account.email.getAttribute('value')).toBe(randomUserInfo.userEmail.toLowerCase());
        expect(account.firstname.getAttribute('value')).toBe('');
        expect(account.lastname.getAttribute('value')).toBe('');

        login.logout();
    });

    it('bbb-40:account:Verify reset password (no social login)', function () {

        var randomUserInfo = login.loginWithRandomUser();
        account.get();
        account.userTab.click();
        account.resetPasswordButton.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.accountResetPasswordInput.sendKeys('123456');
        modals.accountResetPasswordRepitInput.sendKeys('123456');
        modals.accountResetPasswordOKButton.click();
        browser.sleep(vars.timeToWaitFadeModals);
        login.logout();

        login.get();
        login.login({ 'user': randomUserInfo.user, 'password': '123456' });

        login.logout();
    });


    it('bbb-41:account:Check name and surmane are edits (input text)', function () {

        var randomUserInfo = login.loginWithRandomUser();
        account.get();
        account.userTab.click();
        account.firstname.clear().sendKeys('Manolo');
        browser.sleep(2000);
        commons.expectToastTimeOut(commons.alertTextToast);
        account.lastname.clear().sendKeys('Garcia');
        browser.sleep(2000);
        commons.expectToastTimeOut(commons.alertTextToast);
        browser.sleep(vars.timeToWaitAutoSave);

        login.logout();

        login.get();
        login.login({ 'user': randomUserInfo.user, 'password': randomUserInfo.password });
        account.get();

        expect(account.firstname.getAttribute('value')).toMatch('Manolo');
        expect(account.lastname.getAttribute('value')).toMatch('Garcia');
    });

    it('bbb-322:account:Change the username', function () {
        var user = login.loginWithRandomUser();
        account.get();
        account.userTab.click();
        var usernameNew = 'prueba' + Number(new Date()) + Math.floor((Math.random() * 100000) + 1);
        browser.sleep(vars.timeToWaitTab);
        browser.ignoreSynchronization = true;
        account.username.clear();
        browser.sleep(vars.timeToWaitSendKeys);
        account.username.sendKeys(usernameNew);
        browser.sleep(vars.timeToWaitAlert);
        browser.ignoreSynchronization = false;
        commons.expectToastTimeOut(commons.alertTextToast, alerts.alertTextDataAutosave);
        login.logout();
        login.get();
        login.login({ 'user': usernameNew, 'password': user.password });
        account.get();
        account.userTab.click();
        expect(account.username.getAttribute('value')).toMatch(usernameNew);
        login.logout();

    });

    fit('bbb-45:account:verify teacher checkbox', function () {
        login.loginWithRandomUser();
        header.openHeaderMenu.click();
        header.settings.click();
        expect(account.imATeacher.isDisplayed()).toBe(true, 'The check is not showed');

        login.logout();

    });
});
