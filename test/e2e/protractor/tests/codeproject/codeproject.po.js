'use strict';

var Codeproject = function() {

    this.url = '#/codeproject';
    this.codeInfotabChooseBoard =  $('[data-element="infotab-chooseboard"]');
    this.codeInfotabHeading = $('[data-element="infotab-chooseboard-heading"]');

    this.get = function() {
        browser.get(this.url);
    };

};

module.exports = Codeproject;
