/**
 * Commons Spec to login
 */

'use strict';

var LoginSpec = function() {

    var Login = require('./login.po.js'),
        Landing = require('../landing/landing.po.js'),
        Variables = require('../commons/variables.js');


    var login = new Login(),
        landing = new Landing(),
        vars = new Variables();

    describe('Login ', function() {

        //beforeEach commons
        vars.beforeTest();

        it('Login with a basic account', function() {
            login.loginWithRandomUser();
            login.logout();
        });


        it('Cant login with a non registered user', function() {

            landing.openLandingMenu.click();
            landing.enterButton.click();


            login.user.sendKeys('NO USER');
            login.password.sendKeys('asdf');
            login.loginButton.click();

            // if in #/login , --> Not in #/projects
            expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');

        });


        it('is show "Introduce un nombre de usuario o e-mail" ?', function() {

            landing.openLandingMenu.click();
            landing.enterButton.click();

            //Login in bitbloq without user
            login.password.sendKeys(vars.account('bitbloq').password);
            login.loginButton.click();

            //Wait show error
            expect(login.showNoUserAndEmail.isDisplayed()).toBeTruthy();

            // if in #/login , --> Not in #/projects
            expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');


        });

        it('is show "Introduce una contraseña" ?', function() {

            landing.openLandingMenu.click();
            landing.enterButton.click();

            //Login in bitbloq without password
            login.user.sendKeys(vars.account('bitbloq').user);
            login.password.sendKeys('');
            login.loginButton.click();

            //Wait show error
            expect(login.showNoPass.isDisplayed()).toBeTruthy();

            // if in #/login , --> Not in #/projects
            expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');


        });

        it('is show "La contraseña debe tener 6 caracteres como mínimo" ?', function() {

            landing.openLandingMenu.click();
            landing.enterButton.click();

            //Login in bitbloq without password
            login.user.sendKeys(vars.account('bitbloq').user);
            login.password.sendKeys('69');
            login.loginButton.click();

            //Wait show error
            expect(login.showMoreSixPass.isDisplayed()).toBeTruthy();

            // if in #/login , --> Not in #/projects
            expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');


        });

        it('is show "El usuario no está registrado" ?', function() {

            landing.openLandingMenu.click();
            landing.enterButton.click();

            //Login in bitbloq without password
            login.user.sendKeys('User'+ Number(new Date()));
            login.password.sendKeys('123456789');
            login.loginButton.click();
            //Wait show error
            expect(login.showIncorrectUser.isDisplayed()).toBeTruthy();

            // if in #/login , --> Not in #/projects
            expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');
        });

        it('is show "La contraseña es incorrecta" ?', function() {

            landing.openLandingMenu.click();
            landing.enterButton.click();
            var username = 'User'+ Number(new Date());
            login.loginWithUserName(username);
            login.logout();

            //Login in bitbloq without password
            landing.openLandingMenu.click();
            landing.enterButton.click();
            login.user.sendKeys(username);
            login.password.sendKeys(Number(new Date()));
            login.loginButton.click();
            //Wait show error
            expect(login.showIncorrectPass.isDisplayed()).toBeTruthy();

            // if in #/login , --> Not in #/projects
            expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');
        });
    });


};


module.exports = new LoginSpec();
