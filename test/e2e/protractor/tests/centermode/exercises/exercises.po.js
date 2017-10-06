'use strict';
var Header = require('../../header/header.po.js'),
    Variables = require('../../commons/variables.js'),
    BloqsExercise = require('../bloqsExercise/bloqsExercise.po.js'),
    TaskTable = require('../taskTable/taskTable.po.js'),
    Modals = require('../../modals/modals.po.js');

var header = new Header(),
    modals = new Modals(),
    bloqsExercise = new BloqsExercise(),
    taskTable = new TaskTable(),
    vars = new Variables();

var MyExercise = function () {

    this.registerInClassButton = $('[data-element="centerMode_button_registerInGroup"]');
    this.currentClassName = $('[data-element="tasks-dashboard-class-name"]');

    this.classesDropdown = $('[data-element="classes_dropdown"]');


    this.url = '#/tasks';

    this.get = function () {
        browser.get(this.url);
    };

    this.registerInClass = function (options) {
        options = options || {};
        if (options.isTeacher) {
            header.navShowMoreMenu.click();
        }
        header.navTasks.click();
        this.registerInClassButton.click();
        modals.inputModalChangeN.sendKeys(options.idClass);
        modals.okDialog.click();
        browser.sleep(vars.timeToWaitFadeModals);
        if (!options.dontCheckError) {
            expect(modals.inputError.isPresent()).toBe(false, 'Shouldnt appear an error when a user enter in a class');
        }
    };

    this.sendExerciseToCorrect = function (options) {
        options = options || {};
        header.navTasks.click();

        browser.actions().mouseMove(taskTable.getTaskByExerciseName(options.exerciseInfo.name)).perform();

        taskTable.getTaskButton(options.exerciseInfo.name).click();
        return browser.getAllWindowHandles().then(function (handles) {
            browser.sleep(vars.timeToWaitTab);
            browser.switchTo().window(handles[1]);

            bloqsExercise.sendTaskButton.click();
            modals.ok();

            return browser.close().then(function () {
                browser.switchTo().window(handles[0]);
            });
        });
    };
};

module.exports = MyExercise;