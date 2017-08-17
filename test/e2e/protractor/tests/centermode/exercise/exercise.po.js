'use strict';
var Header = require('../../header/header.po.js'),
    Variables = require('../../commons/variables.js'),
    Modals = require('../../modals/modals.po.js');

var header = new Header(),
    modals = new Modals(),
    vars = new Variables();

var MyExercise = function() {

    this.registerInClassButton = $('[data-element="centerMode_button_registerInGroup"]');

    this.url = '#/tasks';

    this.get = function() {
        browser.get(this.url);
    };

    this.registerInClass = function(options) {
        options = options || {};
        if (options.isTeacher) {
            header.navShowMoreMenu.click();
        }
        header.navTasks.click();
        this.registerInClassButton.click();
        modals.inputModalChangeN.sendKeys(options.idClass);
        modals.okDialog.click();
        browser.sleep(vars.timeToWaitFadeModals);
        expect(modals.inputError.isPresent()).toBe(false, 'Shouldnt appear an error when a user enter in a class');
    };
};

module.exports = MyExercise;