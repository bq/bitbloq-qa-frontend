/**
 * P.O hardwareTab.html
 */

'use strict';

var HwTab = function() {

	//BOARDS
    this.hwContextMenuBoard = $('[id="board-context-menu"]');
    this.hwContextMenuDeleteBoard = $('[data-element="hw-contextmenu-board-delete"]');
    this.hwContextMenuDisconnectBoard = $('[data-element="hw-contextmenu-board-disconnect"]');

    //ROBOTS
    this.hwContextMenuRobot = $('[id="robot-context-menu"]');
    this.hwContextMenuDeleteRobot = $('[data-element="hw-contextmenu-robot-delete"]');

    //COMPONENT
    this.hwContextMenuComponent = $('[id="component-context-menu"]');
    this.hwContextMenuDeleteComponent = $('[data-element="hw-contextmenu-component-delete"]');
    this.hwContextMenuDisconnectComponent = $('[data-element="hw-contextmenu-component-disconnect"]');
    this.hwContextMenuDuplicateComponent = $('[data-element="hw-contextmenu-component-duplicate"]');
    this.boardsTab = $('[data-element="toolbox-boards"]');
    this.robotsTab = $('[data-element="toolbox-robots"]');
    this.boardsElem = element.all(by.repeater('board in hardware.boardList'));
    this.robotsElem = element.all(by.repeater('robot in hardware.robotList'));
    this.hwComponentNameInput = $('[data-element="hwtab-componentName-input"]');
    this.sampleBoton = $('[data-name="boton_0"]');
    this.lightSensor = $('[data-name="sensor_de_luz_0"]');
    this.bluetoothComp0 = $('[data-name="bluetooth_0"]');
    this.bluetoothComp1 = $('[data-name="bluetooth_0_2"]');

};

module.exports = HwTab;
