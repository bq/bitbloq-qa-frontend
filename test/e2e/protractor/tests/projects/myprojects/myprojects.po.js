/**
 * Page objects of myprojects.html
 */
'use strict';

var Myprojects = function() {

    this.eliminateMyProjects = $('[data-element="eliminate-myproject"]');
    this.overMyProjects = $('[data-element="over-project"]');
    this.openProject = $('[data-element="myprojects-open-project"]');
    this.newProject = $('[data-element="projects-new-project"]');
};

module.exports = Myprojects;
