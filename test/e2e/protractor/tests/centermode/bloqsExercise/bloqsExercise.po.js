'use strict';

var BloqsExercise = function () {

    this.name = $('[data-element="exercise-name"]');
    this.sendTaskButton = $('[data-element="send-task"]');
    this.savedMessageOK = $('[data-element="project-save-label-exercise-saved-ok"]');
    this.correctTabButton = $('[data-element="correct-tab"]');

    this.markNumberInput = $('[data-element="info-exercise-mark0"]');
    this.markDecimalInput = $('[data-element="info-exercise-mark1"]');
    this.markObservationsInput = $('[data-element="infotab-exercise-remark"]');
    this.sendMarkButton = $('[data-element="infotab-exercise-sendMark"]');




    this.url = '#/exercise';

    this.get = function () {
        browser.get(this.url);
    };
};

module.exports = BloqsExercise;