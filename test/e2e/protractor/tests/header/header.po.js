/**
 *Page object to header.html
 */

'use strict';

var Header = function() {
    this.openHeaderMenu = $('[data-element="open-header-menu"]');
    this.changeLanguage = $('[data-element="header-change-language"]');
    this.menuLearn = $('[data-element="header-menu-learn"]');
    this.enterButton = $('[data-element="header-enterbutton"]');
    //navbar
    this.navLogo = $('[data-element="nav-logo"]');
    this.navProjects = $('[data-element="nav-projects"]');
    this.navExplore = $('[data-element="nav-explore"]');
    this.navLearn = $('[data-element="nav-learn"]');
    this.navForum = $('[data-element="nav-forum"]');

};

module.exports = Header;
