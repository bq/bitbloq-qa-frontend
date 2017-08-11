/**
 *Page object common objects
 */
'use strict';

var Variables = require('../commons/variables.js'),
    vars = new Variables();

var Commons = function() {
    //TOAST
    this.editToast = $('[data-id="edit-project"]');
    this.toastCenterSavedData = $('[data-id="saved-user"]');
    this.alertTextToast = $('[data-element="alert-text-toast"]');
    this.alertCloseToast = $('[data-element="alert-close-toast"]');
    this.alertSvgIcon = $('[data-element="alert-svg-icon"]');
    this.alertUndoButton = $('[data-element="alert-undo-button"]');

    this.expectToastTimeOut = function(alertElement) {
        browser.ignoreSynchronization = true;
        browser.sleep(1000);
        expect(alertElement.isDisplayed()).toBe(true);
        browser.ignoreSynchronization = false;
    };

    this.expectToastTimeOutandText = function(options) {
        options = options || {};
        options.alertElement = options.alertElement || this.alertTextToast;

        browser.ignoreSynchronization = true;
        browser.sleep(vars.timeToWaitAlert);
        expect(options.alertElement.isDisplayed()).toBe(true);
        expect(options.alertElement.getText()).toMatch(options.text);
        browser.ignoreSynchronization = false;
    };

    this.clickAlertUndoToast = function() {
        browser.ignoreSynchronization = true;
        browser.sleep(2000);
        this.alertUndoButton.click();
        browser.ignoreSynchronization = false;
    };

    this.clickAlertCloseToast = function(alertElement) {
        var toast = alertElement || this.alertCloseToast;
        browser.ignoreSynchronization = true;
        browser.sleep(2000);
        toast.click();
        browser.ignoreSynchronization = false;
    };

};

module.exports = Commons;