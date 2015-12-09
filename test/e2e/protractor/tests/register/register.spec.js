/**
 *Spec to login
 */

'use strict';

var Register = require('./register.po.js'),
    Variables = require('../commons/variables.js'),
    GlobalFunctions = require('../commons/globalFunctions.js'),
    Landing = require('../landing/landing.po.js'),
    Login = require('../login/login.po.js'),
    Modals = require('../modals/modals.po.js'),
    Commons = require('../commons/commons.po.js');

var register = new Register(),
    vars = new Variables(),
    globalFunctions = new GlobalFunctions(),
    landing = new Landing(),
    login = new Login(),
    modals = new Modals(),
    commons = new Commons();

globalFunctions.xmlReport('Register');

describe('Register ', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

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

        register.createAccount(user.username, 'a' + user.userEmail, user.password, 31, 3, 1986, true, true);

        // Only show if user is in use
        expect(register.showInUse.isDisplayed()).toBeTruthy();

        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');

        login.get();

        register.createAccountButtn.click();

        register.createAccount(user.username.toUpperCase(), 'a' + user.userEmail, user.password, 31, 3, 1986, true, true);

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
        registerDate.setDate(registerDate.getDate() + 1);

        var user = register.generateUser();
        register.createAccount(user.username, user.userEmail, user.password, registerDate.getDate(), registerDate.getMonth() + 1, registerDate.getFullYear(), false, true);
        expect(register.showNoFourteen.isDisplayed()).toBeTruthy();

        // if in #/login , --> Not in #/projects
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');
    });

    it('bba-21:The email is duplicated', function() {
        landing.openLandingMenu.click();
        landing.enterButton.click();

        //Go to create account form
        register.createAccountButtn.click();

        var user = register.generateUser();
        //Register with user in use
        register.createAccount(user.username, user.userEmail, user.password, 31, 3, 1986, false, true);
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/projects');
        login.logout();
        login.get();
        register.createAccountButtn.click();
        register.createAccount(user.username + 'a', user.userEmail, user.password, 31, 3, 1986, false, true);

        // Only show if user is in use
        expect(register.showEmailDuplicate.isDisplayed()).toBeTruthy();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');

    });

    it('bba-35:Check that links to legal documents work', function() {

        //landing.openLandingMenu.click();
        var cookies = '#/cookies',
            terms = '#/terms',
            script = landing.landingPage + '.scrollTo(0,5000);';

        browser.executeScript(script).then(function() {

            landing.cookiesButton.click();
            expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + cookies);

            landing.get();
            browser.executeScript(script).then(function() {
                landing.termsButton.click();
                expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + terms);
            });

        });
    });

    it('bba-183:check if NO login go to mailto in landing (link "contacto")', function() {

        //landing.openLandingMenu.click();
        var script = landing.landingPage + '.scrollTo(0,6000);';
        browser.sleep(5000); //Time to wait load explora project on landing (not wait angular)
        browser.executeScript(script).then(function() {
            expect(landing.contactButton.getAttribute('href')).toMatch(vars.supportEmailES);
        });
    });

    it('bba-182:check if is login show modal feedback in landing (link "contacto")', function() {

        //landing.openLandingMenu.click();
        var script = landing.landingPage + '.scrollTo(0,2000);';

        login.loginWithRandomUser();
        landing.get();
        browser.sleep(5000); //Time to wait load explora project on landing (not wait angular)

        browser.executeScript(script).then(function() {
            expect(landing.contactButton.getAttribute('href')).not.toMatch(vars.supportEmailES);

            landing.contactButton.click();
            browser.sleep(vars.timeToWaitFadeModals);
            expect(modals.modalTitle.getText()).toEqual(vars.sendCommentsLiteral);

            modals.bladeClose.click();
            browser.sleep(vars.timeToWaitFadeModals);

            login.logout();

        });

    });

    it('bba-184:Check that a checkbox appears to indicate that you are a teacher', function() {
        landing.openLandingMenu.click();
        landing.enterButton.click();
        register.createAccountButtn.click();

        var user = register.generateUser();
        //Register with user in use and check newsleettter
        register.createAccount(user.username, user.userEmail, user.password, 31, 3, 1986, true, true);
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/projects');
        login.logout();
    });

    it('bba-23:Verify remember password email', function() {

        //check bloqsproject
        var browserEmail = browser.forkNewDriverInstance();
        browserEmail.ignoreSynchronization = true;

        var getExternalProviderEmail = function(driver) {
            var mailProvider = 'http://www.my10minutemail.com/',
                $2 = driver.$,
                email = $2('body > div.container-narrow > div.jumbotron > p');

            driver.get(mailProvider);
            driver.manage().window().setSize(1024, 768);

            return email.getText().then(function(value) {
                return value;
            });

        };

        getExternalProviderEmail(browserEmail).then(function(value) {
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
                browserEmail.getAllWindowHandles().then(
                    function(handles) {
                        //Switch to popup
                        browserEmail.switchTo().window(handles[1]);
                        browserEmail.ignoreSynchronization = false;
                        //News passwords
                        $2(register.resetPasswordMainInput.elementArrayFinder_.locator_.value).sendKeys('123456');
                        $2(register.resetPasswordRepeatInput.elementArrayFinder_.locator_.value).sendKeys('123456');
                        $2(register.resetPasswordOkButton.elementArrayFinder_.locator_.value).click();
                        browser.sleep(vars.timeToWaitAutoSave);
                        //go back to the main window && login wiht new passwords
                        login.get();
                        login.login(newUser.username, '123456');
                        login.logout();
                    });
            });
        });

    });

    it('bba-228:Check that link recovery password only use one time', function() {

        //check bloqsproject
        var browserEmail = browser.forkNewDriverInstance();
        browserEmail.ignoreSynchronization = true;

        var getExternalProviderEmail = function(driver) {
            var mailProvider = 'http://www.my10minutemail.com/',
                $2 = driver.$,
                email = $2('body > div.container-narrow > div.jumbotron > p');

            driver.get(mailProvider);
            driver.manage().window().setSize(1024, 768);

            return email.getText().then(function(value) {
                return value;
            });

        };

        getExternalProviderEmail(browserEmail).then(function(value) {
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
                browserEmail.getAllWindowHandles().then(
                    function(handles) {
                        //Switch to popup
                        browserEmail.switchTo().window(handles[1]);
                        browserEmail.ignoreSynchronization = false;
                        //News passwords
                        $2(register.resetPasswordMainInput.elementArrayFinder_.locator_.value).sendKeys('123456');
                        $2(register.resetPasswordRepeatInput.elementArrayFinder_.locator_.value).sendKeys('123456');
                        $2(register.resetPasswordOkButton.elementArrayFinder_.locator_.value).click();
                        browser.sleep(vars.timeToWaitAutoSave);

                        //Return and open link recovery again
                        browserEmail.switchTo().window(handles[0]);
                        browserEmail.ignoreSynchronization = true;

                        $2('#msg_1 > td:nth-child(2)').click();
                        browserEmail.sleep(5000);
                        //Open popup email send
                        $2('#modalMessage > div.modal-body > a').click();
                        //Other tab
                        browserEmail.getAllWindowHandles().then(
                            function(handles) {
                                //Switch to popup
                                browserEmail.switchTo().window(handles[2]);

                                browserEmail.ignoreSynchronization = false;
                                browser.sleep('2000');
                                $2(register.resetPasswordMainInput.elementArrayFinder_.locator_.value).sendKeys('abcdef');
                                $2(register.resetPasswordRepeatInput.elementArrayFinder_.locator_.value).sendKeys('abcdef');
                                $2(register.resetPasswordOkButton.elementArrayFinder_.locator_.value).click();
                                browser.sleep(vars.timeToWaitAutoSave);

                                //Check toast no reset password
                                expect($2(commons.alertTextToast.elementArrayFinder_.locator_.value).getText()).toMatch(vars.toastResetPasswordNewLink);
                                commons.clickAlertCloseToast($2(commons.alertCloseToast.elementArrayFinder_.locator_.value));

                                //Check that not login (no change password)
                                login.get();
                                login.loginFail(newUser.username, 'abcdef');

                            });

                    });
            });
        });

    });

});
