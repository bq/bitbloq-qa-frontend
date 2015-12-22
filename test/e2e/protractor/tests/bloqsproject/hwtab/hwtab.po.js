/**
 * P.O hardwareTab.html
 */

'use strict';

var HwTab = function() {


    this.hwContextMenuDeleteBoard = $('[data-element="hw-contextmenu-board-delete"]');
    this.hwContextMenuDisconnectBoard = $('[data-element="hw-contextmenu-board-disconnect"]');

    //ROBOTS
    this.hwContextMenuDeleteRobot = $('[data-element="hw-contextmenu-robot-delete"]');

    //COMPONENT
    this.hwContextMenuDeleteComponent = $('[data-element="hw-contextmenu-component-delete"]');
    this.hwContextMenuDisconnectComponent = $('[data-element="hw-contextmenu-component-disconnect"]');
    this.hwContextMenuDuplicateComponent = $('[data-element="hw-contextmenu-component-duplicate"]');
    this.sampleBoton = $('[data-name="boton_0"]');

};

module.exports = HwTab;
