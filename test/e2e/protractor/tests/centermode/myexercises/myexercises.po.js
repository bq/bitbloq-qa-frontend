'use strict';
var Header = require('../../header/header.po.js'),
    Variables = require('../../commons/variables.js'),
    BloqsExercise = require('../bloqsExercise/bloqsExercise.po.js'),
    Modals = require('../../modals/modals.po.js');

var header = new Header(),
    modals = new Modals(),
    bloqsExercise = new BloqsExercise(),
    vars = new Variables();

var MyExercise = function() {
    var that = this;
    this.newExerciseButton = $('[data-element="centerMode_button_newExercise"]');

    this.url = '#/exercises';

    this.createExercise = function(options) {
        options = options || {};
        var exercise = {
            name: 'Exercise_' + Date.now()
        };

        header.navExercise.click();
        this.newExerciseButton.click();
        browser.sleep(vars.timeToWaitTab);

        return browser.getAllWindowHandles().then(function(handles) {

            browser.sleep(vars.timeToWaitTab);

            browser.switchTo().window(handles[1]);

            expect(browser.getCurrentUrl()).toMatch(/#\/exercise/);
            bloqsExercise.name.click();
            modals.inputModalChangeN.clear();
            modals.inputModalChangeN.sendKeys(exercise.name);
            modals.okDialog.click();
            browser.sleep(vars.timeToWaitAutoSave);
            expect(bloqsExercise.savedMessageOK.isDisplayed()).toBe(true, 'Error saving the exercise');
            return browser.close().then(function() {
                browser.switchTo().window(handles[0]);
                return exercise;
            });
        });
    };

};

module.exports = MyExercise;