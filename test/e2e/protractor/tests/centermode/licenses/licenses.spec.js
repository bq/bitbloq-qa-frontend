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
    licenses = new Licenses(),
    makeActions = new MakeActions(),
    myprojects = new Myprojects(),
    thirdPartyRobotsApi = new ThirdPartyRobotsApi(),
    flow = browser.controlFlow(),
    hwtab = new Hwtab();

globalFunctions.xmlReport('licenses');

describe('Test licenses', function () {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bbb-653:licenses: A Director and their students cant compile no activated robots exercises', function () {

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

            licenses.checkEnableOnRobotsOnExercise({
                exerciseInfo: exerciseInfo,
                boardName: 'mcore',
                errorMessageSufix: 'first check without assign',
                checkDisabled: true
            });

            myExercises.addExerciseToClass({
                classInfo: classInfo,
                exerciseInfo: exerciseInfo
            });

            licenses.checkEnableOnRobotsOnExercise({
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
            licenses.checkEnableOnRobotsOnExercise({
                exerciseInfo: exerciseInfo,
                boardName: 'mcore',
                errorMessageSufix: 'check student',
                checkDisabled: true,
                student: true
            });
            login.logout();
        });

    });

    it('bbb-654:licenses: A Director cant compile activated robots exercises if is not asigned to a center', function () {

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

            licenses.checkEnableOnRobotsOnExercise({
                exerciseInfo: exerciseInfo,
                boardName: 'mcore',
                checkDisabled: true
            });

            login.logout();
        });
    });

    it('bbb-655:licenses: A Director and their students can compile activated robots exercises', function () {

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

            licenses.checkEnableOnRobotsOnExercise({
                exerciseInfo: exerciseInfo,
                boardName: 'mcore',
                errorMessageSufix: 'check when the exercise is assigned',
            });

            login.logout();
            login.login({
                user: headMaster.userEmail,
                password: headMaster.password
            });

            licenses.checkEnableOnRobotsOnExercise({
                exerciseInfo: exerciseInfo,
                boardName: 'mcore',
                errorMessageSufix: 'check when the headmaster do a relogin',
            });

            login.logout();

            login.loginWithRandomUser();
            exercises.registerInClass({
                idClass: classInfo.id
            });
            licenses.checkEnableOnRobotsOnExercise({
                exerciseInfo: exerciseInfo,
                boardName: 'mcore',
                errorMessageSufix: 'check when the exercise is assigned on student',
                student: true
            });
            login.logout();
        });

    });
    it('bbb-656:licenses: A teacher and their students cant compile no activated robots exercises', function () {

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

            licenses.checkEnableOnRobotsOnExercise({
                exerciseInfo: exerciseInfo,
                boardName: 'mcore',
                errorMessageSufix: 'first check without assing exercise',
                checkDisabled: true
            });

            myExercises.addExerciseToClass({
                classInfo: classInfo,
                exerciseInfo: exerciseInfo
            });

            licenses.checkEnableOnRobotsOnExercise({
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

            licenses.checkEnableOnRobotsOnExercise({
                exerciseInfo: exerciseInfo,
                boardName: 'mcore',
                errorMessageSufix: 'check the student when the exercise is assigned',
                student: true,
                checkDisabled: true
            });

            login.logout();
        });

    });

    it('bbb-657:licenses: A Teacher and their students can compile activated robots exercises', function () {
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

            licenses.checkEnableOnRobotsOnExercise({
                exerciseInfo: exerciseInfo,
                boardName: 'mcore',
                errorMessageSufix: 'first check'
            });

            login.logout();

            login.login({
                user: teacher.userEmail,
                password: teacher.password
            });
            licenses.checkEnableOnRobotsOnExercise({
                exerciseInfo: exerciseInfo,
                boardName: 'mcore',
                errorMessageSufix: 'relogin check'
            });

            login.logout();
            login.loginWithRandomUser();

            exercises.registerInClass({
                idClass: classInfo.id
            });
            licenses.checkEnableOnRobotsOnExercise({
                exerciseInfo: exerciseInfo,
                boardName: 'mcore',
                errorMessageSufix: 'student check',
                student: true
            });
            login.logout();
        });
    });

    it('bbb-658:licenses: A Director and their students can compile only after activate robots exercises', function () {

        protractor.promise.all([
            centermode.createHeadMaster({
                keepLogin: true
            }),
            myclass.createClass(),
            myExercises.createExercise({
                withRobot: 'MBot'
            })
        ]).then(function (results) {
            var headMaster = results[0],
                classInfo = results[1],
                exerciseInfo = results[2];

            myExercises.addExerciseToClass({
                classInfo: classInfo,
                exerciseInfo: exerciseInfo
            });

            licenses.checkEnableOnRobotsOnExercise({
                exerciseInfo: exerciseInfo,
                boardName: 'mcore',
                errorMessageSufix: 'check when the exercise is assigned',
                checkDisabled: true
            });

            login.logout();

            var student = login.loginWithRandomUser();
            exercises.registerInClass({
                idClass: classInfo.id
            });
            licenses.checkEnableOnRobotsOnExercise({
                exerciseInfo: exerciseInfo,
                boardName: 'mcore',
                errorMessageSufix: 'check when the exercise is assigned on student',
                student: true,
                checkDisabled: true
            });
            login.logout();
            login.login({
                user: headMaster.userEmail,
                password: headMaster.password
            });
            mycenter.activateRobot({
                robot: 'MBot'
            });

            licenses.checkEnableOnRobotsOnExercise({
                exerciseInfo: exerciseInfo,
                boardName: 'mcore',
                errorMessageSufix: 'check when the robot is activated',
            });
            login.logout();

            login.login({
                user: student.userEmail,
                password: student.password
            });
            licenses.checkEnableOnRobotsOnExercise({
                exerciseInfo: exerciseInfo,
                boardName: 'mcore',
                errorMessageSufix: 'check when the robot is activated on student',
                student: true,
            });
            login.logout();
        });
    });

    it('bbb-659:licenses: A Teacher and their students can compile only after activate robots exercises', function () {
        var headMaster = centermode.createHeadMaster();
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

            licenses.checkEnableOnRobotsOnExercise({
                exerciseInfo: exerciseInfo,
                boardName: 'mcore',
                errorMessageSufix: 'check when the exercise is assigned',
                checkDisabled: true
            });

            login.logout();

            var student = login.loginWithRandomUser();
            exercises.registerInClass({
                idClass: classInfo.id
            });
            licenses.checkEnableOnRobotsOnExercise({
                exerciseInfo: exerciseInfo,
                boardName: 'mcore',
                errorMessageSufix: 'check when the exercise is assigned on student',
                student: true,
                checkDisabled: true
            });
            login.logout();
            login.login({
                user: headMaster.userEmail,
                password: headMaster.password
            });
            mycenter.activateRobot({
                robot: 'MBot'
            });
            login.logout();

            login.login({
                user: teacher.userEmail,
                password: teacher.password
            });

            licenses.checkEnableOnRobotsOnExercise({
                exerciseInfo: exerciseInfo,
                boardName: 'mcore',
                errorMessageSufix: 'check when the robot is activated',
            });
            login.logout();

            login.login({
                user: student.userEmail,
                password: student.password
            });
            licenses.checkEnableOnRobotsOnExercise({
                exerciseInfo: exerciseInfo,
                boardName: 'mcore',
                errorMessageSufix: 'check when the robot is activated on student',
                student: true,
            });
            login.logout();
        });
    });

    it('bbb-660:licenses:Cant compile a robot project without activate it', function () {
        protractor.promise.all([
            login.loginWithRandomUser(),
            myprojects.createProject({
                withRobot: 'MBot',
                firstProyect: true
            })
        ]).then(function (results) {
            var projectInfo = results[1];

            licenses.checkEnableOnRobotsOnProject({
                projectInfo: projectInfo,
                boardName: 'mcore',
                checkDisabled: true
            });
        });
    });

    it('bbb-661:licenses:Can compile an activated robot project', function () {
        protractor.promise.all([
            login.loginWithRandomUser(),
            myprojects.createProject({
                withRobot: 'MBot',
                firstProyect: true,
                activateRobot: true
            })
        ]).then(function (results) {
            var projectInfo = results[1];

            licenses.checkEnableOnRobotsOnProject({
                projectInfo: projectInfo,
                boardName: 'mcore'
            });
        });
    });

    it('bbb-662:licenses:Cant activate a personal proyect robot with a centermode code', function () {

        flow.execute(thirdPartyRobotsApi.getMBotCenterCode).then(function (result) {
            protractor.promise.all([
                login.loginWithRandomUser(),
                myprojects.createProject({
                    withRobot: 'MBot',
                    firstProyect: true,
                    activateRobot: true,
                    activateRobotCode: result[0].code,
                    disableActivateRobotExpects: true
                })
            ]).then(function (results) {
                var projectInfo = results[1];

                licenses.checkEnableOnRobotsOnProject({
                    projectInfo: projectInfo,
                    boardName: 'mcore',
                    checkDisabled: true
                });
                login.logout();
            });
        });
    });

    it('bbb-663:licenses:Cant compile a exercise, when i have a personal code', function () {
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

            myExercises.addExerciseToClass({
                classInfo: classInfo,
                exerciseInfo: exerciseInfo
            });
            login.logout();

            protractor.promise.all([
                login.loginWithRandomUser(),
                exercises.registerInClass({
                    idClass: classInfo.id
                }),
                myprojects.createProject({
                    withRobot: 'MBot',
                    firstProyect: true,
                    activateRobot: true,
                })
            ]).then(function (results2) {
                var projectInfo = results2[2];

                licenses.checkEnableOnRobotsOnExercise({
                    exerciseInfo: exerciseInfo,
                    boardName: 'mcore',
                    errorMessageSufix: 'check the exercise on student',
                    student: true,
                    checkDisabled: true
                });
                licenses.checkEnableOnRobotsOnProject({
                    projectInfo: projectInfo,
                    boardName: 'mcore'
                });
                login.logout();
            });
        });
    });

    it('bbb-664:licenses:Cant compile a proyect, when i have a center with an activated code', function () {
        protractor.promise.all([
            centermode.createHeadMaster({
                keepLogin: true
            }),
            mycenter.activateRobot({
                robot: 'MBot'
            }),
            myclass.createClass(),
            myExercises.createExercise({
                withRobot: 'MBot'
            })
        ]).then(function (results) {
            var classInfo = results[2],
                exerciseInfo = results[3];

            myExercises.addExerciseToClass({
                classInfo: classInfo,
                exerciseInfo: exerciseInfo
            });
            login.logout();

            protractor.promise.all([
                login.loginWithRandomUser(),
                exercises.registerInClass({
                    idClass: classInfo.id
                }),
                myprojects.createProject({
                    withRobot: 'MBot',
                    firstProyect: true
                })
            ]).then(function (results2) {
                var projectInfo = results2[2];

                licenses.checkEnableOnRobotsOnExercise({
                    exerciseInfo: exerciseInfo,
                    boardName: 'mcore',
                    errorMessageSufix: 'check the exercise on student',
                    student: true
                });
                licenses.checkEnableOnRobotsOnProject({
                    projectInfo: projectInfo,
                    boardName: 'mcore',
                    checkDisabled: true
                });
                login.logout();
            });
        });
    });

    function checkThatARobotActivationAffectOnlyHimself(robot) {
        protractor.promise.all([
            centermode.createHeadMaster({
                keepLogin: true
            }),
            mycenter.activateRobot({
                robot: robot
            }),
            myclass.createClass(),
            myExercises.createExercise({
                withRobot: 'MBot'
            }),
            myExercises.createExercise({
                withRobot: 'MRanger'
            }),
            myExercises.createExercise({
                withRobot: 'StarterKit'
            })
        ]).then(function (results) {
            var classInfo = results[2],
                mBotExerciseInfo = results[3],
                mRangerExerciseInfo = results[4],
                starterExerciseInfo = results[5];

            myExercises.addExerciseToClass({
                classInfo: classInfo,
                exerciseInfo: mBotExerciseInfo
            });
            myExercises.addExerciseToClass({
                classInfo: classInfo,
                exerciseInfo: mRangerExerciseInfo
            });
            myExercises.addExerciseToClass({
                classInfo: classInfo,
                exerciseInfo: starterExerciseInfo
            });

            licenses.checkEnableOnRobotsOnExercise({
                exerciseInfo: mBotExerciseInfo,
                boardName: 'mcore',
                errorMessageSufix: 'check the exercise with mBot',
                checkDisabled: (robot !== 'MBot') ? true : false
            });

            licenses.checkEnableOnRobotsOnExercise({
                exerciseInfo: mRangerExerciseInfo,
                boardName: 'meauriga',
                errorMessageSufix: 'check the exercise with mRanger',
                checkDisabled: (robot !== 'MRanger') ? true : false
            });

            licenses.checkEnableOnRobotsOnExercise({
                exerciseInfo: starterExerciseInfo,
                boardName: 'meorion',
                errorMessageSufix: 'check the exercise with starter',
                checkDisabled: (robot !== 'StarterKit') ? true : false
            });

            login.logout();

            login.loginWithRandomUser();
            exercises.registerInClass({
                idClass: classInfo.id
            });

            licenses.checkEnableOnRobotsOnExercise({
                exerciseInfo: mBotExerciseInfo,
                boardName: 'mcore',
                errorMessageSufix: 'check the mbot exercise on student',
                student: true,
                checkDisabled: (robot !== 'MBot') ? true : false
            });

            licenses.checkEnableOnRobotsOnExercise({
                exerciseInfo: mRangerExerciseInfo,
                boardName: 'meauriga',
                errorMessageSufix: 'check the mranger exercise on student',
                student: true,
                checkDisabled: (robot !== 'MRanger') ? true : false
            });

            licenses.checkEnableOnRobotsOnExercise({
                exerciseInfo: starterExerciseInfo,
                boardName: 'meorion',
                errorMessageSufix: 'check the starter exercise on student',
                student: true,
                checkDisabled: (robot !== 'StarterKit') ? true : false
            });

            login.logout();

        });
    }

    it('bbb-665:licenses:Cant compile ranger and starter if a mbot is activated', function () {
        checkThatARobotActivationAffectOnlyHimself('MBot');
    });

    it('bbb-666:licenses:Cant compile mbot and starter if a mranger is activated', function () {
        checkThatARobotActivationAffectOnlyHimself('MRanger');
    });

    it('bbb-667:licenses:Cant compile mbot and mranger if a starter is activated', function () {
        checkThatARobotActivationAffectOnlyHimself('StarterKit');
    });

    it('bbb-668:licenses: Teacher and students can use robots activated in teacher\'s other centers', function () {
        var headMaster1 = centermode.createHeadMaster({
            keepLogin: true
        });
        mycenter.activateRobot({
            robot: 'MBot'
        });
        login.logout();

        protractor.promise.all([
            centermode.createTeacher({
                headMaster: headMaster1
            }),
            centermode.createHeadMaster({
                keepLogin: true
            })
        ]).then(function (results) {
            var teacher1 = results[0],
                headMaster2 = results[1];

            protractor.promise.all([
                centermode.addTeacher({
                    teacher: teacher1,
                    resend: true
                }),
                login.logout(),
                login.login({
                    user: teacher1.userEmail,
                    password: teacher1.password
                }),
                myclass.createClass({
                    centerName: headMaster1.centerName
                }),
                myclass.createClass({
                    centerName: headMaster2.centerName
                }),
                myExercises.createExercise({
                    name: 'exercise1',
                    withRobot: 'MBot'
                }), myExercises.createExercise({
                    name: 'exercise2',
                    withRobot: 'MBot'
                })
            ]).then(function (results2) {
                var classInfo1 = results2[3],
                    classInfo2 = results2[4],
                    exerciseInfo1 = results2[5],
                    exerciseInfo2 = results2[6];

                myExercises.addExerciseToClass({
                    classInfo: classInfo1,
                    exerciseInfo: exerciseInfo1
                });

                myExercises.addExerciseToClass({
                    classInfo: classInfo2,
                    exerciseInfo: exerciseInfo2
                });

                licenses.checkEnableOnRobotsOnExercise({
                    exerciseInfo: exerciseInfo1,
                    boardName: 'mcore',
                    errorMessageSufix: 'class with robot activated',
                });

                licenses.checkEnableOnRobotsOnExercise({
                    exerciseInfo: exerciseInfo2,
                    boardName: 'mcore',
                    errorMessageSufix: 'class without robot activated',
                    checkDisabled: true
                });
                login.logout();

                login.loginWithRandomUser();

                exercises.registerInClass({
                    idClass: classInfo1.id
                });

                exercises.registerInClass({
                    idClass: classInfo2.id
                });

                licenses.checkEnableOnRobotsOnExercise({
                    exerciseInfo: exerciseInfo1,
                    classInfo: classInfo1,
                    boardName: 'mcore',
                    errorMessageSufix: 'student in class with robot activated',
                    student: true,
                });

                licenses.checkEnableOnRobotsOnExercise({
                    exerciseInfo: exerciseInfo2,
                    classInfo: classInfo2,
                    boardName: 'mcore',
                    errorMessageSufix: 'student in class without robot activated',
                    student: true,
                    checkDisabled: true
                });

                login.logout();
            });
        });
    });

});