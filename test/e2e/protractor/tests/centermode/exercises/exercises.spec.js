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
    Myprojects = require('../../projects/myprojects/myprojects.po.js'),
    Hwtab = require('../../bloqsproject/hwtab/hwtab.po.js'),
    Modals = require('../../modals/modals.po.js'),
    ThirdPartyRobotsApi = require('../../commons/api/ThirdPartyRobotsApi.js');


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
    myprojects = new Myprojects(),
    thirdPartyRobotsApi = new ThirdPartyRobotsApi(),
    flow = browser.controlFlow(),
    modals = new Modals(),
    hwtab = new Hwtab();

globalFunctions.xmlReport('exercises');

describe('Exercises/tasks view', function () {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bbb-510:exercises:A user can register in a group', function () {
        protractor.promise.all([
            centermode.createHeadMaster({
                keepLogin: true
            }),
            myclass.createClass(),
            login.logout(),
            login.loginWithRandomUser()
        ]).then(function (results) {
            var classInfo = results[1];
            exercises.registerInClass({
                idClass: classInfo.id
            });
        });
    });

    it('bbb-513:exercises:should appear an error when the class id used is wrong', function () {
        login.loginWithRandomUser();
        exercises.registerInClass({
            idClass: 'tooFakeToBeReal',
            dontCheckError: true
        });

        expect(modals.inputError.isDisplayed()).toBe(true, 'User must see an error entering to a wrong class id');
        modals.cancel();

        login.logout();

    });

    it('bbb-514:exercises:add class button should be disabled if text is empty', function () {
        login.loginWithRandomUser();
        header.navTasks.click();
        exercises.registerInClassButton.click();

        expect(modals.okDialog.isEnabled()).toBe(false, 'confirm button should be disabled');
        modals.inputModalChangeN.sendKeys('patata');
        expect(modals.okDialog.isEnabled()).toBe(true, 'confirm button should be enabled');
        modals.inputModalChangeN.clear();
        expect(modals.okDialog.isEnabled()).toBe(false, 'confirm button should be disabled after clean');
        modals.cancel();

        login.logout();

    });

});