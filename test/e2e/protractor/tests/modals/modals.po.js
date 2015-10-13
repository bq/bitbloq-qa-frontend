'use strict';

var Modals = function() {
    //P.O modal.html
    this.okDialog = $('[data-element="modal-ok-dialog"]');
    this.cancelDialog = $('[data-element="modal-cancel-dialog"]');
    this.bladeClose = $('[data-element="modal-blade-close"]');
    //P.O modal-not-registered.html
    this.attentionContinueGuest = $('[data-element="atention-continue-guest"]');
    //P.O modal-change-language.html
    this.languagesDropdownButton = $('[data-element="languages-dropdown-button"]');
    //P.O modal-change-project-name.html
    this.inputModalChangeN = $('[data-element="modal-change-name-input"]');
    //P.O modal-send-comments.html
    this.sendCommentsName = $('[data-element="modal-send-comments-name"]');
    this.sendCommentsTextarea = $('[data-element="modal-send-comments-textarea"]');
    //P.O modal-notify-error.html
    this.notifyErrorTextArea = $('[data-element="modal-notify-error-textarea"]');
    this.notifyErrorSO = $('[data-element="modal-notify-error-so"]');
    this.notifyErrorBrowser = $('[data-element="modal-notify-error-browser"]');
    this.rejectTourPO = $('[data-element="reject-tour"]');
    //PO alert.html
    this.modalAlertOk = $('[data-element="modal-alert-ok"]');
    //PO modal-share-social-networks.html
    this.fbButton = $('[data-element="modals-fb-button"]');
    this.twButton = $('[data-element="modals-tw-button"]');
    this.gButton = $('[data-element="modals-g-button"]');
    this.shortButton = $('[data-element="modals-shortURL"]');

    this.rejectTour = function() {
        $('[data-element="reject-tour"]').click();
    };
    this.acceptTour = $('[data-element="accept-tour"]');
};

module.exports = Modals;
