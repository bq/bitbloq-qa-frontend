'use strict';

var BloqsExercise = require('../../bloqsExercise/bloqsExercise.po.js'),
    Variables = require('../../../commons/variables.js'),
    TaskTable = require('../../taskTable/taskTable.po.js');

var bloqsExercise = new BloqsExercise(),
    vars = new Variables(),
    taskTable = new TaskTable();

var StudentDetailInClass = function () {
    this.deleteStudent = $('[data-element="centerMode_button_deleteStudent"]');

    /**
     * markNum: 8,
     * markDec: 6,
     * observations: 'Nice Job!',
     * exerciseInfo: exerciseInfo
     */
    this.correctExercise = function (options) {
        options = options || {};

        browser.actions().mouseMove(taskTable.getTask(options.exerciseInfo.name)).perform();

        taskTable.getTaskButton(options.exerciseInfo.name).click();
        return browser.getAllWindowHandles().then(function (handles) {
            browser.sleep(vars.timeToWaitTab);
            browser.switchTo().window(handles[1]);

            bloqsExercise.correctTabButton.click();
            bloqsExercise.markNumberInput.sendKeys(options.markNum);
            bloqsExercise.markDecimalInput.sendKeys(options.markDec);
            bloqsExercise.markObservationsInput.sendKeys(options.observations);

            bloqsExercise.sendMarkButton.click();


            return browser.close().then(function () {
                browser.switchTo().window(handles[0]);
            });
        });

    };
};

module.exports = StudentDetailInClass;