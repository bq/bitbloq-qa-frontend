/**
 * P.O hardwareTab.html
 */

'use strict';

var HwTab = function() {

    this.hwContextMenuDuplicate = $('[data-element="hw-contextmenu-duplicate"]');
    this.hwContextMenuDeleteBoard = $('[data-element="hw-contextmenu-board-delete"]');
    this.hwContextMenuDisconnect = $('[data-element="hw-contextmenu-disconnect"]');

    //ROBOTS
    this.hwContextMenuDeleteRobot = $('[data-element="hw-contextmenu-robot-delete"]');

    //COMPONENT
    this.hwContextMenuDeleteComponent = $('[data-element="hw-contextmenu-component-delete"]');

    this.sampleBoton = $('[data-name="boton_0"]');

};

module.exports = HwTab;
