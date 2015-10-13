/**
 * Page objects of account.html
 */
'use strict';

var Account = function() {

    this.url = ('#/account');

    this.firstname = $('[data-element="firstname"]');
    this.lastname = $('[data-element="lastname"]');
    this.username = $('[data-element="username"]');
    this.email = $('[data-element="email"]');

    this.get = function() {
        browser.get(this.url);
    };

};

module.exports = Account;