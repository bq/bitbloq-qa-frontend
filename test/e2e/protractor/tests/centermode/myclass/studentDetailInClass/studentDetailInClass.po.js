'use strict';
var Header = require('../../header/header.po.js'),
    Variables = require('../../commons/variables.js'),
    Modals = require('../../modals/modals.po.js');

var header = new Header(),
    modals = new Modals(),
    vars = new Variables();

var StudentDetailInClass = function() {
    this.deleteStudent = $('[data-element="centerMode_button_deleteStudent"]');
};

module.exports = StudentDetailInClass;