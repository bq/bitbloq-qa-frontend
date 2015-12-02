/**
 *Page object to header.html
 */

'use strict';

var Header = function() {
    this.openHeaderMenu = $('[data-element="open-header-menu"]');
    this.changeLanguage = $('[data-element="header-change-language"]');
    this.menuLearn = $('[data-element="header-menu-learn"]');
    this.newProject = $('[data-element="header-new-project"]');
    this.enterButton = $('[data-element="header-enterbutton"]');
    //navbar
    this.navLogo = $('[data-element="nav-logo"]');
    this.navMake = $('[data-element="nav-make"]');
    this.navProjects = $('[data-element="nav-projects"]');
    this.navExplore = $('[data-element="nav-explore"]');
    this.navLearn = $('[data-element="nav-learn"]');
    this.navHelp = $('[data-element="nav-help"]');

    this.createNewProject = function() {
        this.newProject.click();
    };
};

module.exports = Header;
