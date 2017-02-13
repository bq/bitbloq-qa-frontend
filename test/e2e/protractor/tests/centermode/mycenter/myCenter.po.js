'use strict';

var MyCenter = function() {

    this.newTeacherButton = $('[data-element="centerMode_button_newTeacher"]');

    this.url = '#/center-mode/center';

    this.get = function() {
        browser.get(this.url);
    };
};

module.exports = MyCenter;
