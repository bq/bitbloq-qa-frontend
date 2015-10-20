'use strict';

var Help = function() {
    this.faqTab = $('[data-element="help-faqnav"]');
    this.tutorialTab = $('[data-element="help-tutorialnav"]');
    this.elemsFaqTable = $('[data-element="help-faqTable"]');

    this.contactUsTutorials = $('[data-element="help-contact-us-tutorial"]');
    this.contactUsLink = $('[data-element="help-contact-us-link"]');
    this.feedbackAboutAnError = $('[data-element="help-feedback-about-an-error"]');
    this.feedbackIdeas = $('[data-element="help-feedback-ideas-or-comments"]');

    this.helpView = '$(\'[data-element="help-view"]\')';

    this.url = '#/help';

    this.get = function() {
        browser.get(this.url);
    };
};

module.exports = Help;