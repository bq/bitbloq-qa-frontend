'use strict';
var Header = require('../../header/header.po.js'),
    Variables = require('../../commons/variables.js'),
    Modals = require('../../modals/modals.po.js');

var header = new Header(),
    modals = new Modals(),
    vars = new Variables();

var editClassesModal = function() {

    this.getClassCheckbox = function(className) {
        return element(by.xpath('//li[@data-element= "editclassesmodal-class-' + className + '"]//input[@data-element= "editclassesmodal-select-input"]'));
    };
};

module.exports = editClassesModal;