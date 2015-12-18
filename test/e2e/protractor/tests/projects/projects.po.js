/**
 *  Page objects para la tab de projects, es decir, para la pestaña de mis proyectos
 *
 */


'use strict';


var Projects = function() {

    this.projectsName = $('[data-element="projects-project-name"]');
    this.findBar = $('[data-element="projects-find"]');
    this.listProject = $('[data-element="projects-list-project"]');
    this.project = $('[data-element="projects-project"]');
    this.newProject = $('[data-element="projects-new-project"]');
    this.sharedProjects = $('[data-element="projects-shared-projects"]');

    this.get = function() {
        browser.get('#/projects');
    };

    this.getProjectCount = function() {
        return this.listProject.all(by.xpath('//*[@data-element="projects-project"]')).count();

    };

    this.createNewProject = function() {
        this.newProject.click();
    };
};

module.exports = Projects;
