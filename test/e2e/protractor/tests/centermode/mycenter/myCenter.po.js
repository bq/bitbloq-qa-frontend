'use strict';
var Header = require('../../header/header.po.js'),
    Variables = require('../../commons/variables.js'),
    MyCenter = require('./myCenter.po.js'),
    ThirdPartyRobotsApi = require('../../commons/api/ThirdPartyRobotsApi.js'),
    Modals = require('../../modals/modals.po.js');

var header = new Header(),
    modals = new Modals(),
    vars = new Variables(),
    thirdPartyRobotsApi = new ThirdPartyRobotsApi(),
    flow = browser.controlFlow();

var MyCenter = function () {

    this.centerTeachersTab = $('[data-element="center-teachers-tab"]');
    this.centerSettingsTab = $('[data-element="center-settings-tab"]');
    this.centerInfoTab = $('[data-element="center-info-tab"]');

    this.centerInfoNameInput = $('[data-element="center-info-name"]');
    this.centerInfoAddressInput = $('[data-element="center-info-address"]');
    this.centerInfoPhoneInput = $('[data-element="center-info-phone"]');
    this.centerInfoEmailInput = $('[data-element="center-info-email"]');

    this.newTeacherButton = $('[data-element="centerMode_button_newTeacher"]');
    this.deleteTeacherButton = $('[data-element="centerMode-delete-teacher"]');
    this.teacherNotConfirmedText = $('[data-element="centerMode-teacher-notconfirmed"]');
    this.teacherElems = element.all(by.xpath('//*[contains(@data-element,"centerMode-teacher-link")]'));

    this.teacherDropdownOrder = $('[data-element="my_center_dropdown_order"]');
    this.teacherRecentDropdown = $('[data-element="my_center_dropdown_order-0"]');
    this.teacherEmailDropdown = $('[data-element="my_center_dropdown_order-1"]');
    this.teacherNameDropdown = $('[data-element="my_center_dropdown_order-2"]');
    this.teacherSurnameDropdown = $('[data-element="my_center_dropdown_order-3"]');
    this.teacherGroupsDropdown = $('[data-element="my_center_dropdown_order-4"]');
    this.teacherStudentsDropdown = $('[data-element="my_center_dropdown_order-5"]');

    //Settings tab
    this.activateMBotButton = $('[data-element="activate-robot-mBot"]');
    this.activateMRangerButton = $('[data-element="activate-robot-mRanger"]');
    this.activateStarterKitButton = $('[data-element="activate-robot-starterKit"]');

    //Toasts
    this.toastRobotActivated = $('[data-id="activatedError"]');

    this.url = '#/center-mode/center';

    this.get = function () {
        browser.get(this.url);
    };

    this.addNewTeacher = function (email) {
        header.navCenter.click();
        this.newTeacherButton.click();
        modals.inputEmailsTeacher.all(by.css('input')).get(0).sendKeys(email.toLowerCase());
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        modals.okDialog.click();
        browser.sleep(vars.timeToWaitFadeModals);
    };

    this.clearCodeInput = function () {
        modals.activateRobotCode1.clear();
        modals.activateRobotCode2.clear();
        modals.activateRobotCode3.clear();
        modals.activateRobotCode4.clear();
    };

    /**
     * options.robot = MBot
     */

    this.activateRobot = function (options) {
        options = options || {};
        header.navCenter.click();
        this.centerSettingsTab.click();
        this['activate' + options.robot + 'Button'].click();

        flow.execute(thirdPartyRobotsApi['get' + options.robot + 'CenterCode']).then(function (result) {

            modals.activateRobotCode1.sendKeys(result[0].code);
            modals.ok();
            expect(modals.activateRobotErrorText.isPresent()).toBe(false, 'Good code for mBot, error shouldnt appear');
        });

    };
};

module.exports = MyCenter;