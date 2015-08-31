/**
 *Spec to login
 */

'use strict';

var Register = require('./register.po.js'),
    Variables = require('../commons/variables.js'),
    Landing = require('../landing/landing.po.js'),
    Login = require('../login/login.po.js');

var register = new Register(),
    vars = new Variables(),
    landing = new Landing(),
    login = new Login();

describe('Register ', function() {

    //beforeEach commons
    vars.beforeTest();

    // afterEach commons
    vars.afterTest();

    it('bba-1:Register with a user basic account', function() {

        landing.openLandingMenu.click();
        landing.enterButton.click();
        //expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');

        //Go to create account form
        register.createAccountButtn.click();

        //Create account by Random User
        var user = register.generateUser();
        register.createAccount(user.username, user.userEmail, user.password, user.day, user.month, user.year, true, true);

        // if ok go to #/projects
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/projects');

        login.logout();

    });

    it('bba-96:Cant register without checking conditions', function() {

        landing.openLandingMenu.click();
        landing.enterButton.click();


        //Go to create account form
        register.createAccountButtn.click();

        //Create account by Random User with not check conditions
        register.createAccount(register.generateUser().username, register.generateUser().userEmail, register.generateUser().password, 31, 3, 1986, false, false);

        // Only show if not check conditions
        expect(register.showNoCheck.isDisplayed()).toBeTruthy();

        // if in #/login , --> Not in #/projects
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');


    });

    it('bba-93:Cant register without an user name', function() {
        landing.openLandingMenu.click();
        landing.enterButton.click();

        //Go to create account form
        register.createAccountButtn.click();


        //Create account by Random User with not user
        register.createAccount('', register.generateUser().userEmail, register.generateUser().password, 31, 3, 1986, false, true);

        // Only show if not user in form
        expect(register.showNoUser.isDisplayed()).toBeTruthy();

        // if in #/login , --> Not in #/projects
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');


    });

    it('bba-25:Cant register with the same user name', function() {

        landing.openLandingMenu.click();
        landing.enterButton.click();


        //Go to create account form
        register.createAccountButtn.click();

        var user = register.generateUser();
        //Register with user in use
        register.createAccount(user.username, user.userEmail, user.password, 31, 3, 1986, true, true);
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/projects');
        login.logout();

        login.get();

        register.createAccountButtn.click();

        register.createAccount(user.username, user.userEmail, user.password, 31, 3, 1986, true, true);

        // Only show if user is in use
        expect(register.showInUse.isDisplayed()).toBeTruthy();

        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');

        login.get();

        register.createAccountButtn.click();

        register.createAccount(user.username.toUpperCase(), user.userEmail, user.password, 31, 3, 1986, true, true);

        // Only show if user is in use
        expect(register.showInUse.isDisplayed()).toBeTruthy();

        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');

    });

    it('bba-95:validate INCORRECT FORMAT USER ', function() {

        landing.openLandingMenu.click();
        landing.enterButton.click();

        //Go to create account form
        register.createAccountButtn.click();


        //Register with with invalid user (only number)
        register.createAccount('356848', vars.password, 123456, 31, 3, 1986, true, true);

        // Only show if is invalid character
        expect(register.showInvalidUser.isDisplayed()).toBeTruthy();

        register.userName.clear();
        //Register with with invalid user (especial characters)
        register.createAccount('*/*/*-&%', vars.password, 123456, 31, 3, 1986, true, true);

        // Only show if is invalid character
        expect(register.showInvalidUser.isDisplayed()).toBeTruthy();

        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');

    });

    it('bba-97:validate NO EMAIL ', function() {

        landing.openLandingMenu.click();
        landing.enterButton.click();


        //Go to create account form
        register.createAccountButtn.click();


        //Create account by Random User with not email
        register.createAccount(register.generateUser().username, '', register.generateUser().password, 31, 3, 1986, false, true);

        expect(register.showNoEmail.isDisplayed()).toBeTruthy();

        // if in #/login , --> Not in #/projects
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');

    });

    it('bba-98:validate INCORRECT EMAIL ', function() {

        landing.openLandingMenu.click();
        landing.enterButton.click();


        //Go to create account form
        register.createAccountButtn.click();

        //Create account by Random User with not correct email (no @ )
        register.createAccount(register.generateUser().username, 'asdfasdf.es', register.generateUser().password, 31, 3, 1986, false, true);

        expect(register.showInvalidEmial.isDisplayed()).toBeTruthy();

        //TODO --> VALIDATE email *@.*
        //Create account by Random User with not correct email (no .* )
        //register.createAccount(register.generateUser().username,'asdfasdf.es', register.generateUser().password, 31, 3, 1986, false, true);

        //expect(register.showNoEmail.isDisplayed()).toBeTruthy();

        // if in #/login , --> Not in #/projects
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');


    });


    it('bba-99:in password is show "Introduce una contraseña" ?', function() {

        landing.openLandingMenu.click();
        landing.enterButton.click();


        //Go to create account form
        register.createAccountButtn.click();


        //Login in bitbloq without password
        register.userName.sendKeys(register.generateUser().user);
        register.password.sendKeys('');
        register.enterRegister.click();

        //Wait show error
        expect(register.showNoPass.isDisplayed()).toBeTruthy();

        // if in #/login , --> Not in #/projects
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');


    });

    it('bba-100:in password is show "La contraseña debe tener 6 caracteres como mínimo" ?', function() {

        landing.openLandingMenu.click();
        landing.enterButton.click();


        //Go to create account form
        register.createAccountButtn.click();

        //Login in bitbloq without password
        register.userName.sendKeys(register.generateUser().username);
        register.password.sendKeys('69');
        register.enterRegister.click();

        //Wait show error
        expect(register.showMoreSixPass.isDisplayed()).toBeTruthy();

        // if in #/login , --> Not in #/projects
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');


    });

    it('bba-101:validate NOT DATE OF BIRTH ', function() {
        landing.openLandingMenu.click();
        landing.enterButton.click();


        //Go to create account form
        register.createAccountButtn.click();

        var user = register.generateUser();

        //Create user account without all birthdate
        register.createAccount(user.username, user.userEmail, user.password, '', '', '', false, true);
        expect(register.showNoBirthdate.isDisplayed()).toBeTruthy();
        register.inputDay.clear();
        register.inputMonth.clear();
        register.inputYear.clear();
        register.userName.clear();
        register.email.clear();

        //Create user account without only day
        register.createAccount(user.username, user.userEmail, user.password, '', 3, 1986, false, true);
        expect(register.showNoBirthdate.isDisplayed()).toBeTruthy();
        register.inputDay.clear();
        register.inputMonth.clear();
        register.inputYear.clear();
        register.userName.clear();
        register.email.clear();

        //Create user account without only month
        register.createAccount(user.username, user.userEmail, user.password, 31, '', 1986, false, true);
        expect(register.showNoBirthdate.isDisplayed()).toBeTruthy();
        register.inputDay.clear();
        register.inputMonth.clear();
        register.inputYear.clear();
        register.userName.clear();
        register.email.clear();

        //Create user account without only year

        register.createAccount(user.username, user.userEmail, user.password, 31, 3, '', false, true);
        expect(register.showNoBirthdate.isDisplayed()).toBeTruthy();


        // if in #/login , --> Not in #/projects
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');

    });

    it('bba-102:validate DATE OF BIRTH BEFORE 14 YEARS (14 - DATENOW) ', function() {

        landing.openLandingMenu.click();
        landing.enterButton.click();

        //Go to create account form
        register.createAccountButtn.click();

        //Create user account today
        var registerDate = new Date();
        //-14 years + 1 day --> less 14 years old
        registerDate.setYear(registerDate.getFullYear() - 14);
        registerDate.setDate(registerDate.getDate()+1);

        var user = register.generateUser();
        register.createAccount(user.username, user.userEmail, user.password, registerDate.getDate(), registerDate.getMonth() +1, registerDate.getFullYear(), false, true);
        expect(register.showNoFourteen.isDisplayed()).toBeTruthy();

        // if in #/login , --> Not in #/projects
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');
    });


});
