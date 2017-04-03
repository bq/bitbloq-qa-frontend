'use strict';
var Header = require('../../header/header.po.js'),
    Variables = require('../../commons/variables.js'),
    Modals = require('../../modals/modals.po.js');

var header = new Header(),
    modals = new Modals(),
    vars = new Variables();

var MyExercise = function() {

    this.registerGroupButton = $('[data-element="centerMode_button_registerInGroup"]');

    this.url = '#/center-mode/student';

    this.get = function() {
        browser.get(this.url);
    };

    this.registerNewGroup = function(idGroup) {
        header.navExercise.click();
        browser.sleep(vars.timeToWaitTab);
        this.registerGroupButton.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.inputModalNoChangeN.sendKeys(idGroup);
        browser.sleep(vars.timeToSendKeys);
        modals.okDialog.click();
        browser.sleep(vars.timeToWaitFadeModals);
    };
};

module.exports = MyExercise;
