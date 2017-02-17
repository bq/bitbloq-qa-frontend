'use strict';
var Header = require('../../header/header.po.js'),
    Variables = require('../../commons/variables.js'),
    Modals = require('../../modals/modals.po.js');

var header = new Header(),
    modals = new Modals(),
    vars = new Variables();
var MyClass = function() {

    this.newGroupButton = $('[data-element="centerMode_button_newGroup"]');
    this.groupsElems = element.all(by.xpath('//*[contains(@data-element,"centerMode-groups-link")]'));

    this.url = '#/center-mode/teacher';

    this.get = function() {
        browser.get(this.url);
    };

    this.addNewGroup = function(nameGroup,nameCenter) {
        header.navClass.click();
        browser.sleep(vars.timeToWaitTab);
        this.newGroupButton.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.inputModalNoChangeN.sendKeys(nameGroup);
        browser.sleep(vars.timeToSendKeys);
        return modals.dropdown.isPresent().then(function(present) {
          if(present) {
            modals.dropdown.click();
            element.all(by.xpath('//*[contains(@data-element,"my-center-dropdown")]')).each(function(elem) {
              elem.getText().then(function(text) {
                if (text === nameCenter) {
                  elem.click();
                }
              });
            });
          }
          modals.okDialog.click();
          browser.sleep(vars.timeToWaitFadeModals);
          return modals.modalsText.getText().then(function(id) {
            modals.cancelDialog.click();
            browser.sleep(vars.timeToWaitFadeModals);
            return id;
          });
        });

    };
};

module.exports = MyClass;
