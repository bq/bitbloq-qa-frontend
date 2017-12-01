/**
 *  Page objects para la tab de projects, es decir, para la pestaña de mis proyectos
 *
 */

'use strict';

var Projects = function () {

    this.projectsName = $('[data-element="projects-project-name"]');
    this.findBar = $('[data-element="projects-find"]');
    this.listProject = $('[data-element="projects-list-project"]');
    this.project = $('[data-element="projects-project"]');
    this.newProject = $('[data-element="projects-new-project"]');
    this.sharedProjects = $('[data-element="projects-shared-projects"]');
    this.trashProjects = $('[data-element="projects-trash-projects"]');
    this.trashCount = $('[data-element="trash-count"]');
    this.eliminate4ever = $('[data-element="eliminate-4ever"]');
    this.restoreProject = $('[data-element="myprojects-restore-project"]');
    this.myprojectsTab = $('[data-element="projects-myprojects-projects"]');
    this.get = function () {
        browser.get('#/projects');
    };

    this.getProjectCount = function () {
        return this.listProject.all(by.xpath('//*[@data-element="projects-project"]')).count();
    };

    this.getTrashCount = function () {
        return this.listProject.all(by.xpath('//*[@data-element="projects-trash"]')).count();

    };

    this.getTrashObject = function (projectInfo) {
        return $('[data-element2="trash-' + projectInfo.name + '"]');
    };

    this.getElementFromTrashMenu = function (element) {
        return $('[data-element="trash-' + element + '"]');
    };

    this.getTrashOptions = function (name) {
        return $('[data-element="trash-' + name + '-options"]');
    };

    this.createNewProject = function () {
        this.newProject.click();
    };
};

module.exports = Projects;