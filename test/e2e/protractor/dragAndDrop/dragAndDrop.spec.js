/**
 *Draft dragAndDrop
 */

'use strict';


/*
* There are some bugs in DragAndDrop:
*
* https://github.com/angular/protractor/issues/583
* https://github.com/angular/protractor/issues/2273
* https://code.google.com/p/selenium/issues/detail?id=3604
*
*While the issues are fixed, the project are load by code
*
* Posible solution: http://stackoverflow.com/questions/29381233/how-to-simulate-html5-drag-and-drop-in-selenium-webdriver-in-python/29381532#29381532
*
* Now, wait for fix issue and put the examples
*
* */

describe('DragAndDrop ', function() {

    beforeEach(function() {

        browser.get(browser.baseUrl);
        browser.waitForAngular();
    });

    it('test', function(){
        //login.login('luisangonzalez','123456');
        //var coordenadas = placaUno.getLocation();


        var buttonStart = element(by.binding('landing-main-button-start')).click();
        var placas= element(by.buttonText('Placas')).click();

        //OK repeater binding example in boards
        //var placaUno = element.all(by.repeater('board in boards')).get(1);

        //img placa  to drag and drop
        var placaUnoCSS = element(by.css('#hwtoolbox > div > ul > li:nth-child(1) > div.submenu-level > div > div > div:nth-child(1) > img'));

        //space with drop placa
        var espacioPlaca = element(by.css('#boardSchema'));

        //First way -- not run
        //browser.actions().mouseDown(placaUnoCSS).mouseMove(placaUnoCSS,espacioPlaca).mouseUp().perform()

        //Second way -- not run in chrome, in firefox run but not relase mouseUp ok
        browser.actions()
            .dragAndDrop(placaUnoCSS, espacioPlaca)
            .perform();


        //Third way -- not run in chrome, in firefox run but not relase mouseUp ok
        /*
         browser.actions().dragAndDrop(
         browser.findElement(by.css('#hwtoolbox > div > ul > li:nth-child(1) > div.submenu-level > div > div > div:nth-child(1) > img')),
         browser.findElement(by.css('#protoboard-canvas'))).perform();
        */

        //Four way -- not run
        /*
        browser.actions().
            mouseMove(placaUnoCSS, {x: 0, y: 0}).
            mouseDown().
            mouseMove(espacioPlaca).
            mouseUp().
            perform();
        */

        //Five way  -- not run
        /*
       var yourOffset = {x:5,y:5};
       browser.actions()
            .mouseMove(placaUnoCSS,yourOffset)
            .mouseDown()
            .mouseMove(placaUnoCSS,{x:0,y:0}) // Initial move to trigger drag start
            .mouseMove(espacioPlaca) // [] optional
        .mouseUp()
        .perform();
        */

        browser.pause();

    });

    afterEach(function(){

    });


});


