'use strict';
var GlobalFunctions = require('../../commons/globalFunctions.js'),
    Header = require('../../header/header.po.js'),
    Login = require('../../login/login.po.js'),
    Variables = require('../../commons/variables.js'),
    MyCenter = require('./../mycenter/myCenter.po.js'),
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
    mycenter = new MyCenter(),
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

    it('bbb-XXX:licenses: A Director and their students cant compile no activated robots exercises', function () {

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

    it('bbb-XXX:licenses: A Director cant compile activated robots exercises if is not asigned to a center', function () {

        protractor.promise.all([
            centermode.createHeadMaster({
                keepLogin: true
            }),
            mycenter.activateRobot({
                robot: 'MBot'
            }),
            myExercises.createExercise({
                withRobot: 'MBot'
            })
        ]).then(function (results) {
            var exerciseInfo = results[2];

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

                login.logout();
            });
        });
    });

    fit('bbb-XXX:licenses: A Director and their students can compile activated robots exercises', function () {

        protractor.promise.all([
            centermode.createHeadMaster({
                keepLogin: true
            }),
            myclass.createClass(),
            mycenter.activateRobot({
                robot: 'MBot'
            }),
            myExercises.createExercise({
                withRobot: 'MBot'
            })
        ]).then(function (results) {
            var headMaster = results[0],
                classInfo = results[1],
                exerciseInfo = results[3];

            myExercises.addExerciseToClass({
                classInfo: classInfo,
                exerciseInfo: exerciseInfo
            });


            header.navExercise.click();
            exercisesTable.getExerciseOptionButton(exerciseInfo.name).click();
            exercisesTable.getContextMenuOptionEditExercise(exerciseInfo).click();

            browser.getAllWindowHandles().then(function (handles) {

                browser.sleep(vars.timeToWaitTab);

                browser.switchTo().window(handles[1]);

                bloqsExercise.hardwareTabButton.click();
                browser.sleep(5000);
                expect(bloqsExercise.getBoardMainImage('mcore').isDisplayed()).toBe(true, 'The robot mbot image is not in hardware tab');
                expect(bloqsExercise.compileButton.isEnabled()).toBe(true, 'The user cant compile not activated robot from header');
                expect(bloqsExercise.uploadButton.isEnabled()).toBe(true, 'The user cant upload not activated robot from header');
                makeActions.hideBar.click();
                browser.sleep(vars.timeToWaitMenu);

                expect(makeActions.compileButton.isEnabled()).toBe(true, 'The user cant compile not activated robot from makeactions');
                expect(makeActions.uploadButton.isEnabled()).toBe(true, 'The user cant upload not activated robot from makeactions');

                expect(hwtab.robotActivationInfoWindow.isDisplayed()).toBe(false, 'Not activated robot must show a warning window');
                browser.close();
                browser.switchTo().window(handles[0]);

                login.logout();
                login.login({
                    user: headMaster.userEmail,
                    password: headMaster.password
                });

                header.navExercise.click();
                exercisesTable.getExerciseOptionButton(exerciseInfo.name).click();
                exercisesTable.getContextMenuOptionEditExercise(exerciseInfo).click();

                browser.getAllWindowHandles().then(function (handles) {

                    browser.sleep(vars.timeToWaitTab);

                    browser.switchTo().window(handles[1]);

                    bloqsExercise.hardwareTabButton.click();
                    browser.sleep(5000);
                    expect(bloqsExercise.getBoardMainImage('mcore').isDisplayed()).toBe(true, 'The robot mbot image is not in hardware tab after relogin');
                    expect(bloqsExercise.compileButton.isEnabled()).toBe(true, 'The user cant compile not activated robot from header after relogin');
                    expect(bloqsExercise.uploadButton.isEnabled()).toBe(true, 'The user cant upload not activated robot from header after relogin');
                    makeActions.hideBar.click();
                    browser.sleep(vars.timeToWaitMenu);

                    expect(makeActions.compileButton.isEnabled()).toBe(true, 'The user cant compile not activated robot from makeactions after relogin');
                    expect(makeActions.uploadButton.isEnabled()).toBe(true, 'The user cant upload not activated robot from makeactions after relogin');

                    expect(hwtab.robotActivationInfoWindow.isDisplayed()).toBe(false, 'Not activated robot must show a warning window after relogin');
                    browser.close();
                    browser.switchTo().window(handles[0]);

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
                        browser.sleep(5000);
                        bloqsExercise.hardwareTabButton.click();
                        expect(bloqsExercise.getBoardMainImage('mcore').isDisplayed()).toBe(true, 'The robot mbot image is not in hardware tab - student');
                        expect(bloqsExercise.compileButton.isEnabled()).toBe(true, 'The user cant compile not activated robot from header - student');
                        expect(bloqsExercise.uploadButton.isEnabled()).toBe(true, 'The user cant upload not activated robot from header - student');
                        makeActions.hideBar.click();
                        browser.sleep(vars.timeToWaitMenu);

                        expect(makeActions.compileButton.isEnabled()).toBe(true, 'The user cant compile not activated robot from makeactions - student');
                        expect(makeActions.uploadButton.isEnabled()).toBe(true, 'The user cant upload not activated robot from makeactions - student');

                        browser.close();
                        browser.switchTo().window(handles2[0]);
                        login.logout();
                    });
                });
            });
        });
    });
});