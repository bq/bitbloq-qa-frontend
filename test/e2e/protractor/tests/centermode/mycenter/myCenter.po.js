'use strict';
var Header = require('../../header/header.po.js'),
    Variables = require('../../commons/variables.js'),
    Modals = require('../../modals/modals.po.js');

var header = new Header(),
    modals = new Modals(),
    vars = new Variables();
var MyCenter = function() {

    this.newTeacherButton = $('[data-element="centerMode_button_newTeacher"]');
    this.teacherDropdownOrder = $('[data-element="my-center-dropdown-order"]');
    this.teacherEmailDropdown = $('[data-element="my-center-dropdown-email"]');
    this.teacherNameDropdown = $('[data-element="my-center-dropdown-name"]');
    this.teacherSurnameDropdown = $('[data-element="my-center-dropdown-surname"]');
    this.teacherGroupsDropdown = $('[data-element="my-center-dropdown-centerMode_column_groups"]');
    this.teacherStudentsDropdown = $('[data-element="my-center-dropdown-centerMode_column_students"]');
    this.url = '#/center-mode/center';

    this.get = function() {
        browser.get(this.url);
    };

    this.addNewTeacher = function(email) {
        header.navCenter.click();
        browser.sleep(vars.timeToWaitTab);
        this.newTeacherButton.click();
        modals.inputEmailsTeacher.all(by.css('input')).get(0).sendKeys(email.toLowerCase());
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.sleep(vars.timeToSendKeys);
        modals.okDialog.click();
        browser.sleep(vars.timeToWaitFadeModals);
    };
};

module.exports = MyCenter;
