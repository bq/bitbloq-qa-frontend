'use strict';

var GlobalFunctions = require('../../../commons/globalFunctions.js'),
    Header = require('../../../header/header.po.js'),
    Myclass = require('../../myclass/myclass.po.js'),
    ClassDetail = require('./classDetail.po.js'),
    Login = require('../../../login/login.po.js'),
    Centermode = require('../../centermode.po.js'),
    Exercise = require('../../exercise/exercise.po.js'),
    Modals = require('../../../modals/modals.po.js');

var globalFunctions = new GlobalFunctions(),
    header = new Header(),
    myclass = new Myclass(),
    classDetail = new ClassDetail(),
    login = new Login(),
    centermode = new Centermode(),
    exercise = new Exercise(),
    modals = new Modals();

globalFunctions.xmlReport('classDetail');

describe('Class Detail', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bbb-440:myclass:User can enter in a director open class', function() {
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
            exercise.registerInClass({
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
});