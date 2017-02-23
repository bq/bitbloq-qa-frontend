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
    this.email = element(by.id('email'));
    this.password = $('[data-element="register-password-input"]');
    this.inputDay = $('[data-element="register-day-input"]');
    this.inputMonth = $('[data-element="register-month-input"]');
    this.inputYear = $('[data-element="register-year-input"]');
    this.enterRegister = $('[data-element="enter-register"]');
    this.checkBoxNewsletterAndTeacher = $('[data-element="register-newsletter-teacher-input"]');
    this.checkBoxPropertiesTerm = $('[data-element="register-terms-input"]');
    this.userLoginHeader = $('[data-element="user-login"]');
    //tutor data
    this.tutorName = $('[data-element="register-tutor-name"]');
    this.tutorSurname = $('[data-element="register-tutor-lastname"]');
    this.tutorEmail = $('[data-element="register-tutor-email"]');
    this.showInvalidTutorEmail = $('[data-element="register-invalid-tutoremail"]');
    this.showNoTutorEmail = $('[data-element="register-show-notutoremail"]');
    this.showSameEmail = $('[data-element="register-same-email"]');
    this.showNoNametutor = $('[data-element="show-nonametutor"]');
    this.showNoSurnametutor = $('[data-element="show-nosurname"]');
    //Show validate elements
    this.showNoCheck = $('[data-element="show-no-check"]');
    this.showNoUser = $('[data-element="show-nouser"]');
    this.showInUse = $('[data-element="show-inuse"]');
    this.showNoEmail = $('[data-element="register-show-noemail"]');
    this.showInvalidEmial = $('[data-element="register-invalid-email"]');
    this.showInvalidUser = $('[data-element="show-invalid-user"]');
    this.showNoBirthdate = $('[data-element="show-no-birthdate"]');
    this.showValidBirthdate = $('[data-element="show-valid-birthdate"]');
    this.showNoFourteen = $('[data-element="show-no-fourteen"]');
    this.showEmailDuplicate = $('[data-element="login-duplicated-email"');
    //Show validate elements in password input
    this.showNoPass = $('[data-element="register-show-no-pass"]');
    this.showMoreSixPass = $('[data-element="register-show-more-six-pass"]');
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
    this.generateUser = function(young) {
        var registerDate = new Date();
        registerDate.setYear(registerDate.getFullYear() - 14);
        if (young) {
          registerDate.setDate(registerDate.getDate()+1);
          return {
              username: 'userTest' + Number(new Date()) + Math.floor((Math.random() * 100000) + 1),
              userEmail: 'userTest' + Number(new Date()) + Math.floor((Math.random() * 100000) + 1) + '@devfakebq.es',
              password: 'prueba',
              day: registerDate.getDate(),
              month: registerDate.getMonth()+1,
              year: registerDate.getFullYear(),
              tutorName: 'tutorTest' + Number(new Date()) + Math.floor((Math.random() * 100000) + 1),
              tutorSurname: 'tutorTest' + Number(new Date()) + Math.floor((Math.random() * 100000) + 1),
              tutorEmail: 'tutorTest' + Number(new Date()) + Math.floor((Math.random() * 100000) + 1) + '@devfakebq.es'
          };
        } else {
          return {
              username: 'userTest' + Number(new Date()) + Math.floor((Math.random() * 100000) + 1),
              userEmail: 'userTest' + Number(new Date()) + Math.floor((Math.random() * 100000) + 1) + '@devfakebq.es',
              password: 'prueba',
              day: registerDate.getDate(),
              month: registerDate.getMonth()+1,
              year: registerDate.getFullYear()
          };
        }

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
    this.createAccount = function(user, email, password, day, month, year, isCheckNew, isCheckProp, tutorN, tutorS, tutorE) {
        this.userName.clear().sendKeys(user);
        this.email.clear().sendKeys(email);
        this.password.clear().sendKeys(password);
        this.inputDay.clear().sendKeys(day);
        this.inputMonth.clear().sendKeys(month);
        this.inputYear.clear().sendKeys(year);
        if (tutorN  || tutorS || tutorE) {
            this.password.click();
            this.tutorName.clear().sendKeys(tutorN);
            this.tutorSurname.clear().sendKeys(tutorS);
            this.tutorEmail.clear().sendKeys(tutorE);
        }
        if (isCheckNew) {
            this.userName.click(); //por si se mueve el formulario
            this.checkBoxNewsletterAndTeacher.click();
        }
        if (isCheckProp) {
            this.userName.click(); //por si se mueve el formulario
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
