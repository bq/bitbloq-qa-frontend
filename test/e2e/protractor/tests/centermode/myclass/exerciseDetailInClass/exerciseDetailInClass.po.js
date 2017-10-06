'use strict';
var BloqsExercise = require('../../bloqsExercise/bloqsExercise.po.js'),
    Variables = require('../../../commons/variables.js'),
    TaskTable = require('../../taskTable/taskTable.po.js');


var vars = new Variables(),
    bloqsExercise = new BloqsExercise(),
    taskTable = new TaskTable();

var ExerciseDetailInClass = function () {
    /**
         * markNum: 8,
         * markDec: 6,
         * observations: 'Nice Job!',
         * exerciseInfo: exerciseInfo
         */
    this.correctExercise = function (options) {
        options = options || {};

        browser.actions().mouseMove(taskTable.getTaskByStudentName(options.student.user)).perform();
        taskTable.getTaskButtonByUserName(options.student.user).click();

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

module.exports = ExerciseDetailInClass;