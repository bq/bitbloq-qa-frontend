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

});