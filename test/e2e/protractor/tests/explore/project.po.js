/**
 * Local Spec to explore.html
 */

'use strict';

var Project = function() {

    this.seeProjectButton = $('[data-element="explora-project-seebutton"]');
    this.downloadProjectButton = $('[data-element="explora-project-download"]');
    this.addProjectButton = $('[data-element="explore-project-addbutton"]');
    this.timesViewed = $('[data-element="project-times-viewed"]');
    this.timesAdded = $('[data-element="project-times-added"]');
};

module.exports = Project;
