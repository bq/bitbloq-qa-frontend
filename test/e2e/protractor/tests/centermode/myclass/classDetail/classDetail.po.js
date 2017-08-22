'use strict';

var ClassDetail = function() {

    this.studentsTab = $('[data-element="students-tab"]');
    this.exercisesTab = $('[data-element="exercises-tab"]');
    this.breadcrumbSubtext = $('[data-element="breadcrumb-subtext"]');
    this.closeClassButton = $('[data-element="centerMode-enrolment-button"]');

    this.moreActionsButton = $('[data-element="centerMode_button_moreActions"]');
    this.changeClassNameButton = $('[data-element="menu-change-name"]');
    this.archiveClassButton = $('[data-element="menu-archive-class"]');
    this.deleteClassButton = $('[data-element="menu-delete-class"]');

    this.getStudentsObjectInStudentsTable = function(username) {
        return $('[data-element="student-' + username.toLowerCase() + '"]');
    };
};

module.exports = ClassDetail;