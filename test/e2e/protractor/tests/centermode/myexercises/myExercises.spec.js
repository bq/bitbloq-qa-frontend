'use strict';

var GlobalFunctions = require('../../commons/globalFunctions.js'),
    Login = require('../../login/login.po.js'),
    Modals = require('../../modals/modals.po.js'),
    Header = require('../../header/header.po.js'),
    Variables = require('../../commons/variables.js'),
    MyExercises = require('./myexercises.po.js'),
    ExercisesTable = require('../exercisesTable/exercisesTable.po.js'),
    Centermode = require('../centermode.po.js');

var globalFunctions = new GlobalFunctions(),
    login = new Login(),
    modals = new Modals(),
    header = new Header(),
    vars = new Variables(),
    myExercises = new MyExercises(),
    exercisesTable = new ExercisesTable(),
    centermode = new Centermode();

globalFunctions.xmlReport('MyExercises');

describe('My exercises as teacher', function () {

    globalFunctions.beforeTest();

    globalFunctions.afterTest();

    it('bbb-439:my exercises: Things to see on my exercises', function () {
        centermode.createHeadMaster({
            keepLogin: true
        });

        header.navExercise.click();
        expect(myExercises.newExerciseButton.isDisplayed()).toBe(true, 'Should appear a new Exercise button');
        myExercises.createExercise().then(function (exerciseInfo1) {
            header.navExercise.click();
            expect(myExercises.newExerciseButton.isDisplayed()).toBe(true, 'Should appear a new Exercise button even with created exercises');
            expect(exercisesTable.sortDropdown.isDisplayed()).toBe(true, 'Should appear the sort dropdown');
            expect(exercisesTable.filterByClassDropdown.isDisplayed()).toBe(true, 'Should appear the sort dropdown');
            expect(exercisesTable.filterByStatusDropdown.isDisplayed()).toBe(true, 'Should appear the sort dropdown');
            expect(exercisesTable.searchField.isDisplayed()).toBe(true, 'Should appear the search field');

            expect(exercisesTable.getExerciseNameObject(exerciseInfo1.name).isDisplayed()).toBe(true, 'Should appear the exercise name');
            expect(exercisesTable.getExerciseClassesObject(exerciseInfo1).isDisplayed()).toBe(true, 'Should appear the exercise classes field');
            expect(exercisesTable.getExerciseOptionButton(exerciseInfo1.name).isDisplayed()).toBe(true, 'Should appear the exercise extra options');
        });
    });

});