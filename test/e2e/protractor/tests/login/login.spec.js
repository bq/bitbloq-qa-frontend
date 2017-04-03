/**
 * Commons Spec to login
 */

'use strict';

var Login = require('./login.po.js'),
   Landing = require('../landing/landing.po.js'),
   Variables = require('../commons/variables.js'),
   GlobalFunctions = require('../commons/globalFunctions.js');


var login = new Login(),
   landing = new Landing(),
   vars = new Variables(),
   globalFunctions = new GlobalFunctions();

globalFunctions.xmlReport('login');

describe('Login ', function() {
   //beforeEach commons
   globalFunctions.beforeTest();

   // afterEach commons
   globalFunctions.afterTest();

   it('bbb-257:login:Login with a basic account', function() {
      login.loginWithRandomUser();
      login.logout();
   });


   it('bbb-258:login:Cant login with a non registered user', function() {

      landing.enterButton.click();

      login.user.sendKeys('NO USER');
      login.password.sendKeys('asdf');
      login.loginButton.click();

      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');

   });


   it('bbb-259:login:is show "Introduce un nombre de usuario o e-mail" ?', function() {

      landing.enterButton.click();

      //Login in bitbloq without user
      login.password.sendKeys(vars.account('bitbloq').password);
      login.loginButton.click();

      //Wait show error
      expect(login.showNoUserAndEmail.isDisplayed()).toBeTruthy();

      // if in #/login , --> Not in #/projects
      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');


   });

   it('bbb-260:login:is show "Introduce una contraseña" ?', function() {

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

   it('bbb-261:login:is show "La contraseña debe tener 6 caracteres como mínimo" ?', function() {

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

   it('bbb-262:login:is show "El usuario no está registrado" ?', function() {

      landing.enterButton.click();
      //Login in bitbloq with false  password
      login.user.sendKeys('User' + Number(new Date()));
      login.password.sendKeys('123456789');
      login.loginButton.click();
      //Wait show error
      expect(login.showIncorrectUser.isDisplayed()).toBeTruthy();
      // if in #/login , --> Not in #/projects
      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');
   });

   it('bbb-263:login:is show "La contraseña es incorrecta" ?', function() {

      //Register && login and save username
      landing.enterButton.click();
      var username = 'User' + Number(new Date());
      login.loginWithUserName(username);
      login.logout();

      //Login in bitbloq with last username with incorrect password
      landing.enterButton.click();
      login.user.sendKeys(username);
      login.password.sendKeys(Number(new Date()));
      login.loginButton.click();
      //Wait show error
      expect(login.showIncorrectPass.isDisplayed()).toBeTruthy();

      // if in #/login , --> Not in #/projects
      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');
   });

   it('bbb-266:login:Check show user not register if email is not register', function() {

       login.get();
       login.forgotPasswordButton.click();
       login.emailToSendInput.sendKeys('userTest' + Number(new Date()) + '@devfakebq.es');
       login.emailToSendButton.click();
       expect(login.showEmailNotExist.isDisplayed()).toBeTruthy();

   });
});
