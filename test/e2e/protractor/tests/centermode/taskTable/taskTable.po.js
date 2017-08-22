'use strict';
var TaskTable = function() {

    this.getTask = function(name) {
        return $('[data-element="task-' + name + '"]');
    };

    this.getTaskNameObject = function(name) {
        return $('[data-element="task-name-' + name + '"]');
    };
};

module.exports = TaskTable;