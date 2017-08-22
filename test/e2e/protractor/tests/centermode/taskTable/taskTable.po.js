'use strict';
var TaskTable = function () {

    this.getTask = function (name) {
        return $('[data-element="task-' + name + '"]');
    };

    this.getTaskNameObject = function (name) {
        return $('[data-element="task-name-' + name + '"]');
    };

    this.getTaskButton = function (name) {
        return $('[data-element="centerMode-button-showTask-' + name + '"]');
    };

    this.getTaskStatusObject = function (name) {
        return $('[data-element="centerMode-task-status-' + name + '"]');
    };

};

module.exports = TaskTable;