/**
 * Local Spec to login
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

globalFunctions.xmlReport('loginLocal');
describe('Login, specs only in local ', function() {

  //beforeEach commons
  globalFunctions.beforeTest();

  // afterEach commons
  globalFunctions.afterTest();

    // be careful, saucelabs no stopped !!
    xit('bba-107:Login with a Google account', function() {

        landing.get();
        landing.openLandingMenu.click();
        landing.enterButton.click();

        login.loginGoogle(vars.account('google').user, vars.account('google').password);

        // if in #/login , --> Not in #/projects
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/projects');

        login.logout();

    });

    it('bba-108:Login with a Facebook account', function() {

        landing.openLandingMenu.click();
        landing.enterButton.click();

        //Login in bitbloq with facebook
        login.loginFb(vars.account('facebook').email, vars.account('facebook').password);


        // if ok go to #/projects
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/projects');

        login.logout();

    });

});
