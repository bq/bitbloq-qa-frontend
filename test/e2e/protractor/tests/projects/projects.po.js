/**
 *  Page objects para la tab de projects, es decir, para la pestaña de mis proyectos
 *
 */


'use strict';


var Projects = function() {

    this.projectsName = $('[data-element="projects-project-name"]');
    this.findBar = $('[data-element="projects-find"]');
    this.listProject = $('[data-element="projects-list-project"]');
    
    this.get = function() {
        browser.get('#/projects');
    };
};

module.exports = Projects;
