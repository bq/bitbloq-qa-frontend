'use strict';

var GlobalFunctions = require('../../commons/globalFunctions.js'),
    Header = require('../../header/header.po.js'),
    Variables = require('../../commons/variables.js'),
    Modals = require('../../modals/modals.po.js'),
    Login = require('../../login/login.po.js'),
    Centermode = require('../centermode.po.js'),
    Myclass = require('../myclass/myclass.po.js'),
    Mycenter = require('../mycenter/myCenter.po.js'),
    ClassDetail = require('../myclass/classDetail/classDetail.po.js'),
    Exercise = require('../exercise/exercise.po.js');

var globalFunctions = new GlobalFunctions(),
    header = new Header(),
    vars = new Variables(),
    modals = new Modals(),
    login = new Login(),
    centermode = new Centermode(),
    myclass = new Myclass(),
    mycenter = new Mycenter(),
    classDetail = new ClassDetail(),
    exercise = new Exercise();

globalFunctions.xmlReport('myclass');

describe('My Class', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    xit('bbb-404:myclass:new class', function() {
        var headmaster = centermode.createHeadMaster({
            keepLogin: true
        });

        myclass.createClass();
    });

    xit('bbb-405:myclass:Create a group - The field is empty', function() {
        var headmaster = centermode.createHeadMaster({
            keepLogin: true
        });
        header.navClass.click();

        myclass.createClassButton.click();
        expect(modals.okDialog.isEnabled()).toBe(false);
        modals.inputModalChangeN.sendKeys('className-' + Date.now());
        expect(modals.okDialog.isEnabled()).toBe(true);
        modals.okDialog.click();

        expect(modals.modalsText.isDisplayed()).toBe(true, 'The modal with the ID isn\'t displayed');

        modals.modalsText.getText().then(function(classId) {
            modals.cancelDialog.click();
        });
    });

    it('bbb-642:myclass:Order and filters', function() {
        var headmaster = centermode.createHeadMaster({
            keepLogin: true
        });
        protractor.promise.all([myclass.createClass({
            name: 'c'
        }), myclass.createClass({
            name: 'a'
        }), myclass.createClass({
            name: 'b'
        })]).then(function(classes) {
            console.log(classes[0]);
            console.log(classes[1]);
            console.log(classes[2]);
            myclass.orderDropdown.click();
            myclass.orderDropdownName.click();
            console.log('myclass.classesList');
            console.log(myclass.classesList);
            console.log(myclass.classesList.get(0));
            console.log(myclass.classesList.get(0).getText());
            expect(myclass.classesList.get(0).getText()).toMatch(classes[0], 'Classes order - 0');
            expect(myclass.classesList.get(1).getText()).toMatch(classes[1], 'Classes order - 1');
            expect(myclass.classesList.get(2).getText()).toMatch(classes[2], 'Classes order - 2');
        });
    });

    xit('bbb-649:myclass:Check that the classId is visible', function() {
        var headmaster = centermode.createHeadMaster({
            keepLogin: true
        });
        myclass.createClass().then(function(classInfo) {
            expect(myclass.getClassIdObject(classInfo.id).isDisplayed()).toBe(true, 'Cant see classId in the list');
            myclass.getClassObject(classInfo.id).click();
            expect(classDetail.breadcrumbSubtext.isDisplayed()).toBe(true, 'the student is not in the class list');
            expect(classDetail.breadcrumbSubtext.getText()).toBe(classInfo.id, 'The id is wrong in the class Detail');
        });
    });
});