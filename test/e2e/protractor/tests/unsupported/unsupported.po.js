'use strict';

var Unsupported = function() {
    //This elements are public (this) by reuse
    this.continueButton = $('[data-element="unsupported-continue-button"]');
    this.downloadGoogleButton = $('[data-element="unsupported-chrome-button"]');
};

module.exports = Unsupported;
