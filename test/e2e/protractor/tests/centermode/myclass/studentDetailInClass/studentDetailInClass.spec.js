'use strict';
var GlobalFunctions = require('../../../commons/globalFunctions.js'),
    Header = require('../../../header/header.po.js'),
    Modals = require('../../../modals/modals.po.js'),
    Login = require('../../../login/login.po.js'),
    Centermode = require('../../centermode.po.js'),
    MyExercises = require('../../myexercises/myexercises.po.js'),
    Exercises = require('../../exercises/exercises.po.js'),
    Myclass = require('../../myclass/myclass.po.js'),
    TaskTable = require('../../taskTable/taskTable.po.js'),
    ExercisesTable = require('../../exercisesTable/exercisesTable.po.js'),
    StudentDetailInClass = require('./studentDetailInClass.po.js'),
    ClassDetail = require('../../myclass/classDetail/classDetail.po.js');

var globalFunctions = new GlobalFunctions(),
    header = new Header(),
    modals = new Modals(),
    login = new Login(),
    taskTable = new TaskTable(),
    myExercises = new MyExercises(),
    exercises = new Exercises(),
    centermode = new Centermode(),
    myclass = new Myclass(),
    exercisesTable = new ExercisesTable(),
    studentDetailInClass = new StudentDetailInClass(),
    classDetail = new ClassDetail();

globalFunctions.xmlReport('studentDetailInClass');

describe('Student Detail inside class Detail', function () {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('SWBIT-3258:studentDetailInClass: Must appear a list of exercises', function () {

        protractor.promise.all([
            login.loginWithRandomUser(),
            login.logout(),
            centermode.createHeadMaster({
                keepLogin: true
            }),
            myclass.createClass(),
            myExercises.createExercise(),
            myExercises.createExercise(),
        ]).then(function (results) {
            var student = results[0],
                headMaster = results[2],
                classInfo = results[3],
                exerciseInfo1 = results[4],
                exerciseInfo2 = results[5];

            protractor.promise.all([
                myExercises.addExerciseToClass({
                    classInfo: classInfo,
                    exerciseInfo: exerciseInfo1
                }),
                myExercises.addExerciseToClass({
                    classInfo: classInfo,
                    exerciseInfo: exerciseInfo2
                })
            ]);

            login.logout();
            login.login({
                user: student.user,
                password: student.password
            });

            exercises.registerInClass({
                idClass: classInfo.id
            });

            login.logout();
            login.login({
                user: headMaster.userEmail,
                password: headMaster.password
            });

            header.navClass.click();
            myclass.getClassObject(classInfo.id).click();
            classDetail.studentsTab.click();
            classDetail.getStudentsObjectInStudentsTable(student.user).click();
            expect(taskTable.getTaskNameObject(exerciseInfo1.name).isDisplayed()).toBe(true, 'Should appear the first task');
            expect(taskTable.getTaskNameObject(exerciseInfo2.name).isDisplayed()).toBe(true, 'Should appear the second task');

            header.navClass.click();
            myclass.getClassObject(classInfo.id).click();
            classDetail.exercisesTab.click();
            exercisesTable.getExerciseOptionButton(exerciseInfo1.name).click();
            exercisesTable.getContextMenuOptionRemoveFromThisClass(exerciseInfo1.name).click();
            modals.ok();

            classDetail.studentsTab.click();
            classDetail.getStudentsObjectInStudentsTable(student.user).click();
            expect(taskTable.getTaskNameObject(exerciseInfo1.name).isPresent()).toBe(false, 'Shouldnt appear the first task');
            expect(taskTable.getTaskNameObject(exerciseInfo2.name).isDisplayed()).toBe(true, 'Should appear the second task');
            login.logout();
        });

    });

    it('SWBIT-3259:studentDetailInClass: Delete student from class', function () {

        protractor.promise.all([
            centermode.createHeadMaster({
                keepLogin: true
            }),
            myclass.createClass(),
            login.logout(),
            login.loginWithRandomUser()
        ]).then(function (results) {
            var headMaster = results[0],
                classInfo = results[1],
                student = results[3];

            exercises.registerInClass({
                idClass: classInfo.id
            });

            expect(exercises.currentClassName.getText()).toBe(classInfo.name, 'Should appear the class name in the tasks dashboard');

            login.logout();
            login.login({
                user: headMaster.userEmail,
                password: headMaster.password
            });

            header.navClass.click();
            myclass.getClassObject(classInfo.id).click();
            classDetail.studentsTab.click();
            classDetail.getStudentsObjectInStudentsTable(student.user).click();
            studentDetailInClass.deleteStudent.click();
            modals.ok();

            classDetail.studentsTab.click();
            expect(classDetail.getStudentsObjectInStudentsTable(student.user).isPresent()).toBe(false, 'Shouldnt appear the  student');
            login.logout();

            login.login({
                user: student.user,
                password: student.password
            });

            header.navTasks.click();
            expect(exercises.currentClassName.isPresent()).toBe(false, 'Shouldnt appear the class name in the tasks dashboard');
        });

    });

    it('SWBIT-3260:studentDetailInClass: correct exercise', function () {

        protractor.promise.all([
            centermode.createHeadMaster({
                keepLogin: true
            }),
            myclass.createClass(),
            myExercises.createExercise(),
            myExercises.createExercise(),
        ]).then(function (results) {
            var headMaster = results[0],
                classInfo = results[1],
                exerciseInfo1 = results[2],
                exerciseInfo2 = results[3];

            myExercises.addExerciseToClass({
                classInfo: classInfo,
                exerciseInfo: exerciseInfo1
            });
            myExercises.addExerciseToClass({
                classInfo: classInfo,
                exerciseInfo: exerciseInfo2
            });

            login.logout();

            var student = login.loginWithRandomUser();

            exercises.registerInClass({
                idClass: classInfo.id
            });

            exercises.sendExerciseToCorrect({
                exerciseInfo: exerciseInfo1
            });
            exercises.sendExerciseToCorrect({
                exerciseInfo: exerciseInfo2
            });

            login.logout();

            login.login({
                user: headMaster.userEmail,
                password: headMaster.password
            });

            header.navClass.click();
            myclass.getClassObject(classInfo.id).click();
            classDetail.studentsTab.click();
            classDetail.getStudentsObjectInStudentsTable(student.user).click();

            studentDetailInClass.correctExercise({
                markNum: 8,
                markDec: 6,
                observations: 'Nice Job!',
                exerciseInfo: exerciseInfo1
            });

            header.navClass.click();//refresh
            myclass.getClassObject(classInfo.id).click();
            classDetail.studentsTab.click();
            classDetail.getStudentsObjectInStudentsTable(student.user).click();
            expect(taskTable.getTaskStatusObjectByExerciseName(exerciseInfo1.name).getText()).toBe('8.06', 'The mark is different');
            login.logout();

        });

    });

});