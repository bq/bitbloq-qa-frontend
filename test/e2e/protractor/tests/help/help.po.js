'use strict';

var Help = function() {
    this.faqTab = $('[data-element="help-faqnav"]');
    this.tutorialTab = $('[data-element="help-tutorialnav"]');
    this.elemsFaqTable = $('[data-element="help-faqTable"]');
    this.url = '#/help';

    this.get = function() {
        browser.get(this.url);
    };
};

module.exports = Help;
