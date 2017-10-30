'use strict';
var Header = require('../../header/header.po.js'),
    Variables = require('../../commons/variables.js'),
    MakeActions = require('../../bloqsproject/makeActions/makeActions.po.js'),
    Hwtab = require('../../bloqsproject/hwtab/hwtab.po.js'),
    TaskTable = require('../taskTable/taskTable.po.js'),
    ExercisesTable = require('../exercisesTable/exercisesTable.po.js'),
    Myprojects = require('../../projects/myprojects/myprojects.po.js'),
    Make = require('../../bloqsproject/make.po.js'),
    Exercises = require('../exercises/exercises.po.js'),
    Commons = require('../../commons/commons.po.js'),
    BloqsExercise = require('../bloqsExercise/bloqsExercise.po.js');

var header = new Header(),
    bloqsExercise = new BloqsExercise(),
    makeActions = new MakeActions(),
    hwtab = new Hwtab(),
    taskTable = new TaskTable(),
    exercisesTable = new ExercisesTable(),
    myprojects = new Myprojects(),
    make = new Make(),
    exercises = new Exercises(),
    commons = new Commons(),
    vars = new Variables();

var Licenses = function () {

    /**
     * options = {
     *  exerciseInfo,
     *  boardName,
     * checkDisabled,
     * errorMessageSufix
     * }
     */
    this.checkEnableOnRobotsOnExercise = function (options) {
        options = options || {};
        options.errorMessageSufix = options.errorMessageSufix || '';

        if (options.student) {
            if (options.isTeacher) {
                header.navShowMoreMenu.click();
            }
            header.navTasks.click();

            if (options.classInfo) {
                exercises.classesDropdown.click();
                commons.getItemInDropdownByName({
                    dropdownDataElement: 'classes_dropdown',
                    itemLabel: options.classInfo.name
                }).click();
            }

            browser.actions().mouseMove(taskTable.getTaskByExerciseName(options.exerciseInfo.name)).perform();
            taskTable.getTaskButton(options.exerciseInfo.name).click();
        } else {
            header.navExercise.click();
            exercisesTable.getExerciseOptionButton(options.exerciseInfo.name).click();
            exercisesTable.getContextMenuOptionEditExercise(options.exerciseInfo).click();
        }

        browser.getAllWindowHandles().then(function (handles) {

            browser.sleep(vars.timeToWaitTab);

            browser.switchTo().window(handles[1]);

            bloqsExercise.hardwareTabButton.click();
            expect(bloqsExercise.getBoardMainImage(options.boardName).isDisplayed()).toBe(true, 'The robot/board image is not in hardware tab ' + options.errorMessageSufix);
            expect(bloqsExercise.compileButton.isEnabled()).toBe(!options.checkDisabled, 'The compile button enabled status is wrong ' + options.errorMessageSufix);
            expect(bloqsExercise.uploadButton.isEnabled()).toBe(!options.checkDisabled, 'The upload button enabled status is wrong ' + options.errorMessageSufix);
            makeActions.hideBar.click();
            browser.sleep(vars.timeToWaitMenu);

            expect(makeActions.compileButton.isEnabled()).toBe(!options.checkDisabled, 'The compile button enabled status is wrong in makeactions ' + options.errorMessageSufix);
            expect(makeActions.uploadButton.isEnabled()).toBe(!options.checkDisabled, 'The upload button enabled status is wrong in makeactions ' + options.errorMessageSufix);

            expect(hwtab.robotActivationInfoWindow.isDisplayed()).toBe(options.checkDisabled || false, 'Not activated robot/board must show a warning window ' + options.errorMessageSufix);
            browser.close();
            browser.switchTo().window(handles[0]);
            if (!options.student) {
                header.navClass.click();//refresh
            }

        });
    };

    this.checkEnableOnRobotsOnProject = function (options) {
        options = options || {};
        options.errorMessageSufix = options.errorMessageSufix || '';
        header.navProjects.click();

        myprojects.getProjectObject(options.projectInfo).click();

        browser.getAllWindowHandles().then(function (handles) {

            browser.sleep(vars.timeToWaitTab);

            browser.switchTo().window(handles[1]);

            make.hardwareTab.click();
            expect(bloqsExercise.getBoardMainImage(options.boardName).isDisplayed()).toBe(true, 'The robot/board image is not in hardware tab ' + options.errorMessageSufix);
            expect(bloqsExercise.compileButton.isEnabled()).toBe(!options.checkDisabled, 'The compile button enabled status is wrong ' + options.errorMessageSufix);
            expect(bloqsExercise.uploadButton.isEnabled()).toBe(!options.checkDisabled, 'The upload button enabled status is wrong ' + options.errorMessageSufix);
            makeActions.hideBar.click();
            browser.sleep(vars.timeToWaitMenu);

            expect(makeActions.compileButton.isEnabled()).toBe(!options.checkDisabled, 'The compile button enabled status is wrong in makeactions ' + options.errorMessageSufix);
            expect(makeActions.uploadButton.isEnabled()).toBe(!options.checkDisabled, 'The upload button enabled status is wrong in makeactions ' + options.errorMessageSufix);

            expect(hwtab.robotActivationInfoWindow.isDisplayed()).toBe(options.checkDisabled || false, 'Not activated robot/board must show a warning window ' + options.errorMessageSufix);
            browser.close();
            browser.switchTo().window(handles[0]);
        });
    };

};

module.exports = Licenses;