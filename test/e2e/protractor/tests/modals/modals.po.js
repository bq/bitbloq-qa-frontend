'use strict';

var Modals = function() {
    //P.O modal.html
    this.modalTitle = $('[data-element="modal-title"]');
    this.okDialog = $('[data-element="modal-ok-dialog"]');
    this.extraOkDialog = $('[data-element="modal-extra-ok-dialog"]');
    this.cancelDialog = $('[data-element="modal-cancel-dialog"]');
    this.bladeClose = element(by.className('ngdialog-close'));
    this.inputError = $('[data-element="modals-input-error"]');
    this.modalsText = $('[data-element="modals-text"]');
    //P.O modal-not-registered.html
    this.attentionContinueGuest = $('[data-element="atention-continue-guest"]');
    //P.O modal-change-language.html
    this.languagesDropdownButton = $('[data-element="dropdownDataElement"]');
    //P.O modal-change-project-name.html
    this.inputModalChangeN = $('[data-element="modal-change-name-input"]');
    this.inputModalNoChangeN = $('[data-element="modal-no-change-input-name"]');
    //P.O modal-send-comments.html
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
    this.shortText = $('[data-element="modals-shortURL"]');
    this.shortButton = $('[data-element="modals-shortURL-button"]');
    //PO modal-password-reset
    this.accountResetPasswordInput = $('[data-element="modal-password-reset-main-input"]');
    this.accountResetPasswordRepitInput = $('[data-element="modal-password-reset-repeat-input"]');
    this.accountResetPasswordOKButton = $('[data-element="modal-password-reset-ok-button"]');
    //PO modal-share-with-users
    this.inputEmailsUsers= $('[data-element="modals-share-with-users-input"]');

    //centermode
    this.inputNameCenter = $('[data-element="modals-center-name"]');
    this.inputTelephoneCenter = $('[data-element="modals-center-telephone"]');
    this.inputLocationCenter = $('[data-element="modals-center-location"]');

    //teacher
    this.inputEmailsTeacher = $('[data-element="modals-new-teacher-input"]');
    this.emailNoTeacher = $('[data-element="modals-email-noteacher"]');
    this.groupDropdown = $('[data-element="centerMode_dropdown"]');

    this.rejectTour = function() {
        $('[data-element="reject-tour"]').click();
    };
    this.acceptTour = $('[data-element="accept-tour"]');
};

module.exports = Modals;
