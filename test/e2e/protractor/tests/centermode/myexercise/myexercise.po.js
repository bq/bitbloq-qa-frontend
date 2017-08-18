'use strict';
var Header = require('../../header/header.po.js'),
    Variables = require('../../commons/variables.js'),
    Modals = require('../../modals/modals.po.js');

var header = new Header(),
    modals = new Modals(),
    vars = new Variables();

var MyExercise = function() {

    this.newExerciseButton = $('[data-element="centerMode_button_newExercise"]');

    this.url = '#/exercises';

};

module.exports = MyExercise;