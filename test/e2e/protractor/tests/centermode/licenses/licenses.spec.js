'use strict';
var GlobalFunctions = require('../../commons/globalFunctions.js'),
    Header = require('../../header/header.po.js'),
    Login = require('../../login/login.po.js'),
    Variables = require('../../commons/variables.js'),
    Centermode = require('../centermode.po.js'),
    MyExercises = require('../myexercises/myexercises.po.js'),
    Exercises = require('../exercises/exercises.po.js'),
    Myclass = require('../myclass/myclass.po.js'),
    TaskTable = require('../taskTable/taskTable.po.js'),
    BloqsExercise = require('../bloqsExercise/bloqsExercise.po.js'),
    ExercisesTable = require('../exercisesTable/exercisesTable.po.js'),
    MakeActions = require('../../bloqsproject/makeActions/makeActions.po.js'),
    Hwtab = require('../../bloqsproject/hwtab/hwtab.po.js');


var globalFunctions = new GlobalFunctions(),
    header = new Header(),
    login = new Login(),
    taskTable = new TaskTable(),
    myExercises = new MyExercises(),
    exercises = new Exercises(),
    vars = new Variables(),
    centermode = new Centermode(),
    myclass = new Myclass(),
    bloqsExercise = new BloqsExercise(),
    exercisesTable = new ExercisesTable(),
    makeActions = new MakeActions(),
    hwtab = new Hwtab();

globalFunctions.xmlReport('licenses');

describe('Test licenses', function () {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bbb-XXX:licenses: As Director i cant compile no activated robots exercises', function () {

        protractor.promise.all([
            centermode.createHeadMaster({
                keepLogin: true
            }),
            myclass.createClass(),
            myExercises.createExercise({
                withRobot: 'MBot'
            })
        ]).then(function (results) {
            var classInfo = results[1],
                exerciseInfo = results[2];

            header.navExercise.click();
            exercisesTable.getExerciseOptionButton(exerciseInfo.name).click();
            exercisesTable.getContextMenuOptionEditExercise(exerciseInfo).click();

            browser.sleep(vars.timeToWaitTab);

            browser.getAllWindowHandles().then(function (handles) {

                browser.sleep(vars.timeToWaitTab);

                browser.switchTo().window(handles[1]);

                bloqsExercise.hardwareTabButton.click();
                expect(bloqsExercise.getBoardMainImage('mcore').isDisplayed()).toBe(true, 'The robot mbot image is not in hardware tab');
                expect(bloqsExercise.compileButton.isEnabled()).toBe(false, 'The user cant compile not activated robot from header');
                expect(bloqsExercise.uploadButton.isEnabled()).toBe(false, 'The user cant upload not activated robot from header');
                makeActions.hideBar.click();
                browser.sleep(vars.timeToWaitMenu);

                expect(makeActions.compileButton.isEnabled()).toBe(false, 'The user cant compile not activated robot from makeactions');
                expect(makeActions.uploadButton.isEnabled()).toBe(false, 'The user cant upload not activated robot from makeactions');

                expect(hwtab.robotActivationInfoWindow.isDisplayed()).toBe(true, 'Not activated robot must show a warning window');
                browser.close();
                browser.switchTo().window(handles[0]);

                myExercises.addExerciseToClass({
                    classInfo: classInfo,
                    exerciseInfo: exerciseInfo
                });
                login.logout();

                login.loginWithRandomUser();
                exercises.registerInClass({
                    idClass: classInfo.id
                });
                browser.actions().mouseMove(taskTable.getTaskByExerciseName(exerciseInfo.name)).perform();

                taskTable.getTaskButton(exerciseInfo.name).click();

                browser.getAllWindowHandles().then(function (handles2) {
                    browser.sleep(vars.timeToWaitTab);
                    browser.switchTo().window(handles2[1]);

                    bloqsExercise.hardwareTabButton.click();
                    expect(bloqsExercise.getBoardMainImage('mcore').isDisplayed()).toBe(true, 'The robot mbot image is not in hardware tab - student');
                    expect(bloqsExercise.compileButton.isEnabled()).toBe(false, 'The user cant compile not activated robot from header - student');
                    expect(bloqsExercise.uploadButton.isEnabled()).toBe(false, 'The user cant upload not activated robot from header - student');
                    makeActions.hideBar.click();
                    browser.sleep(vars.timeToWaitMenu);

                    expect(makeActions.compileButton.isEnabled()).toBe(false, 'The user cant compile not activated robot from makeactions - student');
                    expect(makeActions.uploadButton.isEnabled()).toBe(false, 'The user cant upload not activated robot from makeactions - student');

                    browser.close();
                    browser.switchTo().window(handles2[0]);
                    login.logout();
                });
            });
        });

    });

});