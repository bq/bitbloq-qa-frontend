'use strict';
var GlobalFunctions = require('../../../commons/globalFunctions.js'),
    Header = require('../../../header/header.po.js'),
    Login = require('../../../login/login.po.js'),
    Centermode = require('../../centermode.po.js'),
    MyExercises = require('../../myexercises/myexercises.po.js'),
    Exercises = require('../../exercises/exercises.po.js'),
    Myclass = require('../../myclass/myclass.po.js'),
    TaskTable = require('../../taskTable/taskTable.po.js'),
    ExercisesTable = require('../../exercisesTable/exercisesTable.po.js'),
    ExerciseDetailInClass = require('./exerciseDetailInClass.po.js'),
    ClassDetail = require('../../myclass/classDetail/classDetail.po.js');

var globalFunctions = new GlobalFunctions(),
    header = new Header(),
    login = new Login(),
    taskTable = new TaskTable(),
    myExercises = new MyExercises(),
    exercises = new Exercises(),
    centermode = new Centermode(),
    myclass = new Myclass(),
    exercisesTable = new ExercisesTable(),
    exerciseDetailInClass = new ExerciseDetailInClass(),
    classDetail = new ClassDetail();

globalFunctions.xmlReport('exerciseDetailInClass');

describe('Exercise Detail inside class Detail', function () {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bbb-652:exerciseDetailInClass: correct exercise', function () {

        protractor.promise.all([
            centermode.createHeadMaster({
                keepLogin: true
            }),
            myclass.createClass(),
            myExercises.createExercise()
        ]).then(function (results) {
            var headMaster = results[0],
                classInfo = results[1],
                exerciseInfo1 = results[2];

            myExercises.addExerciseToClass({
                classInfo: classInfo,
                exerciseInfo: exerciseInfo1
            });

            login.logout();

            var student = login.loginWithRandomUser();

            exercises.registerInClass({
                idClass: classInfo.id
            });

            exercises.sendExerciseToCorrect({
                exerciseInfo: exerciseInfo1
            });

            login.logout();

            login.login({
                user: headMaster.userEmail,
                password: headMaster.password
            });

            header.navClass.click();
            myclass.getClassObject(classInfo.id).click();
            classDetail.exercisesTab.click();
            exercisesTable.getExerciseNameObject(exerciseInfo1.name).click();

            exerciseDetailInClass.correctExercise({
                markNum: 8,
                markDec: 6,
                observations: 'Nice Job!',
                student: student
            });

            header.navClass.click();//refresh
            myclass.getClassObject(classInfo.id).click();
            classDetail.exercisesTab.click();
            exercisesTable.getExerciseNameObject(exerciseInfo1.name).click();
            expect(taskTable.getTaskStatusObjectByUserName(student.user).getText()).toBe('8.6', 'The mark is different');
            login.logout();

        });

    });

});