'use strict';

var Variables = require('../../commons/variables.js'),
    GlobalFunctions = require('../../commons/globalFunctions.js'),
    Make = require('../../bloqsproject/make.po.js'),
    Login = require('../../login/login.po.js'),
    Explore = require('../explore.po.js'),
    path = require('path');

var vars = new Variables(),
    globalFunctions = new GlobalFunctions(),
    login = new Login(),
    explore = new Explore(),
    make = new Make();

globalFunctions.xmlReport('explorefiltersLocal');

describe('Menu file of MakeActions, specs only in local ', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bba-145:Comprobar el filtrado de componentes uno a uno', function() {

        //Name project published
        var nameUltrasonidosProject,
            nameBluetoothProject,
            nameBotonProject,
            nameBotoneraProject,
            nameSensorInfrarojosProject,
            nameJoystickProject,
            nameLCDProject,
            nameLedProject,
            nameSensorLuzProject,
            namePotenciometroProject,
            namePuertoSerieProject,
            nameServoProject,
            nameServoContinuoProject,
            nameLedRGBProject,
            nameSensorSonidosProject,
            nameRelojDeTiempoRealProject,
            nameSensorDeHumedadProject,
            nameEncoderProject,
            nameFinDeCarreraProject,
            nameZumbadorProject;


        /********  PUBLISH PROJECT WITH DIFFERENTS COMPONENTES ***********/

        make.importFileNewUser(path.resolve() + '/test/e2e/protractor/res/Ultrasonidos_Bloqs.json');
        nameUltrasonidosProject = 'Ultrasonidos_Bloqs' + Number(new Date());
        make.publishProjectWithName(nameUltrasonidosProject);
        browser.sleep(vars.timeToWaitAutoSave);

        make.importFileUser(path.resolve() + '/test/e2e/protractor/res/Bluetooth_Bloqs.json');
        nameBluetoothProject = 'Bluetooth_Bloqs' + Number(new Date());
        make.publishProjectWithName(nameBluetoothProject);
        browser.sleep(vars.timeToWaitAutoSave);

        make.importFileUser(path.resolve() + '/test/e2e/protractor/res/Boton_Bloqs.json');
        nameBotonProject = 'Boton_Bloqs' + Number(new Date());
        make.publishProjectWithName(nameBotonProject);
        browser.sleep(vars.timeToWaitAutoSave);

        make.importFileUser(path.resolve() + '/test/e2e/protractor/res/Botonera_Bloqs.json');
        nameBotoneraProject = 'Botonera_Bloqs' + Number(new Date());
        make.publishProjectWithName(nameBotoneraProject);
        browser.sleep(vars.timeToWaitAutoSave);

        make.importFileUser(path.resolve() + '/test/e2e/protractor/res/SensorInfrarojos_Bloqs.json');
        nameSensorInfrarojosProject = 'SensorInfrarojos_Bloqs' + Number(new Date());
        make.publishProjectWithName(nameSensorInfrarojosProject);
        browser.sleep(vars.timeToWaitAutoSave);

        make.importFileUser(path.resolve() + '/test/e2e/protractor/res/Joystick_Bloqs.json');
        nameJoystickProject = 'Joystick_Bloqs' + Number(new Date());
        make.publishProjectWithName(nameJoystickProject);
        browser.sleep(vars.timeToWaitAutoSave);

        make.importFileUser(path.resolve() + '/test/e2e/protractor/res/LCD_Bloqs.json');
        nameLCDProject = 'LCD_Bloqs' + Number(new Date());
        make.publishProjectWithName(nameLCDProject);
        browser.sleep(vars.timeToWaitAutoSave);

        make.importFileUser(path.resolve() + '/test/e2e/protractor/res/Led_Bloqs.json');
        nameLedProject = 'Led_Bloqs' + Number(new Date());
        make.publishProjectWithName(nameLedProject);
        browser.sleep(vars.timeToWaitAutoSave);

        make.importFileUser(path.resolve() + '/test/e2e/protractor/res/SensorLuz_Bloqs.json');
        nameSensorLuzProject = 'SensorLuz_Bloqs' + Number(new Date());
        make.publishProjectWithName(nameSensorLuzProject);
        browser.sleep(vars.timeToWaitAutoSave);

        make.importFileUser(path.resolve() + '/test/e2e/protractor/res/Potenciometro_Bloqs.json');
        namePotenciometroProject = 'Potenciometro_Bloqs' + Number(new Date());
        make.publishProjectWithName(namePotenciometroProject);
        browser.sleep(vars.timeToWaitAutoSave);

        make.importFileUser(path.resolve() + '/test/e2e/protractor/res/PuertoSerie_Bloqs.json');
        namePuertoSerieProject = 'PuertoSerie_Bloqs' + Number(new Date());
        make.publishProjectWithName(namePuertoSerieProject);
        browser.sleep(vars.timeToWaitAutoSave);

        make.importFileUser(path.resolve() + '/test/e2e/protractor/res/Servo_Bloqs.json');
        nameServoProject = 'Servo_Bloqs' + Number(new Date());
        make.publishProjectWithName(nameServoProject);
        browser.sleep(vars.timeToWaitAutoSave);

        make.importFileUser(path.resolve() + '/test/e2e/protractor/res/ServoContinuo_Bloqs.json');
        nameServoContinuoProject = 'ServoContinuo_Bloqs.json' + Number(new Date());
        make.publishProjectWithName(nameServoContinuoProject);
        browser.sleep(vars.timeToWaitAutoSave);

        make.importFileUser(path.resolve() + '/test/e2e/protractor/res/Zumbador_Bloqs.json');
        nameZumbadorProject = 'Zumbador_Bloqs.json' + Number(new Date());
        make.publishProjectWithName(nameZumbadorProject);
        browser.sleep(vars.timeToWaitAutoSave);

        //led RGB
        make.importFileUser(path.resolve() + '/test/e2e/protractor/res/LedRGB_Bloqs.json');
        nameLedRGBProject = 'LedRGB_Bloqs.json' + Number(new Date());
        make.publishProjectWithName(nameLedRGBProject);
        browser.sleep(vars.timeToWaitAutoSave);
        //sensor sonidos
        make.importFileUser(path.resolve() + '/test/e2e/protractor/res/SensorSonidos_Bloqs.json');
        nameSensorSonidosProject = 'SensorSonidos_Bloqs.json' + Number(new Date());
        make.publishProjectWithName(nameSensorSonidosProject);
        browser.sleep(vars.timeToWaitAutoSave);
        //reloj de tiempo real
        make.importFileUser(path.resolve() + '/test/e2e/protractor/res/RelojDeTiempoReal_Bloqs.json');
        nameRelojDeTiempoRealProject = 'RelojDeTiempoReal_Bloqs.json' + Number(new Date());
        make.publishProjectWithName(nameRelojDeTiempoRealProject);
        browser.sleep(vars.timeToWaitAutoSave);
        //sensor de humedad
        make.importFileUser(path.resolve() + '/test/e2e/protractor/res/SensorDeHumedad_Bloqs.json');
        nameSensorDeHumedadProject = 'SensorDeHumedad_Bloqs.json' + Number(new Date());
        make.publishProjectWithName(nameSensorDeHumedadProject);
        browser.sleep(vars.timeToWaitAutoSave);
        //encoder
        make.importFileUser(path.resolve() + '/test/e2e/protractor/res/Encoder_Bloqs.json');
        nameEncoderProject = 'Encoder_Bloqs.json' + Number(new Date());
        make.publishProjectWithName(nameEncoderProject);
        browser.sleep(vars.timeToWaitAutoSave);
        //fin de carrera
        make.importFileUser(path.resolve() + '/test/e2e/protractor/res/FinDeCarrera_Bloqs.json');
        nameFinDeCarreraProject = 'FinDeCarrera_Bloqs.json' + Number(new Date());
        make.publishProjectWithName(nameFinDeCarreraProject);
        browser.sleep(vars.timeToWaitAutoSave);

        /********  EXPLORE WHIT FILTER **************************
         *  Check checkbox and find project with this components *
         * *******************************************************/

        explore.get();
        explore.exploreFilterDrowdown.click();

        // Row 0 -->  Sin componentes
        // Sensor Ultrasonidos'
        element.all(by.repeater('compFilter in componentsFilterOptions').row(1).column('compFilter.option')).click();
        browser.sleep(vars.timeToWaitAutoSave);
        explore.exploreFind.clear().sendKeys(nameUltrasonidosProject).then(function() {
            expect(explore.projectElem.getText()).toMatch(nameUltrasonidosProject);
        });

        // Bluetooth
        element.all(by.repeater('compFilter in componentsFilterOptions').row(0).column('compFilter.option')).click();
        element.all(by.repeater('compFilter in componentsFilterOptions').row(2).column('compFilter.option')).click();
        browser.sleep(vars.timeToWaitAutoSave);
        explore.exploreFind.clear().sendKeys(nameBluetoothProject).then(function() {
            expect(explore.projectElem.getText()).toMatch(nameBluetoothProject);
        });

        // Botón
        element.all(by.repeater('compFilter in componentsFilterOptions').row(0).column('compFilter.option')).click();
        element.all(by.repeater('compFilter in componentsFilterOptions').row(3).column('compFilter.option')).click();
        browser.sleep(vars.timeToWaitAutoSave);
        explore.exploreFind.clear().sendKeys(nameBotonProject).then(function() {
            expect(explore.projectElem.getText()).toMatch(nameBotonProject);
        });

        // Botonera
        element.all(by.repeater('compFilter in componentsFilterOptions').row(0).column('compFilter.option')).click();
        element.all(by.repeater('compFilter in componentsFilterOptions').row(4).column('compFilter.option')).click();
        browser.sleep(vars.timeToWaitAutoSave);
        explore.exploreFind.clear().sendKeys(nameBotoneraProject).then(function() {
            expect(explore.projectElem.getText()).toMatch(nameBotoneraProject);
        });

        // Sensor infrarrojos
        element.all(by.repeater('compFilter in componentsFilterOptions').row(0).column('compFilter.option')).click();
        element.all(by.repeater('compFilter in componentsFilterOptions').row(5).column('compFilter.option')).click();
        browser.sleep(vars.timeToWaitAutoSave);
        explore.exploreFind.clear().sendKeys(nameSensorInfrarojosProject).then(function() {
            expect(explore.projectElem.getText()).toMatch(nameSensorInfrarojosProject);
        });

        // Joystick
        element.all(by.repeater('compFilter in componentsFilterOptions').row(0).column('compFilter.option')).click();
        element.all(by.repeater('compFilter in componentsFilterOptions').row(6).column('compFilter.option')).click();
        browser.sleep(vars.timeToWaitAutoSave);
        explore.exploreFind.clear().sendKeys(nameJoystickProject).then(function() {
            expect(explore.projectElem.getText()).toMatch(nameJoystickProject);
        });

        // LCD
        element.all(by.repeater('compFilter in componentsFilterOptions').row(0).column('compFilter.option')).click();
        element.all(by.repeater('compFilter in componentsFilterOptions').row(7).column('compFilter.option')).click();
        browser.sleep(vars.timeToWaitAutoSave);
        explore.exploreFind.clear().sendKeys(nameLCDProject).then(function() {
            expect(explore.projectElem.getText()).toMatch(nameLCDProject);
        });

        // LED
        element.all(by.repeater('compFilter in componentsFilterOptions').row(0).column('compFilter.option')).click();
        element.all(by.repeater('compFilter in componentsFilterOptions').row(8).column('compFilter.option')).click();
        browser.sleep(vars.timeToWaitAutoSave);
        explore.exploreFind.clear().sendKeys(nameLedProject).then(function() {
            expect(explore.projectElem.getText()).toMatch(nameLedProject);
        });

        // Sensor de luz
        element.all(by.repeater('compFilter in componentsFilterOptions').row(0).column('compFilter.option')).click();
        element.all(by.repeater('compFilter in componentsFilterOptions').row(9).column('compFilter.option')).click();
        browser.sleep(vars.timeToWaitAutoSave);
        explore.exploreFind.clear().sendKeys(nameSensorLuzProject).then(function() {
            expect(explore.projectElem.getText()).toMatch(nameSensorLuzProject);
        });

        // Potenciómetro
        element.all(by.repeater('compFilter in componentsFilterOptions').row(0).column('compFilter.option')).click();
        element.all(by.repeater('compFilter in componentsFilterOptions').row(10).column('compFilter.option')).click();
        browser.sleep(vars.timeToWaitAutoSave);
        explore.exploreFind.clear().sendKeys(namePotenciometroProject).then(function() {
            expect(explore.projectElem.getText()).toMatch(namePotenciometroProject);
        });

        // Puerto Serie
        element.all(by.repeater('compFilter in componentsFilterOptions').row(0).column('compFilter.option')).click();
        element.all(by.repeater('compFilter in componentsFilterOptions').row(11).column('compFilter.option')).click();
        browser.sleep(vars.timeToWaitAutoSave);
        explore.exploreFind.clear().sendKeys(namePuertoSerieProject).then(function() {
            expect(explore.projectElem.getText()).toMatch(namePuertoSerieProject);
        });

        // Servo
        element.all(by.repeater('compFilter in componentsFilterOptions').row(0).column('compFilter.option')).click();
        element.all(by.repeater('compFilter in componentsFilterOptions').row(12).column('compFilter.option')).click();
        browser.sleep(vars.timeToWaitAutoSave);
        explore.exploreFind.clear().sendKeys(nameServoProject).then(function() {
            expect(explore.projectElem.getText()).toMatch(nameServoProject);
        });

        // Servo Continuo
        element.all(by.repeater('compFilter in componentsFilterOptions').row(0).column('compFilter.option')).click();
        element.all(by.repeater('compFilter in componentsFilterOptions').row(13).column('compFilter.option')).click();
        browser.sleep(vars.timeToWaitAutoSave);
        explore.exploreFind.clear().sendKeys(nameServoContinuoProject).then(function() {
            expect(explore.projectElem.getText()).toMatch(nameServoContinuoProject);
        });

        // Zumbador
        element.all(by.repeater('compFilter in componentsFilterOptions').row(0).column('compFilter.option')).click();
        element.all(by.repeater('compFilter in componentsFilterOptions').row(14).column('compFilter.option')).click();
        browser.sleep(vars.timeToWaitAutoSave);
        explore.exploreFind.clear().sendKeys(nameZumbadorProject).then(function() {
            expect(explore.projectElem.getText()).toMatch(nameZumbadorProject);
        });

        //ledRGB
        element.all(by.repeater('compFilter in componentsFilterOptions').row(0).column('compFilter.option')).click();
        element.all(by.repeater('compFilter in componentsFilterOptions').row(15).column('compFilter.option')).click();
        browser.sleep(vars.timeToWaitAutoSave);
        explore.exploreFind.clear().sendKeys(nameLedRGBProject).then(function() {
            expect(explore.projectElem.getText()).toMatch(nameLedRGBProject);
        });
        //Sensor de sonido
        element.all(by.repeater('compFilter in componentsFilterOptions').row(0).column('compFilter.option')).click();
        element.all(by.repeater('compFilter in componentsFilterOptions').row(16).column('compFilter.option')).click();
        browser.sleep(vars.timeToWaitAutoSave);
        explore.exploreFind.clear().sendKeys(nameSensorSonidosProject).then(function() {
            expect(explore.projectElem.getText()).toMatch(nameSensorSonidosProject);
        });
        //reloj de tiempo real
        element.all(by.repeater('compFilter in componentsFilterOptions').row(0).column('compFilter.option')).click();
        element.all(by.repeater('compFilter in componentsFilterOptions').row(17).column('compFilter.option')).click();
        browser.sleep(vars.timeToWaitAutoSave);
        explore.exploreFind.clear().sendKeys(nameRelojDeTiempoRealProject).then(function() {
            expect(explore.projectElem.getText()).toMatch(nameRelojDeTiempoRealProject);
        });
        //sensor de humedad
        element.all(by.repeater('compFilter in componentsFilterOptions').row(0).column('compFilter.option')).click();
        element.all(by.repeater('compFilter in componentsFilterOptions').row(18).column('compFilter.option')).click();
        browser.sleep(vars.timeToWaitAutoSave);
        explore.exploreFind.clear().sendKeys(nameSensorDeHumedadProject).then(function() {
            expect(explore.projectElem.getText()).toMatch(nameSensorDeHumedadProject);
        });
        //encoder
        element.all(by.repeater('compFilter in componentsFilterOptions').row(0).column('compFilter.option')).click();
        element.all(by.repeater('compFilter in componentsFilterOptions').row(19).column('compFilter.option')).click();
        browser.sleep(vars.timeToWaitAutoSave);
        explore.exploreFind.clear().sendKeys(nameEncoderProject).then(function() {
            expect(explore.projectElem.getText()).toMatch(nameEncoderProject);
        });
        //final de carrera
        element.all(by.repeater('compFilter in componentsFilterOptions').row(0).column('compFilter.option')).click();
        element.all(by.repeater('compFilter in componentsFilterOptions').row(20).column('compFilter.option')).click();
        browser.sleep(vars.timeToWaitAutoSave);
        explore.exploreFind.clear().sendKeys(nameFinDeCarreraProject).then(function() {
            expect(explore.projectElem.getText()).toMatch(nameFinDeCarreraProject);
        });


        login.logout();

    });

    it('bba-163:Check board filters on explora', function() {
        //Name project published
        var nameZumProject,
            nameFreaduinoProject,
            nameArduinoProject,
            nameZowiProject;

        /********  PUBLISH PROJECT WITH DIFFERENTS BOARD ***********/

        make.importFileNewUser(path.resolve() + '/test/e2e/protractor/res/Zum_Bloqs.json');
        nameZumProject = 'Zum_Bloqs' + Number(new Date());
        make.publishProjectWithName(nameZumProject);
        browser.sleep(vars.timeToWaitAutoSave);

        make.importFileUser(path.resolve() + '/test/e2e/protractor/res/Freaduino_Bloqs.json');
        nameFreaduinoProject = 'Freaduino_Bloqs' + Number(new Date());
        make.publishProjectWithName(nameFreaduinoProject);
        browser.sleep(vars.timeToWaitAutoSave);

        make.importFileUser(path.resolve() + '/test/e2e/protractor/res/Arduino_Bloqs.json');
        nameArduinoProject = 'Arduino_Bloqs' + Number(new Date());
        make.publishProjectWithName(nameArduinoProject);
        browser.sleep(vars.timeToWaitAutoSave);

        make.importFileUser(path.resolve() + '/test/e2e/protractor/res/zowibloqs.json');
        nameZowiProject = 'zowibloqs' + Number(new Date());
        make.publishProjectWithName(nameZowiProject);
        browser.sleep(vars.timeToWaitAutoSave);

        /********  EXPLORE WHIT FILTER **************************
         *  Check checkbox board and find project                 *
         * *******************************************************/

        explore.get();
        explore.exploreFilterDrowdown.click();


        // bq ZUM check
        element.all(by.repeater('board in boardsFilterOptions').row(0).column('board.option')).click();
        browser.sleep(vars.timeToWaitAutoSave);
        explore.exploreFind.clear().sendKeys(nameZumProject).then(function() {
            browser.sleep(vars.timeToWaitAutoSave);
            expect(explore.projectElem.getText()).toMatch(nameZumProject);
            expect(explore.projectElem.getText()).not.toMatch(nameFreaduinoProject);
            expect(explore.projectElem.getText()).not.toMatch(nameArduinoProject);
            expect(explore.projectElem.getText()).not.toMatch(nameZowiProject);
        });

        // check no show other board
        browser.sleep(vars.timeToWaitAutoSave);
        explore.exploreFind.clear().sendKeys(nameFreaduinoProject).then(function() {
            browser.sleep(vars.timeToWaitAutoSave);
            expect(explore.projectElem.isPresent()).toBe(false);
        });
        explore.exploreFind.clear().sendKeys(nameArduinoProject).then(function() {
            browser.sleep(vars.timeToWaitAutoSave);
            expect(explore.projectElem.isPresent()).toBe(false);
        });
        explore.exploreFind.clear().sendKeys(nameZowiProject).then(function() {
            browser.sleep(vars.timeToWaitAutoSave);
            expect(explore.projectElem.isPresent()).toBe(false);
        });

        // Freduino check
        element.all(by.repeater('board in boardsFilterOptions').row(1).column('board.option')).click();
        browser.sleep(vars.timeToWaitAutoSave);
        explore.exploreFind.clear().sendKeys(nameFreaduinoProject).then(function() {
            browser.sleep(vars.timeToWaitAutoSave);
            expect(explore.projectElem.getText()).toMatch(nameFreaduinoProject);
            expect(explore.projectElem.getText()).not.toMatch(nameZumProject);
            expect(explore.projectElem.getText()).not.toMatch(nameArduinoProject);
            expect(explore.projectElem.getText()).not.toMatch(nameZowiProject);
        });

        // check no show other board
        browser.sleep(vars.timeToWaitAutoSave);
        explore.exploreFind.clear().sendKeys(nameZumProject).then(function() {
            browser.sleep(vars.timeToWaitAutoSave);
            expect(explore.projectElem.isPresent()).toBe(false);
        });
        explore.exploreFind.clear().sendKeys(nameArduinoProject).then(function() {
            browser.sleep(vars.timeToWaitAutoSave);
            expect(explore.projectElem.isPresent()).toBe(false);
        });
        explore.exploreFind.clear().sendKeys(nameZowiProject).then(function() {
            browser.sleep(vars.timeToWaitAutoSave);
            expect(explore.projectElem.isPresent()).toBe(false);
        });

        // Arduino check
        element.all(by.repeater('board in boardsFilterOptions').row(2).column('board.option')).click();
        browser.sleep(vars.timeToWaitAutoSave);
        explore.exploreFind.clear().sendKeys(nameArduinoProject).then(function() {
            browser.sleep(vars.timeToWaitAutoSave);
            expect(explore.projectElem.getText()).toMatch(nameArduinoProject);
            expect(explore.projectElem.getText()).not.toMatch(nameFreaduinoProject);
            expect(explore.projectElem.getText()).not.toMatch(nameZumProject);
            expect(explore.projectElem.getText()).not.toMatch(nameZowiProject);
        });
        // check no show other board
        browser.sleep(vars.timeToWaitAutoSave);
        explore.exploreFind.clear().sendKeys(nameFreaduinoProject).then(function() {
            browser.sleep(vars.timeToWaitAutoSave);
            expect(explore.projectElem.isPresent()).toBe(false);
        });
        explore.exploreFind.clear().sendKeys(nameZumProject).then(function() {
            browser.sleep(vars.timeToWaitAutoSave);
            expect(explore.projectElem.isPresent()).toBe(false);
        });
        explore.exploreFind.clear().sendKeys(nameZowiProject).then(function() {
            browser.sleep(vars.timeToWaitAutoSave);
            //zowi has arduino tag
            expect(explore.projectElem.isPresent()).toBe(true);
        });

        //Zowi check
        element.all(by.repeater('board in boardsFilterOptions').row(3).column('board.option')).click();
        browser.sleep(vars.timeToWaitAutoSave);
        explore.exploreFind.clear().sendKeys(nameZowiProject).then(function() {
            browser.sleep(vars.timeToWaitAutoSave);
            expect(explore.projectElem.getText()).toMatch(nameZowiProject);
            expect(explore.projectElem.getText()).not.toMatch(nameFreaduinoProject);
            expect(explore.projectElem.getText()).not.toMatch(nameZumProject);
            expect(explore.projectElem.getText()).not.toMatch(nameArduinoProject);
        });

        // check no show other board
        browser.sleep(vars.timeToWaitAutoSave);
        explore.exploreFind.clear().sendKeys(nameFreaduinoProject).then(function() {
            browser.sleep(vars.timeToWaitAutoSave);
            expect(explore.projectElem.isPresent()).toBe(false);
        });
        explore.exploreFind.clear().sendKeys(nameZumProject).then(function() {
            browser.sleep(vars.timeToWaitAutoSave);
            expect(explore.projectElem.isPresent()).toBe(false);
        });
        explore.exploreFind.clear().sendKeys(nameArduinoProject).then(function() {
            browser.sleep(vars.timeToWaitAutoSave);
            expect(explore.projectElem.isPresent()).toBe(false);
        });

        login.logout();
    });
});
