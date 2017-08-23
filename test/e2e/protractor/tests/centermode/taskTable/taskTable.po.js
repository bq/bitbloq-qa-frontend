'use strict';
var TaskTable = function () {

    this.getTaskByExerciseName = function (name) {
        return $('[data-element="task-' + name + '"]');
    };

    this.getTaskByStudentName = function (name) {
        return $('[data-element2="task-' + name.toLowerCase() + '"]');
    };

    this.getTaskNameObject = function (name) {
        return $('[data-element="task-name-' + name + '"]');
    };

    this.getTaskButton = function (name) {
        return $('[data-element="centerMode-button-showTask-' + name + '"]');
    };

    this.getTaskButtonByUserName = function (userName) {
        return $('[data-element2="centerMode-button-showTask-' + userName.toLowerCase() + '"]');
    };

    this.getTaskStatusObjectByExerciseName = function (name) {
        return $('[data-element="centerMode-task-status-' + name + '"]');
    };

    this.getTaskStatusObjectByUserName = function (userName) {
        return $('[data-element2="center-mode-task-status-' + userName.toLowerCase() + '"]');
    };

};

module.exports = TaskTable;