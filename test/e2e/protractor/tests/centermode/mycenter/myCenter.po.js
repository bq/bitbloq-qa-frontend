'use strict';
var Header = require('../../header/header.po.js'),
    Variables = require('../../commons/variables.js'),
    Modals = require('../../modals/modals.po.js');

var header = new Header(),
    modals = new Modals(),
    vars = new Variables();
var MyCenter = function() {

    this.newTeacherButton = $('[data-element="centerMode_button_newTeacher"]');
    this.deleteTeacherButton = $('[data-element="centerMode-delete-teacher"]');
    this.teacherElems = element.all(by.xpath('//*[contains(@data-element,"centerMode-teacher-link")]'));

    this.teacherDropdownOrder = $('[data-element="my_center_dropdown_order"]');
    this.teacherRecentDropdown = $('[data-element="my_center_dropdown_order-0"]');
    this.teacherEmailDropdown = $('[data-element="my_center_dropdown_order-1"]');
    this.teacherNameDropdown = $('[data-element="my_center_dropdown_order-2"]');
    this.teacherSurnameDropdown = $('[data-element="my_center_dropdown_order-3"]');
    this.teacherGroupsDropdown = $('[data-element="my_center_dropdown_order-4"]');
    this.teacherStudentsDropdown = $('[data-element="my_center_dropdown_order-5"]');

    this.url = '#/center-mode/center';

    this.get = function() {
        browser.get(this.url);
    };

    this.addNewTeacher = function(email) {
        header.navCenter.click();
        this.newTeacherButton.click();
        modals.inputEmailsTeacher.all(by.css('input')).get(0).sendKeys(email.toLowerCase());
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        modals.okDialog.click();
        browser.sleep(vars.timeToWaitFadeModals);
    };
};

module.exports = MyCenter;
