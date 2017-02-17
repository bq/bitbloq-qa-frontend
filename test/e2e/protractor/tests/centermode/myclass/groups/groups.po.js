'use strict';
var Header = require('../../header/header.po.js'),
    Variables = require('../../commons/variables.js'),
    MyClass = require('../myclass.po.js');

var header = new Header(),
    myclass = new MyClass(),
    vars = new Variables();

var Groups = function() {

    this.enrolmentButton = $('[data-element="centerMode-enrolment-button"]');

    this.url = '#/center-mode/student';

    this.get = function() {
        browser.get(this.url);
    };

    this.changeStateGroup = function(idGroup) {
        header.navClass.click();
        browser.sleep(vars.timeToWaitTab);
        myclass.groupsElems.filter(function(elem) {
          return elem.getText().then(function(text) {
            return text.includes(idGroup);
          });
        }).first().click();
        browser.sleep(vars.timeToWaitTab);
    };

};

module.exports = Groups;
