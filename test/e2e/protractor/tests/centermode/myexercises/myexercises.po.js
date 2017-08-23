'use strict';
var Header = require('../../header/header.po.js'),
    GlobalFunctions = require('../../commons/globalFunctions.js'),
    Variables = require('../../commons/variables.js'),
    BloqsExercise = require('../bloqsExercise/bloqsExercise.po.js'),
    ExercisesTable = require('../exercisesTable/exercisesTable.po.js'),
    EditClassesModal = require('../editClassesModal/editClassesModal.po.js'),
    Modals = require('../../modals/modals.po.js');

var header = new Header(),
    globalFunctions = new GlobalFunctions(),
    modals = new Modals(),
    bloqsExercise = new BloqsExercise(),
    exercisesTable = new ExercisesTable(),
    editClassesModal = new EditClassesModal(),
    vars = new Variables();

var MyExercise = function () {
    this.newExerciseButton = $('[data-element="centerMode_button_newExercise"]');

    this.url = '#/exercises';

    this.createExercise = function (options) {
        options = options || {};
        var exercise = {
            name: 'Exercise_' + globalFunctions.getRandomNumber()
        };

        header.navExercise.click();
        this.newExerciseButton.click();
        browser.sleep(vars.timeToWaitTab);

        return browser.getAllWindowHandles().then(function (handles) {

            browser.sleep(vars.timeToWaitTab);

            browser.switchTo().window(handles[1]);

            expect(browser.getCurrentUrl()).toMatch(/#\/exercise/);
            bloqsExercise.name.click();
            modals.inputModalChangeN.clear();
            modals.inputModalChangeN.sendKeys(exercise.name);
            modals.okDialog.click();
            browser.sleep(vars.timeToWaitAutoSave);
            expect(bloqsExercise.savedMessageOK.isDisplayed()).toBe(true, 'Error saving the exercise');
            return browser.close().then(function () {
                browser.switchTo().window(handles[0]);
                header.navClass.click(); //to refresh
                header.navExercise.click();
                return exercise;
            });
        });
    };

    this.addExerciseToClass = function (options) {
        options = options || {};
        header.navClass.click(); //to refresh
        header.navExercise.click();

        exercisesTable.getExerciseOptionButton(options.exerciseInfo.name).click();
        exercisesTable.getContextMenuOptionEditGroups(options.exerciseInfo.name).click();
        editClassesModal.getClassCheckbox(options.classInfo.name).click();

        return browser.executeScript('window.scrollTo(0,200);').then(function () {
            modals.okDialog.click();
            browser.sleep(vars.timeToWaitFadeModals);
            return true;
        });
    };
};

module.exports = MyExercise;