'use strict';

var GlobalFunctions = require('../../../commons/globalFunctions.js'),
    Login = require('../../../login/login.po.js'),
    Variables = require('../../../commons/variables.js'),
    Centermode = require('../../centermode.po.js'),
    MyClass = require('../../myclass/myclass.po.js'),
    MyExercise = require('../../myexercise/myexercise.po.js');

var globalFunctions = new GlobalFunctions(),
    login = new Login(),
    vars = new Variables(),
    centermode = new Centermode(),
    myclass = new MyClass(),
    myexercise = new MyExercise();

globalFunctions.xmlReport('groups');

describe('Groups', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bbb-440:groups:The registration is open (teacher,headmaster)', function() {
        var headmaster = centermode.createHeadMaster('pruebagruposmodocentro');
        var teacher = centermode.createTeacher(headmaster);
        var student = centermode.createStudent();
        browser.sleep(vars.timeToWaitTab);

        login.get();
        login.login(headmaster.user,headmaster.password);
        browser.sleep(vars.timeToWaitTab);
        var idHead = myclass.addNewGroup('grupo prueba largo','pruebagruposmodocentro');
        browser.sleep(vars.timeToSendKeys);
        login.logout();

        login.get();
        login.login(teacher.user,teacher.password);
        browser.sleep(vars.timeToWaitTab);
        var idTeacher = myclass.addNewGroup('grupo prueba largo','pruebagruposmodocentro');
        browser.sleep(vars.timeToSendKeys);
        login.logout();

        login.get();
        login.login(student.user,student.password);
        browser.sleep(vars.timeToWaitTab);
        myexercise.registerNewGroup(idHead);
        expect(myclass.groupsElems.count()).toBe(1);
        expect(myclass.groupsElems.get(0).getText()).toMatch(idHead);
        browser.sleep(vars.timeToWaitTab);
        myexercise.registerNewGroup(idTeacher);
        expect(myclass.groupsElems.count()).toBe(2);
        expect(myclass.groupsElems.get(1).getText()).toMatch(idTeacher);
        login.logout();
    });


});
