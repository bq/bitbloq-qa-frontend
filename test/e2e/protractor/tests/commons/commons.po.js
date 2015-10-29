/**
 *Page object common objects
 */
'use strict';

var Commons = function() {
    //TOAST
    this.editToast = $('[data-id="edit-project"]');
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

    this.clickAlertUndoToast = function() {
        browser.ignoreSynchronization = true;
        browser.sleep(2000);
        this.alertUndoButton.click();
        browser.ignoreSynchronization = false;
    };

    this.clickAlertCloseToast = function() {
        browser.ignoreSynchronization = true;
        browser.sleep(2000);
        this.alertCloseToast.click();
        browser.ignoreSynchronization = false;
    };

};

module.exports = Commons;
