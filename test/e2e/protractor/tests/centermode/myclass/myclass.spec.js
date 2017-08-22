'use strict';

var GlobalFunctions = require('../../commons/globalFunctions.js'),
    Header = require('../../header/header.po.js'),
    Modals = require('../../modals/modals.po.js'),
    Centermode = require('../centermode.po.js'),
    Myclass = require('../myclass/myclass.po.js'),
    ClassDetail = require('../myclass/classDetail/classDetail.po.js');

var globalFunctions = new GlobalFunctions(),
    header = new Header(),
    modals = new Modals(),
    centermode = new Centermode(),
    myclass = new Myclass(),
    classDetail = new ClassDetail();

globalFunctions.xmlReport('myclass');

describe('My Class', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bbb-404:myclass:new class', function() {
        centermode.createHeadMaster({
            keepLogin: true
        });

        myclass.createClass();
    });

    it('bbb-405:myclass:Create a group - The field is empty', function() {
        centermode.createHeadMaster({
            keepLogin: true
        });
        header.navClass.click();

        myclass.createClassButton.click();
        expect(modals.okDialog.isEnabled()).toBe(false);
        modals.inputModalChangeN.sendKeys('className-' + Date.now());
        expect(modals.okDialog.isEnabled()).toBe(true);
        modals.okDialog.click();

        expect(modals.modalsText.isDisplayed()).toBe(true, 'The modal with the ID isn\'t displayed');

        modals.modalsText.getText().then(function() {
            modals.cancelDialog.click();
        });
    });

    it('bbb-642:myclass:Order and filters', function() {
        centermode.createHeadMaster({
            keepLogin: true
        });
        protractor.promise.all([myclass.createClass({
            name: 'c'
        }), myclass.createClass({
            name: 'a'
        }), myclass.createClass({
            name: 'b'
        })]).then(function(classes) {
            myclass.orderDropdown.click();
            myclass.orderDropdownName.click();
            expect(myclass.classesList.get(0).getText()).toMatch(classes[1].name, 'Classes name - 0');
            expect(myclass.classesList.get(1).getText()).toMatch(classes[2].name, 'Classes name - 1');
            expect(myclass.classesList.get(2).getText()).toMatch(classes[0].name, 'Classes name - 2');

            myclass.orderDropdown.click();
            myclass.orderDropdownLastFirst.click();
            expect(myclass.classesList.get(0).getText()).toMatch(classes[2].name, 'Classes lastFirst - 0');
            expect(myclass.classesList.get(1).getText()).toMatch(classes[1].name, 'Classes lastFirst - 1');
            expect(myclass.classesList.get(2).getText()).toMatch(classes[0].name, 'Classes lastFirst - 2');

            myclass.orderDropdown.click();
            myclass.orderDropdownOldFirst.click();
            expect(myclass.classesList.get(0).getText()).toMatch(classes[0].name, 'Classes oldFirst - 0');
            expect(myclass.classesList.get(1).getText()).toMatch(classes[1].name, 'Classes oldFirst - 1');
            expect(myclass.classesList.get(2).getText()).toMatch(classes[2].name, 'Classes oldFirst - 2');
        });
    });

    it('bbb-649:myclass:Check that the classId is visible', function() {
        centermode.createHeadMaster({
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