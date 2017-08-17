'use strict';
var Header = require('../../header/header.po.js'),
    Variables = require('../../commons/variables.js'),
    Modals = require('../../modals/modals.po.js');

var header = new Header(),
    modals = new Modals(),
    vars = new Variables();
var MyClass = function() {

    this.createClassButton = $('[data-element="centerMode_button_newGroup"]');

    this.url = '#/center-mode/teacher';

    this.get = function() {
        browser.get(this.url);
    };

    this.createClass = function(options) {
        options = options || {};
        options.name = options.name || 'className_' + Date.now();

        header.navClass.click();
        this.createClassButton.click();

        modals.inputModalChangeN.sendKeys(options.name);
        modals.okDialog.click();

        expect(modals.modalsText.isDisplayed()).toBe(true, 'The modal with the ID isn\'t displayed');

        return modals.modalsText.getText().then(function(classId) {
            modals.cancelDialog.click();
            browser.sleep(vars.timeToWaitFadeModals);
            return {
                name: options.name,
                id: classId
            }
        });
    };

    this.getClassObject = function(classId) {
        return $('[data-element="class-' + classId + '"]');
    };
};

module.exports = MyClass;