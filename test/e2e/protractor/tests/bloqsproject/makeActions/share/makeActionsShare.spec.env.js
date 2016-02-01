/**
 * Spec to makeActionsHelp.spec.js
 * Menu Share of makeActions
 */

'use strict';

var GlobalFunctions = require('../../../commons/globalFunctions.js'),
    MakeActions = require('../makeActions.po.js'),
    Make = require('../../make.po.js'),
    Modals = require('../../../modals/modals.po.js'),
    SocialNetwork = require('./socialNetwork.po.js'),
    Variables = require('../../../commons/variables.js'),
    Login = require('../../../login/login.po.js');

var globalFunctions = new GlobalFunctions(),
    makeActions = new MakeActions(),
    make = new Make(),
    modals = new Modals(),
    socialNetwork = new SocialNetwork(),
    vars = new Variables(),
    login = new Login();

globalFunctions.xmlReport('makeActionsShareEnv');
describe('Menu Share of MakeActions', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    //TODO test TOAST
    //Solo se puede jugar en un entorno
    it('bba-151:Publish project in social media (the project has already been published in Explora)', function() {

        //make.saveProjectAndPublishNewUser();
        make.saveProjectAndPublishNewUser().then(function() {
            browser.sleep(vars.timeToWaitMenu);
            browser.getCurrentUrl().then(function(url) {
                url = url.split('/');
                // makeActions.menuShare.click();
                // browser.sleep(vars.timeToWaitMenu);
                // makeActions.menuShareSocial.click();
                // browser.sleep(vars.timeToWaitMenu);
                // browser.ignoreSynchronization = true;
                // modals.gButton.click();
                // browser.sleep(vars.timeToWaitTab);
                // //Google+
                // browser.getAllWindowHandles().then(function(handles) {
                //     browser.switchTo().window(handles[1]);
                //     browser.sleep(vars.timeToWaitTab);
                //     login.googleUser.sendKeys(vars.userGoogle);
                //     browser.sleep(1000);
                //     login.googleNext.click();
                //     browser.sleep(1000);
                //     login.googlePassword.sendKeys(vars.passwordGoogle);
                //     browser.sleep(1000);
                //     login.googleEnter.click();
                //     browser.sleep(5000);
                //     // login.googleAprove.click();
                //     // browser.sleep(vars.timeToWaitTab);
                //     expect(socialNetwork.googleLink.getAttribute('href')).toMatch(url[url.length - 1]);
                //     browser.close().then(browser.switchTo().window(handles[0]));
                // });
                makeActions.menuShare.click();
                browser.sleep(vars.timeToWaitMenu);
                makeActions.menuShareSocial.click();
                browser.sleep(vars.timeToWaitMenu);
                browser.ignoreSynchronization = true;
                modals.twButton.click();
                browser.sleep(vars.timeToWaitTab);
                //Twitter
                browser.getAllWindowHandles().then(function(handles) {
                    browser.switchTo().window(handles[1]);
                    browser.sleep(vars.timeToWaitTab);
                    expect(socialNetwork.twitterLink.getText()).toMatch(url[url.length - 1]);
                    browser.close().then(browser.switchTo().window(handles[0]));
                    browser.sleep(vars.timeToWaitTab);
                });
                //short button
                makeActions.menuShare.click();
                browser.sleep(vars.timeToWaitMenu);
                makeActions.menuShareSocial.click().then(function() {
                    browser.sleep(vars.timeToWaitMenu);
                    modals.shortText.getAttribute('value').then(function(text) {
                        expect(text).toMatch('http://goo.gl');
                        modals.shortButton.click().then(function() {
                            login.logout();
                            browser.get(text);
                            browser.sleep(vars.timeToWaitTab);
                            browser.getCurrentUrl().then(function(urlNow) {
                                expect(urlNow).toMatch(url[url.length - 1]);
                            });
                        });
                    });
                    browser.ignoreSynchronization = false;
                });
            });

        });

    });
    //TODO test TOAST
    //Solo se puede jugar en un entorno

    it('bba-156:Publish project in social media (the project hasnt been published in Explora)', function() {

        //make.saveProjectAndPublishNewUser();
        make.saveProjectNewUser();
        browser.sleep(vars.timeToWaitMenu);
        browser.getCurrentUrl().then(function(url) {
            url = url.split('/');
            // makeActions.menuShare.click();
            // browser.sleep(vars.timeToWaitMenu);
            // makeActions.menuShareSocial.click();
            // browser.sleep(vars.timeToWaitMenu);
            // browser.ignoreSynchronization = true;
            // modals.gButton.click();
            // browser.sleep(vars.timeToWaitTab);
            // //Google+
            // browser.getAllWindowHandles().then(function(handles) {
            //     browser.switchTo().window(handles[1]);
            //     browser.sleep(vars.timeToWaitTab);
            //     login.googleUser.isPresent().then(function(displayed) {
            //         if (displayed) {
            //           login.googleUser.sendKeys(vars.userGoogle);
            //           browser.sleep(1000);
            //           login.googleNext.click();
            //           browser.sleep(1000);
            //           login.googlePassword.sendKeys(vars.passwordGoogle);
            //           browser.sleep(1000);
            //           login.googleEnter.click();
            //           browser.sleep(5000);
            //         }
            //
            //     });
            //
            //     // login.googleAprove.click();
            //     // browser.sleep(vars.timeToWaitTab);
            //     expect(socialNetwork.googleLink.getAttribute('href')).toMatch(url[url.length - 1]);
            //     browser.close().then(browser.switchTo().window(handles[0]));
            // });
            // makeActions.menuShare.click();
            // browser.sleep(vars.timeToWaitMenu);
            // makeActions.menuSharePrivate.click();
            // browser.sleep(vars.timeToWaitMenu);
            // makeActions.privateButton.click();
            // browser.sleep(vars.timeToWaitMenu);
            makeActions.menuShare.click();
            browser.sleep(vars.timeToWaitMenu);
            makeActions.menuShareSocial.click();
            browser.sleep(vars.timeToWaitMenu);
            browser.ignoreSynchronization = true;
            modals.twButton.click();
            browser.sleep(vars.timeToWaitTab);
            //Twitter
            browser.getAllWindowHandles().then(function(handles) {
                browser.switchTo().window(handles[1]);
                browser.sleep(vars.timeToWaitTab);
                expect(socialNetwork.twitterLink.getText()).toMatch(url[url.length - 1]);
                browser.close().then(browser.switchTo().window(handles[0]));
                browser.sleep(vars.timeToWaitTab);
            });
            makeActions.menuShare.click();
            browser.sleep(vars.timeToWaitMenu);
            makeActions.menuSharePrivate.click();
            browser.sleep(vars.timeToWaitMenu);
            makeActions.privateButton.click();
            browser.sleep(vars.timeToWaitMenu);
            //short button
            makeActions.menuShare.click();
            browser.sleep(vars.timeToWaitMenu);
            makeActions.menuShareSocial.click().then(function() {
                browser.sleep(vars.timeToWaitMenu);
                modals.shortText.getAttribute('value').then(function(text) {
                    expect(text).toMatch('http://goo.gl');
                    modals.shortButton.click().then(function() {
                        browser.sleep(vars.timeToWaitMenu);
                        modals.bladeClose.click();
                        browser.sleep(vars.timeToWaitFadeModals);
                        login.logout();
                        browser.ignoreSynchronization = false;
                        browser.get(text);
                        browser.sleep(vars.timeToWaitTab);
                        expect(browser.getCurrentUrl()).toMatch(url[url.length - 1]);
                    });

                });

            });

        });

    });

});
