'use strict';


var Landing = function() {

    this.openLandingMenu = $('[data-element="open-landing-menu"]');
    this.enterButton = $('[data-element="enter-button"]');

    this.get = function() {
        browser.get('#/');
    };
};

module.exports = Landing;