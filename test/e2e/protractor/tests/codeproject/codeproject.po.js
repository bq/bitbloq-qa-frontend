'use strict';

var Codeproject = function() {

    this.url = '#/codeproject';

    this.get = function() {
        browser.get(this.url);
    };

};

module.exports = Codeproject;
