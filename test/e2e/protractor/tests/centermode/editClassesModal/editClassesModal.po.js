'use strict';

var editClassesModal = function() {

    this.getClassCheckbox = function(className) {
        return element(by.xpath('//li[@data-element= "editclassesmodal-class-' + className + '"]//input[@data-element= "editclassesmodal-select-input"]'));
    };
};

module.exports = editClassesModal;