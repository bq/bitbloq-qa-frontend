/**
 * Page objects of account.html
 */
'use strict';

var Variables = require('../commons/variables.js'),
    Login = require('../login/login.po.js');

var vars = new Variables(),
    login = new Login();

var Social = function() {

    this.loginSocialUsername = $('[data-element="login-social-username-input"]');
    this.loginSocialTermCheckbox = $('[data-element="login-social-term-checkbox"]');
    this.loginSocialCheckUserButton = $('[data-element="login-social-check-user-button"]');
    this.loginSocialEnterButton = $('[data-element="login-social-enter-button"]');
    this.loginSocialUsernameInput = $('[data-element="login-social-username-input"]');
    this.loginSocialCheckUserButton = $('[data-element="login-social-check-user-button"]');
    this.loginSocialTermCheckbox = $('[data-element="login-social-term-checkbox"]');
    this.loginSocialEnterButton = $('[data-element="login-social-enter-button"]');



    this.registerGoogle = function(email, password, username) {
        var that = this;
        login.googleButton.click();

        browser.sleep(vars.timeToWaitTab);

        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {
            // Ignore sync (not angular page)
            browser.ignoreSynchronization = true;

            //Switch to popup
            browser.switchTo().window(handles[1]);

            //TODO refactor
            login.googleUser.sendKeys(email);
            browser.sleep(1000);
            login.googleNext.click();
            browser.sleep(1000);
            login.googlePassword.sendKeys(password);
            browser.sleep(1000);
            login.googleEnter.click();
            browser.sleep(5000);
            login.googleAprove.click();

            browser.sleep(vars.timeToWaitTab);
            // go back to the main window
            browser.switchTo().window(handles[0]).then(function() {
                //Not ignore sync, return angular
                browser.ignoreSynchronization = false;
                browser.sleep(vars.timeToWaitTab);
                that.loginSocialUsername.sendKeys(username);
                browser.sleep(vars.timeToWaitTab);
                that.loginSocialCheckUserButton.click();
                that.loginSocialTermCheckbox.click();
                that.loginSocialEnterButton.click();
                browser.sleep(vars.timeToWaitAutoSave);
                //browser.pause();

            });

        });

    };

};

module.exports = Social;
