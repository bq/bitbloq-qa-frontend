'use strict';
var Header = require('../../header/header.po.js'),
    Variables = require('../../commons/variables.js'),
    Modals = require('../../modals/modals.po.js');

var header = new Header(),
    modals = new Modals(),
    vars = new Variables();

var TaskTable = function() {

    this.getTask = function(name) {
        return $('[data-element="task-' + name + '"]');
    }

    this.getTaskNameObject = function(name) {
        return $('[data-element="task-name-' + name + '"]');
    }
};

module.exports = TaskTable;