'use strict';
var Header = require('../../header/header.po.js'),
    Variables = require('../../commons/variables.js'),
    Modals = require('../../modals/modals.po.js');

var header = new Header(),
    modals = new Modals(),
    vars = new Variables();

var BloqsExercise = function() {

    this.name = $('[data-element="exercise-name"]');
    this.savedMessageOK = $('[data-element="project-save-label-exercise-saved-ok"]');

    this.url = '#/exercise';

    this.get = function() {
        browser.get(this.url);
    };
};

module.exports = BloqsExercise;