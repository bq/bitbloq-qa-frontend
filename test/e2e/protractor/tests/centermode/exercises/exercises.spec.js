'use strict';
var GlobalFunctions = require('../../commons/globalFunctions.js'),
    Header = require('../../header/header.po.js'),
    Login = require('../../login/login.po.js'),
    Centermode = require('../centermode.po.js'),
    Exercises = require('../exercises/exercises.po.js'),
    Myclass = require('../myclass/myclass.po.js'),
    Modals = require('../../modals/modals.po.js');


var globalFunctions = new GlobalFunctions(),
    header = new Header(),
    login = new Login(),
    exercises = new Exercises(),
    centermode = new Centermode(),
    myclass = new Myclass(),
    modals = new Modals();

globalFunctions.xmlReport('exercises');

describe('Exercises/tasks view', function () {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('SWBIT-3291:exercises:A user can register in a group', function () {
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

    it('SWBIT-3292:exercises:should appear an error when the class id used is wrong', function () {
        login.loginWithRandomUser();
        exercises.registerInClass({
            idClass: 'tooFakeToBeReal',
            dontCheckError: true
        });

        expect(modals.inputError.isDisplayed()).toBe(true, 'User must see an error entering to a wrong class id');
        modals.cancel();

        login.logout();

    });

    it('SWBIT-3293:exercises:add class button should be disabled if text is empty', function () {
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