'use strict';

var Help = function() {

    //Elements of tutorial
    this.basicTutorialTable = $('[data-element="help-basicTutorial"]');
    this.contactUsTutorials = $('[data-element="help-contact-us-tutorial"]');

    this.tutorialList = element.all(by.className('tutorial--item'));

    //button
    this.goToDIWOButton = $('[data-element="go-to-diwo"]');

    this.url = '#/learn';

    this.get = function() {
        browser.get(this.url);
    };

    this.firstElementTutorial = function() {
        var elem = this.basicTutorialTable.all(by.className('tutorial--item')).first();
        return elem;
    };
};

module.exports = Help;
