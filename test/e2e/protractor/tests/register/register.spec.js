/**
 *Spec to login
 */

'use strict';

var Register = require('./register.po.js'),
    Variables = require('../commons/variables.js'),
    GlobalFunctions = require('../commons/globalFunctions.js'),
    Landing = require('../landing/landing.po.js'),
    Login = require('../login/login.po.js'),
    Commons = require('../commons/commons.po.js'),
    Alerts = require('../alerts/alerts.po.js'),
    Cookies = require('../cookiesBar/cookiesBar.po.js'),
    Account = require('../account/account.po.js');

var register = new Register(),
    vars = new Variables(),
    globalFunctions = new GlobalFunctions(),
    landing = new Landing(),
    login = new Login(),
    commons = new Commons(),
    alerts = new Alerts(),
    cookies = new Cookies(),
    account = new Account();

globalFunctions.xmlReport('register');

describe('Register ', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bbb-1:register:Register with a user basic account', function() {

        landing.enterButton.click();
        //expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');

        //Go to create account form
        register.createAccountButtn.click();

        //Create account by Random User
        var user = register.generateUser(false);
        register.createAccount(user.username, user.userEmail, user.password, user.day, user.month, user.year, true, true);

        // if ok go to #/projects
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/projects/myprojects?page=1');

        login.logout();

    });

    it('bbb-2:register:The email is duplicated', function() {
        landing.enterButton.click();

        //Go to create account form
        register.createAccountButtn.click();

        var user = register.generateUser(false);
        //Register with user in use
        register.createAccount(user.username, user.userEmail, user.password, 31, 3, 1986, false, true);
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/projects/myprojects?page=1');
        login.logout();
        login.get();
        register.createAccountButtn.click();
        register.createAccount(user.username + 'a', user.userEmail, user.password, 31, 3, 1986, false, true);

        // Only show if user is in use
        expect(register.showEmailDuplicate.isDisplayed()).toBeTruthy();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');

        login.get();
        register.createAccountButtn.click();
        var useryoung = register.generateUser(true);
        register.createAccount(useryoung.username, user.userEmail, useryoung.password, useryoung.day, useryoung.month, useryoung.year, false, true, useryoung.tutorName, useryoung.tutorSurname, useryoung.tutorEmail);
        expect(register.showEmailDuplicate.isDisplayed()).toBeTruthy();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');

    });

    it('bbb-3:register:Verify remember password email', function() {

        //check bloqsproject
        var browserEmail = browser.forkNewDriverInstance();
        browserEmail.ignoreSynchronization = true;

        register.getExternalProviderEmail(browserEmail).then(function(value) {
            var email = value,
                newUser = register.generateUser();
            browserEmail.ignoreSynchronization = false;

            register.get();
            register.createAccount(newUser.username, email, newUser.password, newUser.day, newUser.month, newUser.year, true, true);
            browser.sleep('3000');
            login.logout();
            login.get();
            login.user.sendKeys(email);
            login.forgotPasswordButton.click();
            login.emailToSendInput.sendKeys(email);
            login.emailToSendButton.click();

            browser.sleep('9000');

            browserEmail.ignoreSynchronization = true;

            var $2 = browserEmail.$;
            globalFunctions.scrollBottomPage(browserEmail).then(function() {
                $2('#msg_1 > td:nth-child(2)').click();
                //Open popup email send
                browserEmail.sleep(5000);
                $2('#modalMessage > div.modal-body > a').click();
                //#modalMessage > div.modal-body > a


                //Switch to popup
                browserEmail.ignoreSynchronization = false;
                //News passwords
                $2(register.resetPasswordMainInput.elementArrayFinder_.locator_.value).sendKeys('123456');
                $2(register.resetPasswordRepeatInput.elementArrayFinder_.locator_.value).sendKeys('123456');
                $2(register.resetPasswordOkButton.elementArrayFinder_.locator_.value).click();
                browser.sleep(vars.timeToWaitAutoSave);
                //go back to the main window && login wiht new passwords
                login.get();
                login.login({'user': newUser.username, 'password':'123456'});
                login.logout();

            });
        });

    });

    it('bbb-4:register:Cant register with the same user name', function() {

        landing.enterButton.click();

        //Go to create account form
        register.createAccountButtn.click();

        var user = register.generateUser(false);
        //Register with user in use
        register.createAccount(user.username, user.userEmail, user.password, user.day, user.month, user.year, true, true);
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/projects/myprojects?page=1');
        login.logout();

        login.get();

        register.createAccountButtn.click();

        register.createAccount(user.username, 'a'+user.userEmail, user.password, user.day, user.month, user.year, true, true);

        // Only show if user is in use
        expect(register.showInUse.isDisplayed()).toBeTruthy();

        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');

        login.get();

        register.createAccountButtn.click();

        register.createAccount(user.username.toUpperCase(), 'a'+user.userEmail, user.password, user.day, user.month, user.year, true, true);

        // Only show if user is in use
        expect(register.showInUse.isDisplayed()).toBeTruthy();

        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');

        login.get();
        var useryoung = register.generateUser(true);
        register.createAccountButtn.click();

        register.createAccount(user.username, useryoung.userEmail, useryoung.password, useryoung.day, useryoung.month, useryoung.year, true, true, useryoung.tutorName, useryoung.tutorSurname, useryoung.tutorEmail);

        // Only show if user is in use
        expect(register.showInUse.isDisplayed()).toBeTruthy();

        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');
    });

    it('bbb-5:register:Cant register without an user name', function() {
        landing.enterButton.click();

        //Go to create account form
        register.createAccountButtn.click();

        //Create account by Random User with not user
        var user = register.generateUser(false);
        register.createAccount('', user.userEmail, user.password, user.day, user.month, user.year, true, true);

        // Only show if not user in form
        expect(register.showNoUser.isDisplayed()).toBeTruthy();

        // if in #/login , --> Not in #/projects
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');

        user = register.generateUser(true);
        register.createAccount('', user.userEmail, user.password, user.day, user.month, user.year, false, false, user.tutorName, user.tutorSurname, user.tutorEmail);

        // Only show if not user in form
        expect(register.showNoUser.isDisplayed()).toBeTruthy();
        // if in #/login , --> Not in #/projects
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');

    });

    it('bbb-6:register:validate INCORRECT FORMAT USER ', function() {

        landing.enterButton.click();

        //Go to create account form
        register.createAccountButtn.click();
        var user = register.generateUser(false);
        //Register with with invalid user (only number)
        register.createAccount('356848', user.userEmail, user.password, user.day, user.month, user.year, true, true);

        // Only show if is invalid character
        expect(register.showInvalidUser.isDisplayed()).toBeTruthy();

        register.userName.clear();
        //Register with with invalid user (especial characters)
        register.createAccount('*/*/*-&%', user.userEmail, user.password, user.day, user.month, user.year, false, false);

        // Only show if is invalid character
        expect(register.showInvalidUser.isDisplayed()).toBeTruthy();

        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');

        login.get();

        register.createAccountButtn.click();
        user = register.generateUser(true);
        register.createAccount('356848', user.userEmail, user.password, user.day, user.month, user.year, true, true, user.tutorName, user.tutorSurname, user.tutorEmail);
        expect(register.showInvalidUser.isDisplayed()).toBeTruthy();
        register.createAccount('*/*/*-&%', user.userEmail, user.password, user.day, user.month, user.year, false, false, user.tutorName, user.tutorSurname, user.tutorEmail);
        expect(register.showInvalidUser.isDisplayed()).toBeTruthy();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');

    });

    it('bbb-7:register:Cant register without checking conditions', function() {

        landing.enterButton.click();

        //Go to create account form
        register.createAccountButtn.click();

        //Create account by Random User with not check conditions
        var user = register.generateUser(false);
        register.createAccount(user.username, user.userEmail, user.password, user.day, user.month, user.year, false, false);

        // Only show if not check conditions
        expect(register.showNoCheck.isDisplayed()).toBeTruthy();

        // if in #/login , --> Not in #/projects
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');

        user = register.generateUser(true);
        register.createAccount(user.username, user.userEmail, user.password, user.day, user.month, user.year, false, false, user.tutorName, user.tutorSurname, user.tutorEmail);

        // Only show if not check conditions
        expect(register.showNoCheck.isDisplayed()).toBeTruthy();

        // if in #/login , --> Not in #/projects
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');

    });

    it('bbb-8:register:validate NO EMAIL ', function() {

        landing.enterButton.click();

        //Go to create account form
        register.createAccountButtn.click();
        var user = register.generateUser(false);
        //Create account by Random User with not email
        register.createAccount(user.username, '', user.password, user.day, user.month, user.year, true, true);

        expect(register.showNoEmail.isDisplayed()).toBeTruthy();

        // if in #/login , --> Not in #/projects
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');

        user = register.generateUser(true);
        //Create account by Random User with not email
        register.createAccount(user.username, '', user.password, user.day, user.month, user.year, false, false, user.tutorName, user.tutorSurname, user.tutorEmail);

        expect(register.showNoEmail.isDisplayed()).toBeTruthy();

        // if in #/login , --> Not in #/projects
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');

    });

    it('bbb-9:register:validate INCORRECT EMAIL ', function() {

        landing.enterButton.click();

        //Go to create account form
        register.createAccountButtn.click();
        var user = register.generateUser(false);
        //Create account by Random User with not correct email (no @ )
        register.createAccount(user.username, 'asdfasdf.es', user.password, user.day, user.month, user.year, true, true);

        expect(register.showInvalidEmial.isDisplayed()).toBeTruthy();

        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');
        user = register.generateUser(true);
        register.createAccount(user.username, 'sdfasdf.es', user.password, user.day, user.month, user.year, false, false, user.tutorName, user.tutorSurname, user.tutorEmail);
        expect(register.showInvalidEmial.isDisplayed()).toBeTruthy();

        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');

    });

    it('bbb-10:register:in password is show "Introduce una contraseña" ?', function() {

        landing.enterButton.click();

        //Go to create account form
        register.createAccountButtn.click();

        var user = register.generateUser(false);
        register.createAccount(user.username, user.userEmail, '', user.day, user.month, user.year, true, true);

        //Wait show error
        expect(register.showNoPass.isDisplayed()).toBeTruthy();

        // if in #/login , --> Not in #/projects
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');

        user = register.generateUser(true);
        register.createAccount(user.username, user.userEmail, '', user.day, user.month, user.year, false, false, user.tutorName, user.tutorSurname, user.tutorEmail);
        expect(register.showNoPass.isDisplayed()).toBeTruthy();

        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');

    });

    it('bbb-11:register:in password is show La contraseña debe tener 6 caracteres como mínimo', function() {

        landing.enterButton.click();

        //Go to create account form
        register.createAccountButtn.click();

        //Login in bitbloq without password
        var user = register.generateUser(false);
        register.createAccount(user.username, user.userEmail, '11', user.day, user.month, user.year, true, true);

        //Wait show error
        expect(register.showMoreSixPass.isDisplayed()).toBeTruthy();

        // if in #/login , --> Not in #/projects
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');

        user = register.generateUser(true);
        register.createAccount(user.username, user.userEmail, '55', user.day, user.month, user.year, false, false, user.tutorName, user.tutorSurname, user.tutorEmail);
        expect(register.showMoreSixPass.isDisplayed()).toBeTruthy();

        // if in #/login , --> Not in #/projects
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');
    });

    it('bbb-12:register:validate NOT DATE OF BIRTH ', function() {
        landing.enterButton.click();

        //Go to create account form
        register.createAccountButtn.click();

        var user = register.generateUser(false);

        //Create user account without all birthdate
        register.createAccount(user.username, user.userEmail, user.password, '', '', '', false, true);
        expect(register.showNoBirthdate.isDisplayed()).toBeTruthy();

        //Create user account without only day
        register.createAccount(user.username, user.userEmail, user.password, '', 3, 1986, false, false);
        expect(register.showNoBirthdate.isDisplayed()).toBeTruthy();

        //Create user account without only month
        register.createAccount(user.username, user.userEmail, user.password, 31, '', 1986, false, false);
        expect(register.showNoBirthdate.isDisplayed()).toBeTruthy();

        //Create user account without only year

        register.createAccount(user.username, user.userEmail, user.password, 31, 3, '', false, false);
        expect(register.showNoBirthdate.isDisplayed()).toBeTruthy();

        // if in #/login , --> Not in #/projects
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');

        user = register.generateUser(true);

        register.inputDay.clear().sendKeys(user.day);
        register.inputMonth.clear().sendKeys(user.month);
        register.inputYear.clear().sendKeys(user.year);
        //Create user account without only day
        register.createAccount(user.username, user.userEmail, user.password, '', user.month, user.year, false, false, user.tutorName, user.tutorSurname, user.tutorEmail);
        expect(register.showNoBirthdate.isDisplayed()).toBeTruthy();

        //Create user account without only month
        register.createAccount(user.username, user.userEmail, user.password, user.day, '', user.year, false, false, user.tutorName, user.tutorSurname, user.tutorEmail);
        expect(register.showNoBirthdate.isDisplayed()).toBeTruthy();

        //Create user account without only year
        register.createAccount(user.username, user.userEmail, user.password, user.day, user.month, '', false, false, user.tutorName, user.tutorSurname, user.tutorEmail);
        expect(register.showNoBirthdate.isDisplayed()).toBeTruthy();

        register.createAccount(user.username, user.userEmail, user.password, '', '', '', false, false, user.tutorName, user.tutorSurname, user.tutorEmail);
        expect(register.showNoBirthdate.isDisplayed()).toBeTruthy();

        // if in #/login , --> Not in #/projects
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');

    });

    it('bbb-13:register:validate DATE OF BIRTH BEFORE 14 YEARS 14 - DATENOW ', function() {

        landing.enterButton.click();

        //Go to create account form
        register.createAccountButtn.click();

        var user = register.generateUser(true);
        register.createAccount(user.username, user.userEmail, user.password, user.day, user.month, user.year, false, true, user.tutorName, user.tutorSurname, user.tutorEmail);

        // if in #/login , --> Not in #/projects
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/projects/myprojects?page=1');
    });

    it('bbb-14:register:Check that a checkbox appears to indicate that you are a teacher', function() {
        landing.enterButton.click();
        register.createAccountButtn.click();

        var user = register.generateUser(false);
        //Register with user in use and check newsleettter
        register.createAccount(user.username, user.userEmail, user.password, user.day, user.month, user.year, true, true);
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/projects/myprojects?page=1');
        login.logout();
        login.get();
        register.createAccountButtn.click();
        user = register.generateUser(true);
        register.createAccount(user.username, user.userEmail, user.password, user.day, user.month, user.year, true, true, user.tutorName, user.tutorSurname, user.tutorEmail);
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/projects/myprojects?page=1');
        login.logout();

    });



    it('bbb-15:register:Check that link recovery password only use one time', function() {

        //check bloqsproject
        var browserEmail = browser.forkNewDriverInstance();
        browserEmail.ignoreSynchronization = true;

        register.getExternalProviderEmail(browserEmail).then(function(value) {
            var email = value,
                newUser = register.generateUser();
            browserEmail.ignoreSynchronization = false;

            register.get();
            register.createAccount(newUser.username, email, newUser.password, newUser.day, newUser.month, newUser.year, true, true);
            browser.sleep('3000');
            login.logout();
            login.get();
            login.user.sendKeys(email);
            login.forgotPasswordButton.click();
            login.emailToSendInput.sendKeys(email);
            login.emailToSendButton.click();

            browser.sleep('9000');

            browserEmail.ignoreSynchronization = true;

            var $2 = browserEmail.$;
            globalFunctions.scrollBottomPage(browserEmail).then(function() {
                $2('#msg_1 > td:nth-child(2)').click();
                //Open popup email send
                browserEmail.sleep(5000);
                $2('#modalMessage > div.modal-body > a').click();
                //#modalMessage > div.modal-body > a

                //Other tab
                browserEmail.ignoreSynchronization = false;
                //News passwords
                $2(register.resetPasswordMainInput.elementArrayFinder_.locator_.value).sendKeys('123456');
                $2(register.resetPasswordRepeatInput.elementArrayFinder_.locator_.value).sendKeys('123456');
                $2(register.resetPasswordOkButton.elementArrayFinder_.locator_.value).click();
                browser.sleep(vars.timeToWaitAutoSave);

                browserEmail.navigate().back();
                browserEmail.navigate().back();
                //Return and open link recovery again
                browserEmail.ignoreSynchronization = true;

                $2('#msg_1 > td:nth-child(2)').click();
                browserEmail.sleep(5000);
                //Open popup email send
                $2('#modalMessage > div.modal-body > a').click();
                //Other tab


                browserEmail.ignoreSynchronization = false;
                browser.sleep('2000');
                $2(register.resetPasswordMainInput.elementArrayFinder_.locator_.value).sendKeys('abcdef');
                $2(register.resetPasswordRepeatInput.elementArrayFinder_.locator_.value).sendKeys('abcdef');
                $2(register.resetPasswordOkButton.elementArrayFinder_.locator_.value).click();
                browser.sleep(vars.timeToWaitAutoSave);

                //Check toast no reset password
                globalFunctions.navigatorLanguage()
                    .then(function(language) {
                        if (language === 'es') {
                            expect($2(commons.alertTextToast.elementArrayFinder_.locator_.value).getText()).toMatch(alerts.textResetPasswordNewLink);
                        } else {
                            expect($2(commons.alertTextToast.elementArrayFinder_.locator_.value).getText()).toMatch(alerts.textResetPasswordNewLinkEN);
                        }
                    });

                commons.clickAlertCloseToast($2(commons.alertCloseToast.elementArrayFinder_.locator_.value));

                //Check that not login (no change password)
                login.get();
                login.loginFail(newUser.username, 'abcdef');

            });

        });

    });

    it('bbb-16:register:The date is incorrect', function() {
        landing.enterButton.click();

        //Go to create account form
        register.createAccountButtn.click();

        var user = register.generateUser(false);
        //Register with user in use
        register.createAccount(user.username, user.userEmail, user.password, 32, 3, 1986, false, true);
        expect(register.showValidBirthdate.isDisplayed()).toBeTruthy();
        register.createAccount(user.username, user.userEmail, user.password, 31, 13, 1986, false, false);
        expect(register.showValidBirthdate.isDisplayed()).toBeTruthy();
        register.createAccount(user.username, user.userEmail, user.password, 31, 12, 100, false, false);
        expect(register.showValidBirthdate.isDisplayed()).toBeTruthy();
    });

    it('bbb-17:register:Remember the password - EMAIL DOESNT EXIST', function() {
        var email = 'fakeemail@fake.fake';
        login.get();
        login.user.sendKeys(email);
        login.forgotPasswordButton.click();
        login.emailToSendInput.sendKeys(email);
        login.emailToSendButton.click();
        expect(login.showEmailNotExist.isDisplayed()).toBeTruthy();
    });

    it('bbb-18:register:Remember the password - EMAIL INCORRECT', function() {
        var email = 'emailincorrect';
        login.get();
        login.user.sendKeys(email);
        login.forgotPasswordButton.click();
        login.emailToSendInput.sendKeys(email);
        login.emailToSendButton.click();
        expect(login.showEmailIncorrect.isDisplayed()).toBeTruthy();
    });

    it('bbb-355:register:the tutor email match to student email', function() {

        landing.enterButton.click();

        //Go to create account form
        register.createAccountButtn.click();

        var user = register.generateUser(true);
        register.createAccount(user.username, user.userEmail, user.password, user.day, user.month, user.year, false, true, user.tutorName, user.tutorSurname, user.userEmail);
        expect(register.showSameEmail.isDisplayed()).toBeTruthy();
        // if in #/login , --> Not in #/projects
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');
    });

    it('bbb-356:register:Register without tutor email', function() {

        landing.enterButton.click();

        //Go to create account form
        register.createAccountButtn.click();

        var user = register.generateUser(true);
        register.createAccount(user.username, user.userEmail, user.password, user.day, user.month, user.year, false, true, user.tutorName, user.tutorSurname, '');
        expect(register.showNoTutorEmail.isDisplayed()).toBeTruthy();
        // if in #/login , --> Not in #/projects
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');
    });

    it('bbb-357:register:Register with incorrect tutor email', function() {

        landing.enterButton.click();

        //Go to create account form
        register.createAccountButtn.click();

        var user = register.generateUser(true);
        register.createAccount(user.username, user.userEmail, user.password, user.day, user.month, user.year, false, true, user.tutorName, user.tutorSurname, 'aaaaaaaaaaaaaaaaaaaaaaa.es');
        expect(register.showInvalidTutorEmail.isDisplayed()).toBeTruthy();
        // if in #/login , --> Not in #/projects
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');
    });

    it('bbb-358:register:Register without tutor name', function() {

        landing.enterButton.click();

        //Go to create account form
        register.createAccountButtn.click();

        var user = register.generateUser(true);
        register.createAccount(user.username, user.userEmail, user.password, user.day, user.month, user.year, false, true, '', user.tutorSurname, user.tutorEmail);
        expect(register.showNoNametutor.isDisplayed()).toBeTruthy();
        // if in #/login , --> Not in #/projects
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');
    });

    it('bbb-359:register:Register without tutor surname', function() {

        landing.enterButton.click();

        //Go to create account form
        register.createAccountButtn.click();

        var user = register.generateUser(true);
        register.createAccount(user.username, user.userEmail, user.password, user.day, user.month, user.year, false, true, user.tutorName, '', user.tutorEmail);
        expect(register.showNoSurnametutor.isDisplayed()).toBeTruthy();
        // if in #/login , --> Not in #/projects
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');
    });

    it('bbb-362:register:The legal tutor doesnt accept', function() {
        //check bloqsproject
        var browserEmail = browser.forkNewDriverInstance();

        browserEmail.ignoreSynchronization = true;

        register.getExternalProviderEmail(browserEmail).then(function(value) {
            var email = value,
                newUser = register.generateUser(true);
            browserEmail.ignoreSynchronization = false;

            register.get();
            register.createAccount(newUser.username, newUser.userEmail, newUser.password, newUser.day, newUser.month, newUser.year, true, true,
            'tutorName','tutorSurname',email);
            browser.sleep('3000');
            login.logout();

            browserEmail.ignoreSynchronization = true;

            var $2 = browserEmail.$;
            globalFunctions.scrollBottomPage(browserEmail).then(function() {
                browserEmail.sleep(3000);
                $2('#msg_1 > td:nth-child(2)').click();
                //Open popup email send
                browserEmail.sleep(5000);
                $2('#modalMessage > div.modal-body > a').click();
                //#modalMessage > div.modal-body > a
                browserEmail.ignoreSynchronization = false;

                $2(cookies.cookiesBar.elementArrayFinder_.locator_.value).click();
                $2('div > button[name="cancelform"]').click();

                browserEmail.ignoreSynchronization = true;
                browserEmail.sleep(vars.timeToWaitAlert);
                expect($2(commons.alertTextToast.elementArrayFinder_.locator_.value).isDisplayed()).toBe(true);
                expect($2(commons.alertTextToast.elementArrayFinder_.locator_.value).getText()).toMatch(alerts.alertTextAuthorizationDenied);
                browserEmail.ignoreSynchronization = false;
                login.get();
                login.loginFail(newUser.username, newUser.password);

            });

        });
    });

    it('bbb-363:register:The legal tutor accept', function() {
        //check bloqsproject
        var browserEmail = browser.forkNewDriverInstance(),
        userName,
        userLastName,
        dniTutor;

        browserEmail.ignoreSynchronization = true;

        register.getExternalProviderEmail(browserEmail).then(function(value) {
            var email = value,
                newUser = register.generateUser(true);
            browserEmail.ignoreSynchronization = false;

            register.get();
            register.createAccount(newUser.username, newUser.userEmail, newUser.password, newUser.day, newUser.month, newUser.year, true, true,
            'tutorName','tutorSurname',email);
            browser.sleep('3000');
            login.logout();

            browserEmail.ignoreSynchronization = true;

            var $2 = browserEmail.$;
            globalFunctions.scrollBottomPage(browserEmail).then(function() {
                browserEmail.sleep(3000);
                $2('#msg_1 > td:nth-child(2)').click();
                //Open popup email send
                browserEmail.sleep(5000);
                $2('#modalMessage > div.modal-body > a').click();
                //#modalMessage > div.modal-body > a

                //Other tab
                browserEmail.ignoreSynchronization = false;
                userName='Pepito';
                userLastName='Grillo';
                dniTutor='45454545A';
                $2(cookies.cookiesBar.elementArrayFinder_.locator_.value).click();
                $2(register.under14Name.elementArrayFinder_.locator_.value).sendKeys(userName);
                $2(register.under14Lastname.elementArrayFinder_.locator_.value).sendKeys(userLastName);
                $2(register.under14TutorDni.elementArrayFinder_.locator_.value).sendKeys(dniTutor);
                $2('input.btn').click();

                browserEmail.ignoreSynchronization = true;
                browserEmail.sleep(vars.timeToWaitAlert);
                expect($2(commons.alertTextToast.elementArrayFinder_.locator_.value).isDisplayed()).toBe(true);
                expect($2(commons.alertTextToast.elementArrayFinder_.locator_.value).getText()).toMatch(alerts.alertTextAuthorization);
                browserEmail.ignoreSynchronization = false;

                //Check that not login (no change password)
                login.get();
                login.login({'user': newUser.username, 'password': newUser.password});
                account.get();
                expect(account.firstname.getAttribute('value')).toEqual(userName);
                expect(account.lastname.getAttribute('value')).toEqual(userLastName);
                login.logout();
            });

        });
    });
});
