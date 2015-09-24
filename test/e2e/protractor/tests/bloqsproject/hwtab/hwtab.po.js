/**
 * P.O hardwareTab.html
 */

'use strict';

var HwTab = function() {

    this.hwContextMenuDuplicate = $('[data-element="hw-contextmenu-duplicate"]');
    this.hwContextMenuDelete = $('[data-element="hw-contextmenu-delete"]');
    this.hwContextMenuDisconnect = $('[data-element="hw-contextmenu-disconnect"]');

    this.sampleLed = $('[data-name="Led_1"]');
    this.sampleServo = $('[data-name="Servo_1"]');

};

module.exports = HwTab;