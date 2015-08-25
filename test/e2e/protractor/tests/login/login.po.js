/**
 *Page object to login
 */

'use strict';

var Register = require('../register/register.po.js'),
    register = new Register(),
    Projects = require('../projects/projects.po.js'),
    projects = new Projects(),
    Variables = require('../commons/variables.js'),
    vars = new Variables();

var Login = function() {
    //This elements are public (this) by reuse
    //Login basic
    this.loginButton = $('[data-element="login-button"]');
    this.user = element(by.model('emailUserName'));
    this.password = element(by.model('user.password'));
    this.userLoginHeader = $('[data-element="user-login"]');
    //Login FB
    this.facebookButton = element(by.buttonText('Facebook'));
    this.facebookUser = element(by.id('email'));
    this.facebookPassword = element(by.id('pass'));
    this.facebookEnter = element(by.id('loginbutton'));
    //Login Google
    this.googleButton = element(by.buttonText('Google +'));
    this.googleNext = element(by.id('next'));
    this.googleUser = element(by.id('Email'));
    this.googlePassword = element(by.id('Passwd'));
    this.googleEnter = element(by.id('signIn'));
    this.googleAprove = element(by.id('submit_approve_access'));
    //Show validate elements
    this.showNoUserAndEmail = $('[data-element="show-no-user-and-email"]');
    this.showNoPass = $('[data-element="show-no-pass"]');
    this.showMoreSixPass = $('[data-element="show-more-six-pass"]');
    this.showIncorrectPass = $('[data-element="show-incorrect-password"]');
    this.showIncorrectUser = $('[data-element="show-no-user-or-email-register"]');

    /**
     * login in bitbloq
     * @user {String}  bitlbloq user
     * @param {String} password bitbloq user
     * @return {Void} void
     */
    this.login = function(user, password) {
        this.user.sendKeys(user);
        this.password.sendKeys(password);
        this.loginButton.click();
        //wait succesfull login page
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/projects');
    };

    /**
     * login with facebook in bitbloq
     * @user {String}  bitlbloq user
     * @param {String} password bitbloq user
     * @return {Void} void
     */
    this.loginFb = function(email, password) {

        this.facebookButton.click();

        var that = this;
        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(
            function(handles) {
                // Ignore sync (not angular page)
                browser.ignoreSynchronization = true;

                console.log('handles', handles);

                //Switch to popup
                browser.switchTo().window(handles[1]);

                that.facebookUser.sendKeys(email);
                that.facebookPassword.sendKeys(password);
                that.facebookEnter.click();
                browser.sleep(5000);
                // go back to the main window
                browser.switchTo().window(handles[0]);

                //Not ignore sync, return angular
                browser.ignoreSynchronization = false;
            });

    };

    /**
     * login with google in bitbloq
     * @user {String}  bitlbloq user
     * @param {String} password bitbloq user
     * @return {Void} void
     */
    this.loginGoogle = function(email, password) {

        this.googleButton.click();

        browser.sleep(vars.timeToWaitTab);

        var that = this;
        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {
            // Ignore sync (not angular page)
            browser.ignoreSynchronization = true;

            //Switch to popup
            browser.switchTo().window(handles[1]);

            //TODO refactor
            that.googleUser.sendKeys(email);
            browser.sleep(1000);
            that.googleNext.click();
            browser.sleep(1000);
            that.googlePassword.sendKeys(password);
            browser.sleep(1000);
            that.googleEnter.click();
            browser.sleep(5000);
            that.googleAprove.click();

            browser.sleep(vars.timeToWaitTab);

            // go back to the main window
            browser.switchTo().window(handles[0]);

            //Not ignore sync, return angular
            browser.ignoreSynchronization = false;
        });

    };


    this.loginWithRandomUser = function() {
        this.get();
        var randomUserCredentials = register.generateUser();
        register.createAccountButtn.click();
        register.createAccount(
            randomUserCredentials.username,
            randomUserCredentials.userEmail,
            randomUserCredentials.password,
            randomUserCredentials.day,
            randomUserCredentials.month,
            randomUserCredentials.year,
            true,
            true);
        //wait succesfull login page
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/projects');

        //Add return for reuse user if is necessary
        return {
            user: randomUserCredentials.username,
            userEmail: randomUserCredentials.userEmail,
            password: randomUserCredentials.password,
            day: randomUserCredentials.day,
            month: randomUserCredentials.month,
            year: randomUserCredentials.year

        };
    };

    this.loginWithUserName = function (name) {
        this.get();
        var randomUserCredentials = register.generateUser();
        register.createAccountButtn.click();
        register.createAccount(
            name,
            randomUserCredentials.userEmail,
            randomUserCredentials.password,
            randomUserCredentials.day,
            randomUserCredentials.month,
            randomUserCredentials.year,
            true,
            true);
        //wait succesfull login page
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/projects');

        //Add return for reuse user if is necessary
        return {
            user: name,
            userEmail: randomUserCredentials.userEmail,
            password: randomUserCredentials.password,
            day: randomUserCredentials.day,
            month: randomUserCredentials.month,
            year: randomUserCredentials.year

        };
    };


    /**
     * Are localStorage ?
     *  @return {boolean} boolean true or false cookies
     */
    this.arelocalStorage = function() {

        //expect de token que se deben crear al hacer login
        var refreshToken = browser.executeScript('window.localStorage.getItem("ngStorage-userRefreshToken");');
        var userToken = browser.executeScript('window.localStorage.getItem("ngStorage-userToken");');
        var expireToken = browser.executeScript('window.localStorage.getItem("ngStorage-userTokenExpiresAt");');

        if (refreshToken === null || userToken === null || expireToken === null) {
            return false;
        }

        return true;
    };

    this.logout = function() {
        projects.get();
        $('[data-element="open-header-menu"]').click();
        $('[data-element="header-menu-logout"]').click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/');
    };

    this.get = function() {
        browser.get('#/login');
    };
};

module.exports = Login;
