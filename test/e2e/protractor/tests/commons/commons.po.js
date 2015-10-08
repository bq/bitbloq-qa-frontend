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
};

module.exports = Commons;
