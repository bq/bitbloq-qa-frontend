/**
 * Page objects of myprojects.html
 */
'use strict';

var Myprojects = function() {

    this.eliminateMyProjects = $('[data-element="eliminate-myproject"]');
    this.overMyProjects = $('[data-element="over-project"]');
    this.openProject = $('[data-element="myprojects-open-project"]');
};

module.exports = Myprojects;
