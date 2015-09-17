'use strict';

var Landing = function() {

    this.openLandingMenu = $('[data-element="open-landing-menu"]');
    this.enterButton = $('[data-element="enter-button"]');
    this.feauturesButton = $('[data-element="landing-features-button"]');
    this.downloadsButton = $('[data-element="landing-downloads-button"]');
    this.aboutusButton = $('[data-element="landing-aboutus-button"]');

    this.get = function() {
        browser.get('#/');
    };
};

module.exports = Landing;
