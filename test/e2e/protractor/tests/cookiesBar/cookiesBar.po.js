/**
 *Page object cookies bar
 */
'use strict';

var CookiesBar = function() {
    this.cookiesBar = $('[data-element="cookies"]');
    this.cookiesBarLink = $('[data-element="cookies-link"]');

    this.closeCookiesBar = function() {
        this.cookiesBar.click();
        browser.sleep(1000);
    };
};

module.exports = CookiesBar;
