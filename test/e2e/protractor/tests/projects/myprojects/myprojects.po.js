/**
 * Page objects of myprojects.html
 */
'use strict';

var Myprojects = function() {

    this.eliminateMyProjects = $('[data-element="eliminate-myproject"]');
    this.overMyProjects = $('[data-element="over-project"]');
    this.openProject = $('[data-element="myprojects-open-project"]');
    this.newProject = $('[data-element="projects-new-project"]');

    this.copyProject = $('[data-element="myProjects-copy-project"]');
    this.projectName = $('[data-element="projects-project-name"]');
    this.downloadIno = $('[data-element="myprojects-export-arduino-code-button"]');


};

module.exports = Myprojects;
