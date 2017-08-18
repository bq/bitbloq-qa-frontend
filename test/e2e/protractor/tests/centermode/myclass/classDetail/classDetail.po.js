'use strict';

var ClassDetail = function() {

    this.studentsTab = $('[data-element="students-tab"]');
    this.exercisesTab = $('[data-element="exercises-tab"]');
    this.breadcrumbSubtext = $('[data-element="breadcrumb-subtext"]');
    this.closeClassButton = $('[data-element="centerMode-enrolment-button"]');

    this.getStudentsObjectInStudentsTable = function(username) {
        return $('[data-element="student-' + username.toLowerCase() + '"]');
    }
};

module.exports = ClassDetail;