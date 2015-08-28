/**
 *
 * Global variables
 *
 */


'use strict';

var Commons = require('./commons.po.js');
var commons = new Commons();
var Variables = function() {
    //count for login
    this.user = 'luisangonzalez';
    this.password = '123456';

    //count google for login
    this.userGoogle = 'test2bitbloq@gmail.com';
    this.passwordGoogle = 'test2015bitbloq';

    //count facebook for login
    this.emailFb = 'webpruebas.2@gmail.com';
    this.passwordFb = 'webpruebas.2webpruebas.2';
    this.userFb = 'Paco';

    //timers
    this.timeToWaitFadeModals = 5000;
    this.timeToWaitAutoSave = 5000;
    this.timeToWaitTab = 3000;

    this.account = function(cuenta) {
        if (cuenta === 'google') {
            return {
                user: this.userGoogle,
                password: this.passwordGoogle
            };

        } else if (cuenta === 'facebook') {
            return {
                email: this.emailFb,
                password: this.passwordFb,
                user: this.userFb
            };
        } else if (cuenta === 'bitbloq') {
            return {
                user: this.user,
                password: this.password
            };
        } else {
            throw 'NOT IS VALID ACCOUNT';
        }
    };

    //BeforeEach commons
    this.beforeTest = function() {
        beforeEach(function() {

            browser.manage().window().setSize(1024, 768);
            browser.get(browser.baseUrl);
            browser.waitForAngular();

            // Tu y yo lo sabemos
            commons.cookiesBar.click();
            browser.sleep(1000);


        });
    };
    
    this.afterTest = function() {
        afterEach(function() {
            browser.executeScript('window.sessionStorage.clear();');
            browser.executeScript('window.localStorage.clear();');
            browser.manage().deleteAllCookies();
        });
    };

};


module.exports = Variables;
