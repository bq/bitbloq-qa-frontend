'use strict';
var Header = require('../../header/header.po.js'),
    Variables = require('../../commons/variables.js'),
    Modals = require('../../modals/modals.po.js');

var header = new Header(),
    modals = new Modals(),
    vars = new Variables();

var ExerciseTable = function() {

    this.getExercise = function(name) {
        return $('[data-element="exercise-' + name + '"]');
    }

    this.getExerciseOptionButton = function(exerciseName) {
        return element(by.xpath('//div[@data-element= "exercise-' + exerciseName + '"]//button[@data-element= "centerMode-button-options"]'));
    };

    this.getContextMenuOptionEditGroups = function(exerciseName) {
        return element(by.xpath('//div[@data-element= "exercise-' + exerciseName + '"]//li[@data-element= "menu-edit-groups"]'));
    };

    this.getExerciseNameObject = function(name) {
        return $('[data-element="centerMode-item-' + name + '"]');
    }
};

module.exports = ExerciseTable;