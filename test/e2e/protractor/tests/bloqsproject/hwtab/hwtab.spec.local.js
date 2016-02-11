/**
 *Spec to hwtab.spec.js
 * hardwareTab tests
 */

'use strict';

var GlobalFunctions = require('../../commons/globalFunctions.js'),
    Hwtab = require('./hwtab.po.js'),
    Make = require('../make.po.js'),
    Login = require('../../login/login.po.js'),
    path = require('path');

var globalFunctions = new GlobalFunctions(),
    hwtab = new Hwtab(),
    make = new Make(),
    login = new Login();

globalFunctions.xmlReport('bloqsprojectHardwareLocal');

describe('Hardware tab testing from local for contextual menu to ', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bba-22:Check menu options', function() {
        //component contextual menu
        make.importFileNewUser(path.resolve() + '/test/e2e/protractor/res/Bluetooth_Bloqs.json');
        expect(hwtab.hwContextMenuComponent.getAttribute('style')).toMatch('display: none;');
        browser.actions().mouseMove(hwtab.bluetoothComp0).perform();
        browser.actions().click(protractor.Button.RIGHT).perform();
        expect(hwtab.hwContextMenuComponent.getAttribute('style')).toMatch('display: block;');
        expect(hwtab.hwContextMenuDuplicateComponent.isPresent()).toBe(true);
        expect(hwtab.hwContextMenuDeleteComponent.isPresent()).toBe(true);
        expect(hwtab.hwContextMenuDisconnectComponent.isPresent()).toBe(true);
        expect(hwtab.hwContextMenuDisconnectComponent.getAttribute('aria-hidden')).toBe('false');
        //disconect component and check again contextual menu
        hwtab.hwContextMenuDisconnectComponent.click();
        expect(hwtab.hwContextMenuComponent.getAttribute('style')).toMatch('display: none;');
        browser.actions().mouseMove(hwtab.bluetoothComp0).perform();
        browser.actions().click(protractor.Button.RIGHT).perform();
        expect(hwtab.hwContextMenuComponent.getAttribute('style')).toMatch('display: block;');
        expect(hwtab.hwContextMenuDuplicateComponent.isPresent()).toBe(true);
        expect(hwtab.hwContextMenuDeleteComponent.isPresent()).toBe(true);
        expect(hwtab.hwContextMenuDisconnectComponent.getAttribute('aria-hidden')).toBe('true');
        //board contextual menu
        make.importFileUser(path.resolve() + '/test/e2e/protractor/res/Bluetooth_Bloqs.json');
        //expect(hwtab.hwContextMenuBoard.getAttribute('style')).toMatch('display: none;');

        browser.actions().mouseMove(element(by.id('boardSchema'))).perform();
        browser.actions().click(protractor.Button.RIGHT).perform();
        expect(hwtab.hwContextMenuBoard.getAttribute('style')).toMatch('display: block;');
        expect(hwtab.hwContextMenuDeleteBoard.isPresent()).toBe(true);
        expect(hwtab.hwContextMenuDisconnectBoard.isPresent()).toBe(true);
        expect(hwtab.hwContextMenuDisconnectBoard.getAttribute('aria-hidden')).toBe('false');
        //disconect board and check again
        hwtab.hwContextMenuDisconnectBoard.click();
        expect(hwtab.hwContextMenuBoard.getAttribute('style')).toMatch('display: none;');
        browser.actions().mouseMove(element(by.id('boardSchema'))).perform();
        browser.actions().click(protractor.Button.RIGHT).perform();
        expect(hwtab.hwContextMenuBoard.getAttribute('style')).toMatch('display: block;');
        expect(hwtab.hwContextMenuDeleteBoard.isPresent()).toBe(true);
        expect(hwtab.hwContextMenuDisconnectBoard.isPresent()).toBe(true);
        expect(hwtab.hwContextMenuDisconnectBoard.getAttribute('aria-hidden')).toBe('true');

        //robot contextual menu
        make.importFileUser(path.resolve() + '/test/e2e/protractor/res/zowibloqs.json');
        browser.actions().mouseMove(element(by.id('robotSchema'))).perform();
        browser.actions().click(protractor.Button.RIGHT).perform();
        expect(hwtab.hwContextMenuRobot.getAttribute('style')).toMatch('display: block;');
        expect(hwtab.hwContextMenuDeleteRobot.isPresent()).toBe(true);

        login.logout();

    });

    //Testing menu contextual for board
    it('bba-313:Remove board', function() {
        var name = 'Arduino_Bloqs';
        make.importFileNewUser(path.resolve() + '/test/e2e/protractor/res/' + name + '.json');
        browser.actions().mouseMove(element(by.id('boardSchema'))).perform();
        browser.actions().click(protractor.Button.RIGHT).perform();
        hwtab.hwContextMenuDeleteBoard.click();
        expect(element(by.css('.ArduinoUNO')).isPresent()).toBe(false);
        login.logout();
    });

    //Testing menu contextual for component
    it('bba-169:Duplicate a component', function() {
        make.importFileNewUser(path.resolve() + '/test/e2e/protractor/res/Bluetooth_Bloqs.json');
        browser.actions().mouseMove(hwtab.bluetoothComp0).perform();
        browser.actions().click(protractor.Button.RIGHT).perform();
        hwtab.hwContextMenuDuplicateComponent.click();
        expect(hwtab.bluetoothComp0.getAttribute('src')).toMatch(hwtab.bluetoothComp1.getAttribute('src'));
        login.logout();
    });

    it('bba-314:Disconnect a component', function() {
        make.importFileNewUser(path.resolve() + '/test/e2e/protractor/res/Bluetooth_Bloqs.json');
        browser.actions().mouseMove(hwtab.bluetoothComp0).perform();
        browser.actions().click(protractor.Button.RIGHT).perform();
        expect(globalFunctions.hasClass(hwtab.bluetoothComp0, 'jsplumb-connected')).toBe(true);
        hwtab.hwContextMenuDisconnectComponent.click();
        expect(globalFunctions.hasClass(hwtab.bluetoothComp0, 'jsplumb-connected')).toBe(false);
        login.logout();
    });

    it('bba-315:Remove a component', function() {
        make.importFileNewUser(path.resolve() + '/test/e2e/protractor/res/Bluetooth_Bloqs.json');
        browser.actions().mouseMove(hwtab.bluetoothComp0).perform();
        browser.actions().click(protractor.Button.RIGHT).perform();
        hwtab.hwContextMenuDeleteComponent.click();
        expect(hwtab.bluetoothComp0.isPresent()).toBe(false);
        login.logout();
    });

});
