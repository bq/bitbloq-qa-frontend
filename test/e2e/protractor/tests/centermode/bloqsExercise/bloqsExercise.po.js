'use strict';

var Variables = require('../../commons/variables.js');

var vars = new Variables();

var BloqsExercise = function () {

    this.name = $('[data-element="exercise-name"]');
    this.sendTaskButton = $('[data-element="send-task"]');
    this.savedMessageOK = $('[data-element="project-save-label-exercise-saved-ok"]');
    this.compileButton = $('[data-element="header-compile"]');
    this.uploadButton = $('[data-element="header-upload"]');

    //tabs
    this.hardwareTabButton = $('[data-element="hardware-tab"]');
    this.correctTabButton = $('[data-element="correct-tab"]');

    //Hardware Tab
    this.harwareToolboxRobots = $('[data-element="toolbox-robots"]');
    this.hardwareToolboxMBot = $('[data-element="toolbox-hardware-mbot"]');
    this.hardwareToolboxMRanger = $('[data-element="toolbox-hardware-rangerlandraider"]');
    this.hardwareToolboxStarterKit = $('[data-element="toolbox-hardware-startertank"]');


    //Mark Tab
    this.markNumberInput = $('[data-element="info-exercise-mark0"]');
    this.markDecimalInput = $('[data-element="info-exercise-mark1"]');
    this.markObservationsInput = $('[data-element="infotab-exercise-remark"]');
    this.sendMarkButton = $('[data-element="infotab-exercise-sendMark"]');

    this.url = '#/exercise';

    this.get = function () {
        browser.get(this.url);
    };

    this.addRobot = function (robot) {
        this.hardwareTabButton.click();
        this.harwareToolboxRobots.click();
        this['hardwareToolbox' + robot].click();
        browser.sleep(vars.timeToWaitAutoSave);
    };

    this.getRobotMainImage = function (robot) {
        return $('[data-element="current-robot-' + robot + '"]');
    };

    this.getBoardMainImage = function (board) {
        return $('[data-element="current-board-' + board + '"]');
    };
};

module.exports = BloqsExercise;