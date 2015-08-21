/**
 * Page objects of alerts.html
 */
'use strict';

//TODO , check alert && add data-element
var Alerts = function() {

    this.alert = element(by.binding('alert.text'));
};

module.exports = Alerts;
