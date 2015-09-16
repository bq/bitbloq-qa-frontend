/**
 *Page object cookies bar
 */
'use strict';

var CookiesBar = function() {
   this.cookiesBar = $('[data-element="cookies"]');

   this.closeCookiesBar = function() {
      this.cookiesBar.click();
      browser.sleep(1000);
   };
};

module.exports = CookiesBar;
