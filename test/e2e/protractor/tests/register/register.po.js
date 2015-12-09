/**
 *Page object to register
 *
 */

'use strict';

var Register = function() {
    //This elements are public (this) by reuse
    this.enterHome = $('[data-element="enter-home"]');
    this.createAccountButtn = $('[data-element="create-account"]');
    this.userName = element(by.id('username'));
    this.email = element(by.model('user.email'));
    this.password = element(by.model('user.password'));
    this.inputDay = $('[data-element="login-day-input"]');
    this.inputMonth = $('[data-element="login-month-input"]');
    this.inputYear = $('[data-element="login-year-input"]');
    this.enterRegister = $('[data-element="enter-register"]');
    this.checkBoxNewsletterAndTeacher = $('[data-element="register-newsletter-teacher-input"]');
    this.checkBoxPropertiesTerm = element(by.model('user.properties.term'));
    this.userLoginHeader = $('[data-element="user-login"]');
    //Show validate elements
    this.showNoCheck = $('[data-element="show-no-check"]');
    this.showNoUser = $('[data-element="show-nouser"]');
    this.showInUse = $('[data-element="show-inuse"]');
    this.showNoEmail = $('[data-element="show-noemail"]');
    this.showInvalidEmial = $('[data-element="invalid-email"]');
    this.showInvalidUser = $('[data-element="show-invalid-user"]');
    this.showNoBirthdate = $('[data-element="show-no-birthdate"]');
    this.showNoFourteen = $('[data-element="show-no-fourteen"]');
    this.showEmailDuplicate = $('[data-element="login-duplicated-email"');
    //Show validate elements in password input
    this.showNoPass = $('[data-element="show-no-pass"]');
    this.showMoreSixPass = $('[data-element="show-more-six-pass"]');
    this.showIncorrectPass = $('[data-element="show-incorrect-pass"]');

    /* P.O resetPassword.html */
    this.resetPasswordMainInput = $('[data-element="reset-password-main-input"]');
    this.resetPasswordRepeatInput = $('[data-element="reset-password-repeat-input"]');
    this.resetPasswordOkButton = $('[data-element="reset-password-button-ok"]');
    /***************************/


    this.url = ('#/register');
    this.get = function() {
        browser.get(this.url);
    };

    /**
     * generate Random user
     */
    this.generateUser = function() {
        return {
            username: 'userTest' + Number(new Date()),
            userEmail: 'userTest' + Number(new Date()) + '@devfakebq.es',
            password: 'prueba',
            day: '08',
            month: '07',
            year: '1987' //best year ever ;)
        };
    };

    /**
     * Create account by Random user
     * @user {String} register User
     * @email {String} emailUser
     * @password {String} password lUser
     * @day {int} day of birth
     * @month {int} month of birth
     * @year {int} year of birth
     * @isCheckNew {boolean} true if want check News
     * @isChecProp {boolean} true if want check conditions
     * @return {Void} void
     */
    this.createAccount = function(user, email, password, day, month, year, isCheckNew, isCheckProp) {
        this.userName.sendKeys(user);
        this.email.sendKeys(email);
        this.password.sendKeys(password);
        this.inputDay.sendKeys(day);
        this.inputMonth.sendKeys(month);
        this.inputYear.sendKeys(year);

        if (isCheckNew) {
            this.checkBoxNewsletterAndTeacher.click();
        }
        if (isCheckProp) {
            this.checkBoxPropertiesTerm.click();
        }
        //Checked checkbox
        // with selenium webdriver:
        //  that.driver.executeScript('arguments[0].setAttribute(\'checked\', \'checked\');', that.model.ui.toSCheckbox);

        this.enterRegister.click();

    };

    /**
     * Are LocalStorage ?
     *  @return {boolean} boolean true or false cookies
     */
    this.areLocalStorage = function() {

        //expect de token que se deben crear al hacer login
        var refreshToken = browser.executeScript('window.localStorage.getItem("ngStorage-userRefreshToken");');
        var userToken = browser.executeScript('window.localStorage.getItem("ngStorage-userToken");');
        var expireToken = browser.executeScript('window.localStorage.getItem("ngStorage-userTokenExpiresAt");');

        if (refreshToken === null || userToken === null || expireToken === null) {
            return false;
        }

        return true;
    };


};

module.exports = Register;
