'use strict';

var BloqsExercise = function() {

    this.name = $('[data-element="exercise-name"]');
    this.savedMessageOK = $('[data-element="project-save-label-exercise-saved-ok"]');

    this.url = '#/exercise';

    this.get = function() {
        browser.get(this.url);
    };
};

module.exports = BloqsExercise;