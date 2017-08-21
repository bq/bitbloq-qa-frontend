'use strict';

var GlobalFunctions = require('../../../commons/globalFunctions.js'),
    Header = require('../../../header/header.po.js'),
    Myclass = require('../../myclass/myclass.po.js'),
    ClassDetail = require('./classDetail.po.js'),
    Login = require('../../../login/login.po.js'),
    Centermode = require('../../centermode.po.js'),
    Exercises = require('../../exercises/exercises.po.js'),
    MyExercises = require('../../myexercises/myexercises.po.js'),
    ExercisesTable = require('../../exercisesTable/exercisesTable.po.js'),
    Variables = require('../../../commons/variables.js'),
    Modals = require('../../../modals/modals.po.js');

var globalFunctions = new GlobalFunctions(),
    header = new Header(),
    myclass = new Myclass(),
    classDetail = new ClassDetail(),
    login = new Login(),
    centermode = new Centermode(),
    exercises = new Exercises(),
    myExercises = new MyExercises(),
    exercisesTable = new ExercisesTable(),
    vars = new Variables(),
    modals = new Modals();

globalFunctions.xmlReport('classDetail');

describe('Class Detail', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    xit('bbb-440:myclass:User can enter in a director open class', function() {
        var student = login.loginWithRandomUser();
        login.logout();

        var headmaster = centermode.createHeadMaster({
            keepLogin: true
        });

        myclass.createClass().then(function(classInfo) {
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
                user: headmaster.userEmail,
                password: headmaster.password
            });
            header.navClass.click();
            myclass.getClassObject(classInfo.id).click();
            classDetail.studentsTab.click();
            expect(classDetail.getStudentsObjectInStudentsTable(student.user).isDisplayed()).toBe(true, 'the student is not in the class list');
        });
    });

    xit('bbb-441:classDetail:User get an error entering in a director closed class', function() {

        var headmaster = centermode.createHeadMaster({
            keepLogin: true
        });

        myclass.createClass().then(function(classInfo) {
            myclass.getClassObject(classInfo.id).click();
            classDetail.closeClassButton.click();
            login.logout();

            login.loginWithRandomUser();
            exercises.registerInClass({
                idClass: classInfo.id,
                dontCheckError: true
            });
            expect(modals.inputError.isDisplayed()).toBe(true, 'User must see an error entering to a closed class')
            modals.cancelDialog.click();
            browser.sleep(vars.timeToWaitFadeModals);
            login.logout();
        });
    });

    xit('bbb-442:classDetail:Must be a list of student', function() {

        var headMaster = centermode.createHeadMaster({
            keepLogin: true
        });

        myclass.createClass().then(function(classInfo) {
            login.logout();

            var student1 = login.loginWithRandomUser();
            exercises.registerInClass({
                idClass: classInfo.id
            });
            login.logout();

            var student2 = login.loginWithRandomUser();
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
            expect(classDetail.getStudentsObjectInStudentsTable(student1.user).isDisplayed()).toBe(true, 'the student 1 is not in the class list');
            expect(classDetail.getStudentsObjectInStudentsTable(student2.user).isDisplayed()).toBe(true, 'the student 2 is not in the class list');

            login.logout();
        });
    });

    xit('bbb-443:classDetail:Must be a list of exercises', function() {

        var headMaster = centermode.createHeadMaster({
            keepLogin: true,
        });

        protractor.promise.all([
            myclass.createClass(),
            myExercises.createExercise(),
            myExercises.createExercise()
        ]).then(function(results) {
            var classInfo = results[0];
            var exerciseInfo1 = results[1];
            var exerciseInfo2 = results[2];

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
            header.navClass.click();
            myclass.getClassObject(classInfo.id).click();
            classDetail.exercisesTab.click();
            expect(exercisesTable.getExerciseNameObject(exerciseInfo1.name).isDisplayed()).toBe(true, 'the exercise 1 is not in the class list');
            expect(exercisesTable.getExerciseNameObject(exerciseInfo2.name).isDisplayed()).toBe(true, 'the exercise 2 is not in the class list');
            login.logout();
        });
    });

});