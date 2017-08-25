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
    Licenses = require('./licenses.po.js'),
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
    licenses = new Licenses(),
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

            licenses.checkEnableOnRobots({
                exerciseInfo: exerciseInfo,
                boardName: 'mcore',
                errorMessageSufix: 'first check without assign',
                checkDisabled: true
            });

            myExercises.addExerciseToClass({
                classInfo: classInfo,
                exerciseInfo: exerciseInfo
            });

            licenses.checkEnableOnRobots({
                exerciseInfo: exerciseInfo,
                boardName: 'mcore',
                errorMessageSufix: 'check assigned',
                checkDisabled: true
            });
            login.logout();

            login.loginWithRandomUser();
            exercises.registerInClass({
                idClass: classInfo.id
            });
            licenses.checkEnableOnRobots({
                exerciseInfo: exerciseInfo,
                boardName: 'mcore',
                errorMessageSufix: 'check student',
                checkDisabled: true,
                student: true
            });
            login.logout();
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

            licenses.checkEnableOnRobots({
                exerciseInfo: exerciseInfo,
                boardName: 'mcore',
                errorMessageSufix: '',
                checkDisabled: true
            });

            login.logout();
        });
    });

    it('bbb-XXX:licenses: A Director and their students can compile activated robots exercises', function () {

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

            licenses.checkEnableOnRobots({
                exerciseInfo: exerciseInfo,
                boardName: 'mcore',
                errorMessageSufix: 'check when the exercise is assigned',
            });

            login.logout();
            login.login({
                user: headMaster.userEmail,
                password: headMaster.password
            });

            licenses.checkEnableOnRobots({
                exerciseInfo: exerciseInfo,
                boardName: 'mcore',
                errorMessageSufix: 'check when the headmaster do a relogin',
            });

            login.logout();

            login.loginWithRandomUser();
            exercises.registerInClass({
                idClass: classInfo.id
            });
            licenses.checkEnableOnRobots({
                exerciseInfo: exerciseInfo,
                boardName: 'mcore',
                errorMessageSufix: 'check when the exercise is assigned on student',
                student: true
            });
            login.logout();
        });

    });
    it('bbb-XXX:licenses: A teacher and their students cant compile no activated robots exercises', function () {

        protractor.promise.all([
            centermode.createTeacher({
                keepLogin: true
            }),
            myclass.createClass(),
            myExercises.createExercise({
                withRobot: 'MBot'
            })
        ]).then(function (results) {
            var classInfo = results[1],
                exerciseInfo = results[2];

            licenses.checkEnableOnRobots({
                exerciseInfo: exerciseInfo,
                boardName: 'mcore',
                errorMessageSufix: 'first check without assing exercise',
                checkDisabled: true
            });

            myExercises.addExerciseToClass({
                classInfo: classInfo,
                exerciseInfo: exerciseInfo
            });

            licenses.checkEnableOnRobots({
                exerciseInfo: exerciseInfo,
                boardName: 'mcore',
                errorMessageSufix: 'check when the exercise is assigned',
                checkDisabled: true
            });
            login.logout();

            login.loginWithRandomUser();

            exercises.registerInClass({
                idClass: classInfo.id
            });

            licenses.checkEnableOnRobots({
                exerciseInfo: exerciseInfo,
                boardName: 'mcore',
                errorMessageSufix: 'check the student when the exercise is assigned',
                student: true,
                checkDisabled: true
            });

            login.logout();
        });

    });

    it('bbb-XXX:licenses: A Teacher and their students can compile activated robots exercises', function () {
        var headMaster = centermode.createHeadMaster({
            keepLogin: true
        });
        mycenter.activateRobot({
            robot: 'MBot'
        });
        login.logout();
        protractor.promise.all([
            centermode.createTeacher({
                keepLogin: true,
                headMaster: headMaster
            }),
            myclass.createClass(),
            myExercises.createExercise({
                withRobot: 'MBot'
            })
        ]).then(function (results) {
            var teacher = results[0],
                classInfo = results[1],
                exerciseInfo = results[2];

            myExercises.addExerciseToClass({
                classInfo: classInfo,
                exerciseInfo: exerciseInfo
            });

            licenses.checkEnableOnRobots({
                exerciseInfo: exerciseInfo,
                boardName: 'mcore',
                errorMessageSufix: 'first check'
            });

            login.logout();

            login.login({
                user: teacher.userEmail,
                password: teacher.password
            });
            licenses.checkEnableOnRobots({
                exerciseInfo: exerciseInfo,
                boardName: 'mcore',
                errorMessageSufix: 'relogin check'
            });

            login.logout();
            login.loginWithRandomUser();

            exercises.registerInClass({
                idClass: classInfo.id
            });
            licenses.checkEnableOnRobots({
                exerciseInfo: exerciseInfo,
                boardName: 'mcore',
                errorMessageSufix: 'student check',
                student: true
            });
            login.logout();
        });
    });

});