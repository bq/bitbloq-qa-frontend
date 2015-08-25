/**
 *Page object to ficha de un project
 *
 */

'use strict';

var Project = function() {
    //This elements are public (this) by reuse
    this.name = $('[data-element="project-name"]');

};

module.exports = Project;
