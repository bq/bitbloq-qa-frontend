/**
 *Spec to cookiesBar
 */

'use strict';

var CookiesBar = require('./cookiesBar.po.js'),
    GlobalFunctions = require('../commons/globalFunctions.js'),
    Variables = require('../commons/variables.js'),
    Make = require('../bloqsproject/make.po.js'),
    Modals = require('../modals/modals.po.js'),
    Landing = require('../landing/landing.po.js'),
    Explore = require('../explore/explore.po.js'),
    Codeproject = require('../codeproject/codeproject.po.js'),
    Help = require('../help/help.po.js'),
    Login = require('../login/login.po.js');

var cookiesBar = new CookiesBar(),
    globalFunctions = new GlobalFunctions(),
    vars = new Variables(),
    make = new Make(),
    modals = new Modals(),
    landing = new Landing(),
    explore = new Explore(),
    codeproject = new Codeproject(),
    help = new Help(),
    login = new Login();

globalFunctions.xmlReport('cookiesBar');

describe('Test CookiesBar', function() {

    /* No globalFunctions.beforeTest because is necessary check close cookies bar for each check.
     *
     * In this test is necessary open diferent browser (new instances --> new session --> differents cookies)
     * to check open or not open CookiesBar
     *
     * No expect in this test because testing is click in cookies bar, if no click no cookies bar and throw error
     *
     * Info some browser in same test:
     * https://github.com/angular/protractor/blob/master/docs/browser-setup.md#using-multiple-browsers-in-the-same-test
     *
     */

    it('bba-125:cookiesBar:Check cookies bar shows any page if not login user', function() {

        //check landing
        browser.manage().window().setSize(1024, 768);
        browser.get(browser.baseUrl);
        browser.waitForAngular();
        cookiesBar.closeCookiesBar();
        //browser.close(); NO CLOSE SESSION, use this instance to create id project (make.saveProjectAndPublishNewUser())

        //check bloqsproject
        var browserBloqsPrjectUrl = browser.forkNewDriverInstance(),
            $2 = browserBloqsPrjectUrl.$;
        browserBloqsPrjectUrl.get(browser.baseUrl + make.url);
        browserBloqsPrjectUrl.manage().window().setSize(1024, 768);
        browserBloqsPrjectUrl.waitForAngular();
        $2(modals.attentionContinueGuest.elementArrayFinder_.locator_.value).click();
        $2(modals.rejectTourPO.elementArrayFinder_.locator_.value).click();
        browserBloqsPrjectUrl.sleep(vars.timeToWaitFadeModals);
        $2(cookiesBar.cookiesBar.elementArrayFinder_.locator_.value).click();
        browserBloqsPrjectUrl.close();

        //check explora
        var browserExplore = browser.forkNewDriverInstance();
        $2 = browserExplore.$;
        browserExplore.get(browser.baseUrl + explore.url);
        browserExplore.manage().window().setSize(1024, 768);
        browserExplore.waitForAngular();
        $2(cookiesBar.cookiesBar.elementArrayFinder_.locator_.value).click();
        browserExplore.close();

        //check codeproject
        var browserCodeproject = browser.forkNewDriverInstance();
        $2 = browserCodeproject.$;
        browserCodeproject.get(browser.baseUrl + codeproject.url);
        browserCodeproject.manage().window().setSize(1024, 768);
        browserCodeproject.waitForAngular();
        $2(cookiesBar.cookiesBar.elementArrayFinder_.locator_.value).click();
        browserCodeproject.close();

        //check help
        var browserHelp = browser.forkNewDriverInstance();
        $2 = browserHelp.$;
        browserHelp.get(browser.baseUrl + help.url);
        browserHelp.manage().window().setSize(1024, 768);
        browserHelp.waitForAngular();
        $2(cookiesBar.cookiesBar.elementArrayFinder_.locator_.value).click();
        browserHelp.close();

        //check bloqsproject/<id> && codeproject/<id>

        make.saveProjectAndPublishNewUser().then(function(project) {
            var browserBloqsProjectID = browser.forkNewDriverInstance();
            $2 = browserBloqsProjectID.$;
            browserBloqsProjectID.get(project.urlid);
            browserBloqsProjectID.manage().window().setSize(1024, 768);
            browserBloqsProjectID.waitForAngular();
            $2(cookiesBar.cookiesBar.elementArrayFinder_.locator_.value).click();
            browserBloqsProjectID.close();

            var browserCodeProjectID = browser.forkNewDriverInstance();
            $2 = browserCodeProjectID.$;
            browserCodeProjectID.get(project.urlid);
            browserCodeProjectID.manage().window().setSize(1024, 768);
            browserCodeProjectID.waitForAngular();
            $2(make.softwareTab.elementArrayFinder_.locator_.value).click();
            $2(make.codeTab.elementArrayFinder_.locator_.value).click();
            $2(cookiesBar.cookiesBar.elementArrayFinder_.locator_.value).click();
            browserCodeProjectID.close();
            login.logout();
            return true;
        });

        //browser.quit();

    });

    it('bba-126:cookiesBar:Check, If you close cookies bar it not appear again in other pages (in same session && no login user )', function() {

        //check landing
        var browserCheckCookiesNoLogin = browser.forkNewDriverInstance(),
            $2 = browserCheckCookiesNoLogin.$;
        browserCheckCookiesNoLogin.manage().window().setSize(1024, 768);
        browserCheckCookiesNoLogin.get(browser.baseUrl);
        browserCheckCookiesNoLogin.waitForAngular();

        expect($2(cookiesBar.cookiesBar.elementArrayFinder_.locator_.value).isDisplayed()).toBe(true);
        $2(cookiesBar.cookiesBar.elementArrayFinder_.locator_.value).click();
        expect($2(cookiesBar.cookiesBar.elementArrayFinder_.locator_.value).isDisplayed()).toBe(false);

        $2(landing.openLandingMenu.elementArrayFinder_.locator_.value).click();
        $2(landing.feauturesButton.elementArrayFinder_.locator_.value).click();
        expect($2(cookiesBar.cookiesBar.elementArrayFinder_.locator_.value).isDisplayed()).toBe(false);

        $2(landing.openLandingMenu.elementArrayFinder_.locator_.value).click();
        $2(landing.downloadsButton.elementArrayFinder_.locator_.value).click();
        expect($2(cookiesBar.cookiesBar.elementArrayFinder_.locator_.value).isDisplayed()).toBe(false);

        $2(landing.openLandingMenu.elementArrayFinder_.locator_.value).click();
        $2(landing.aboutusButton.elementArrayFinder_.locator_.value).click();
        expect($2(cookiesBar.cookiesBar.elementArrayFinder_.locator_.value).isDisplayed()).toBe(false);

        //bloqsproject
        browserCheckCookiesNoLogin.get(browser.baseUrl + make.url);
        expect($2(cookiesBar.cookiesBar.elementArrayFinder_.locator_.value).isDisplayed()).toBe(false);

        //codeproject
        browserCheckCookiesNoLogin.get(browser.baseUrl + codeproject.url);
        expect($2(cookiesBar.cookiesBar.elementArrayFinder_.locator_.value).isDisplayed()).toBe(false);

        //explore
        browserCheckCookiesNoLogin.get(browser.baseUrl + explore.url);
        expect($2(cookiesBar.cookiesBar.elementArrayFinder_.locator_.value).isDisplayed()).toBe(false);

        //help
        browserCheckCookiesNoLogin.get(browser.baseUrl + help.url);
        expect($2(cookiesBar.cookiesBar.elementArrayFinder_.locator_.value).isDisplayed()).toBe(false);

        browserCheckCookiesNoLogin.close();

    });

    it('bba-127:cookiesBar:Check, Login user accept cookies and never appear in other session', function() {

        /* Open browser with random user and close cookiesBar */

        //check landing
        browser.manage().window().setSize(1024, 768);
        browser.get(browser.baseUrl);
        browser.waitForAngular();
        //cookiesBar.closeCookiesBar(); //close before because is over register button
        var user = login.loginWithRandomUser();
        login.logout();

        /* Open new browser to close cookes after login  */
        var browserCloseCookiesLogin = browser.forkNewDriverInstance(),
            $3 = browserCloseCookiesLogin.$;
        browserCloseCookiesLogin.manage().window().setSize(1024, 768);
        browserCloseCookiesLogin.get(browser.baseUrl);
        browserCloseCookiesLogin.waitForAngular();
        //Login last user and close cookies bar
        browserCloseCookiesLogin.get(login.url);
        $3(login.user.elementArrayFinder_.locator_.value).sendKeys(user.user);
        $3(login.password.elementArrayFinder_.locator_.value).sendKeys(user.password);
        $3(login.loginButton.elementArrayFinder_.locator_.value).click();
        expect(browserCloseCookiesLogin.getCurrentUrl()).toMatch(browser.baseUrl + '#/projects');
        //Cookies are open
        expect($3(cookiesBar.cookiesBar.elementArrayFinder_.locator_.value).isDisplayed()).toBe(true);
        //Close cookies
        $3(cookiesBar.cookiesBar.elementArrayFinder_.locator_.value).click();
        //Cookies are closed
        expect($3(cookiesBar.cookiesBar.elementArrayFinder_.locator_.value).isDisplayed()).toBe(false);
        browserCloseCookiesLogin.close();

        /* Open new browser and login last user to check no show cookies bar*/

        var browserCheckCookiesLogin = browser.forkNewDriverInstance(),
            $2 = browserCheckCookiesLogin.$;
        browserCheckCookiesLogin.manage().window().setSize(1024, 768);
        browserCheckCookiesLogin.get(browser.baseUrl);
        browserCheckCookiesLogin.waitForAngular();

        //Login last user
        browserCheckCookiesLogin.get(login.url);
        $2(login.user.elementArrayFinder_.locator_.value).sendKeys(user.user);
        $2(login.password.elementArrayFinder_.locator_.value).sendKeys(user.password);
        $2(login.loginButton.elementArrayFinder_.locator_.value).click();
        expect(browserCheckCookiesLogin.getCurrentUrl()).toMatch(browser.baseUrl + '#/projects');
        //Check no show cookies bar
        expect($2(cookiesBar.cookiesBar.elementArrayFinder_.locator_.value).isDisplayed()).toBe(false);
        browserCheckCookiesLogin.close();

    });

    it('bba-132:cookiesBar:Verify link to "Politica de cookies" is ok', function() {

        //check landing
        var browserCheckCookiesURL = browser.forkNewDriverInstance(),
            $2 = browserCheckCookiesURL.$;
        browserCheckCookiesURL.manage().window().setSize(1024, 768);
        browserCheckCookiesURL.get(browser.baseUrl);
        browserCheckCookiesURL.waitForAngular();
        expect($2(cookiesBar.cookiesBarLink.elementArrayFinder_.locator_.value).getAttribute('href')).toEqual(browser.baseUrl + '#/cookies');

        browserCheckCookiesURL.close();
        browser.quit();
    });

});
