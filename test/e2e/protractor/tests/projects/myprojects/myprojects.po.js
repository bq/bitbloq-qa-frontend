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
    //Dropdown order
    this.dropDownOrder = $('[data-element="my-proyects-dropdown-order"]');
    this.dropDownOrderSortRecent = $('[data-element="explore-sortby-recent"]');
    this.dropDownOrderSortOld = $('[data-element="explore-sortby-old"]');
    this.dropDownOrderSortNameAZ = $('[data-element="explore-sortby-name-az"]');
    this.dropDownOrderSortNameZA = $('[data-element="explore-sortby-name-za"]');
    this.timeTag = $('[data-element="myprojects-time-tag"]');
    this.renameProject = $('[data-element="myprojects-rename-project"]');
    this.url = '#/projects';
    this.get = function() {
        browser.get(this.url);
    };


};

module.exports = Myprojects;
