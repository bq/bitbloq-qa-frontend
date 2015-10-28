'use strict';

var Landing = function() {

    this.openLandingMenu = $('[data-element="open-landing-menu"]');
    this.enterButton = $('[data-element="enter-button"]');
    this.feauturesButton = $('[data-element="landing-features-button"]');
    this.downloadsButton = $('[data-element="landing-downloads-button"]');
    this.aboutusButton = $('[data-element="landing-aboutus-button"]');
    this.contactButton = $('[data-element="landing-contact-button"]');
    this.cookiesButton = $('[data-element="landing-cookies-button"]');
    this.termsButton = $('[data-element="landig-terms-button"]');
    this.landingPage = '$(\'[data-element="landing"]\')'; // This data-element is different (\'data-element\') because is use in executeScript

    this.get = function() {
        browser.get('#/');
    };
};

module.exports = Landing;
