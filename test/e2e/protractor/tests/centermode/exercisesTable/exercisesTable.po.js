'use strict';

var ExerciseTable = function () {

    this.sortDropdown = $('[data-element="sortexercises_dropdown"]');

    this.filterByClassDropdown = $('[data-element="filterbyclass_dropdown"]');

    this.filterByStatusDropdown = $('[data-element="filterbystatus_dropdown"]');

    this.searchField = $('[data-element="classes-searcher"]');

    this.getExercise = function (name) {
        return $('[data-element="exercise-' + name + '"]');
    };

    this.getExerciseOptionButton = function (exerciseName) {
        return element(by.xpath('//div[@data-element= "exercise-' + exerciseName + '"]//button[@data-element= "centerMode-button-options"]'));
    };

    this.getContextMenuOptionEditGroups = function (exerciseName) {
        return element(by.xpath('//div[@data-element= "exercise-' + exerciseName + '"]//li[@data-element= "menu-edit-groups"]'));
    };

    this.getContextMenuOptionEditExercise = function (exercise) {
        return element(by.xpath('//div[@data-element= "exercise-' + exercise.name + '"]//li[@data-element= "menu-edit-exercise"]'));
    };

    this.getContextMenuOptionRemoveFromThisClass = function (exerciseName) {
        return element(by.xpath('//div[@data-element= "exercise-' + exerciseName + '"]//li[@data-element= "menu-delete-exercise-from-class"]'));
    };

    this.getExerciseNameObject = function (name) {
        return $('[data-element="centerMode-item-' + name + '"]');
    };

    this.getExerciseClassesObject = function (exerciseInfo) {
        return $('[data-element="exercisestable-classes-' + exerciseInfo.name + '"]');
    };

};

module.exports = ExerciseTable;