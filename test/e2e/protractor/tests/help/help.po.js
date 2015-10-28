'use strict';

var Help = function() {
    //Tabs
    this.faqTab = $('[data-element="help-faqnav"]');
    this.tutorialTab = $('[data-element="help-tutorialnav"]');
    this.changelogTab = $('[data-element="help-changelognav"]');

    this.contactUsTutorials = $('[data-element="help-contact-us-tutorial"]');
    this.contactUsLink = $('[data-element="help-contact-us-link"]');
    this.feedbackAboutAnError = $('[data-element="help-feedback-about-an-error"]');
    this.feedbackIdeas = $('[data-element="help-feedback-ideas-or-comments"]');
    this.helpView = '$(\'[data-element="help-view"]\')';

    //Elements of faq
    this.faqTable = $('[data-element="help-faqTable"]');
    this.elemFaqTable = $('[data-element="help-faqElement"]');
    this.textFaq = $('[data-element="help-faqText"]');
    this.answerFaq = $('[data-element="help-faqAnswer"]');

    //Elements of tutorial
    this.basicTutorialTable = $('[data-element="help-basicTutorial"]');

	this.changelogList = element.all(by.repeater('item in changeLogsApi'));

    this.url = '#/help';

    this.get = function() {
        browser.get(this.url);
    };

    this.firstElementFAQ = function() {
        var elem = this.faqTable.all(by.xpath('//*[@data-element="help-faqElement"]')).first();
        return elem;
    };

    this.isPresentTextFAQ = function(elementFAQ) {
        return elementFAQ.$('[data-element="help-faqText"]').isPresent();
    };

    this.isPresentAnswerFAQ = function(elementFAQ) {
        return elementFAQ.$('[data-element="help-faqAnswer"]').isPresent();
    };

    this.firstElementTutorial = function() {
        var elem = this.basicTutorialTable.all(by.className('tutorial--item')).first();
        return elem;
    };

    this.getTitleChangelog = function(title) {
        return $('[data-element="changelog__title-' + title + '"]').getText().then(function(titletext){
            return titletext;
        });
    };
};

module.exports = Help;
