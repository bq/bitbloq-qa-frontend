'use strict';

var Bloqs = function() {

    //P.O
    this.bloqsTab = $('[data-element="bloqs-tab"]');
    this.sectionVars = $('[data-element="toolbox-functions"]');
    this.advancedButtonToolbox = $('[data-element="toolbox-advanced-button"]');
    this.basicButtonToolbox = $('[data-element="toolbox-basic-button"]');
    // This function returns the element associated
    // to the toolbox section passed in param
    this.getToolboxPO = function(section) {
        return $('[data-element="toolbox-' + section + '"]');
    };

    // This function returns the element associated to each
    // bloqs section, it can be vars, setup or loop
    this.getRegion = function(region) {
        return element(by.css('.bloq-' + region));
    };

    // This function close the bloqs tab
    this.closeTab = function() {
        this.bloqsTab.click();
    };

    // This function return the conector passed in params from the bloq header
    this.getConectorHeader = function(bloque, conector) {
        return $(bloque.parentElementArrayFinder.locator_.value + ' > .bloq--statement-input__header > [data-content-id="' + conector + '"]');
    };

    // This function return the conector passed in params from the bloq return
    this.getConectorReturn = function(bloque, conector) {
        return $(bloque.parentElementArrayFinder.locator_.value + ' > .bloq--extension > .bloq--extension--end > [data-content-id="' + conector + '"]');
    };

    // This function return the conector passed in params from the fixed bloq
    this.getConectorFixed = function(bloque, conector) {
        return $(bloque.parentElementArrayFinder.locator_.value + ' > .bloq--fixed > [data-content-id="' + conector + '"]');
    };

    // This function return the conector passed in params from the nested bloq
    this.getConectorNested = function(bloque, conector) {
        return $(bloque.parentElementArrayFinder.locator_.value + ' > [data-content-id="' + conector + '"]');
    };

    // This function set the value or text input from the bloq header
    this.setValueHeader = function(bloque, tipo, value) {
        var that = this,
            elem = that.getConectorHeader(bloque, tipo);

        elem.clear();
        elem.sendKeys(value);
    };

    // This function set the value or text input from the bloq return
    this.setValueReturn = function(bloque, tipo, value) {
        var that = this,
            elem = that.getConectorReturn(bloque, tipo);

        elem.clear();
        elem.sendKeys(value);
    };

    // This function set the value or text input from the fixed bloq
    this.setValueFixed = function(bloque, tipo, value) {
        var that = this,
            elem = that.getConectorFixed(bloque, tipo);

        elem.clear();
        elem.sendKeys(value);
    };

    // This function set the value or text input from the nested bloq
    this.setValueNested = function(bloque, tipo, value) {
        var that = this,
            elem = that.getConectorNested(bloque, tipo);

        elem.clear();
        elem.sendKeys(value);
    };

    // This function select an option from the dropdown from the bloq header
    this.setDropdownHeader = function(bloque, tipo, operacion) {
        var that = this,
            elem = that.getConectorHeader(bloque, tipo);

        elem.click();
        elem.$('[value="' + operacion + '"]').click();
    };

    // This function select an option from the dropdown from the bloq return
    this.setDropdownReturn = function(bloque, tipo, operacion) {
        var that = this,
            elem = that.getConectorReturn(bloque, tipo);

        elem.click();
        elem.$('[value="' + operacion + '"]').click();
    };

    // This function select an option from the dropdown from the fixed bloq
    this.setDropdownFixed = function(bloque, tipo, operacion) {
        var that = this,
            elem = that.getConectorFixed(bloque, tipo);

        elem.click();
        elem.$('[value="' + operacion + '"]').click();
    };

    // This function select an option from the dropdown from the nested bloq
    this.setDropdownNested = function(bloque, tipo, operacion) {
        var that = this,
            elem = that.getConectorNested(bloque, tipo);

        elem.click();
        elem.$('[value="' + operacion + '"]').click();
    };

    // This function connect a bloq into the bloq header
    this.connectElementHeader = function(arg, bloqueDest, bloqueMover) {
        var that = this;
        var conector = that.getConectorHeader(bloqueDest, arg);

        conector.getLocation().then(function(location) {
            bloqueMover.getLocation().then(function(location2) {
                var distance = that.getDistance(location, location2);
                that.moveBloq(bloqueMover, {
                    x: distance.x + 10,
                    y: distance.y + 10
                });
            });
        });
    };

    // This function connect a bloq into the bloq return
    this.connectElementReturn = function(bloqueDest, bloqueMover) {
        var that = this;
        var conector = that.getConectorReturn(bloqueDest, 'RETURN');

        conector.getLocation().then(function(location) {
            bloqueMover.getLocation().then(function(location2) {
                var distance = that.getDistance(location, location2);
                that.moveBloq(bloqueMover, {
                    x: distance.x + 10,
                    y: distance.y + 10
                });
            });
        });
    };

    // This function connect a bloq into the fixed bloq
    this.connectElementFixed = function(arg, bloqueDest, bloqueMover) {
        var that = this;
        var conector = that.getConectorFixed(bloqueDest, arg);

        conector.getLocation().then(function(location) {
            bloqueMover.getLocation().then(function(location2) {
                var distance = that.getDistance(location, location2);
                that.moveBloq(bloqueMover, {
                    x: distance.x + 10,
                    y: distance.y + 10
                });
            });
        });
    };

    // This function connect a bloq into the nested bloq
    this.connectElementNested = function(arg, bloqueDest, bloqueMover) {
        var that = this;
        var conector = that.getConectorNested(bloqueDest, arg);

        conector.getLocation().then(function(location) {
            bloqueMover.getLocation().then(function(location2) {
                var distance = that.getDistance(location, location2);
                that.moveBloq(bloqueMover, {
                    x: distance.x + 10,
                    y: distance.y + 10
                });
            });
        });
    };

    // This function add a unique tag to a bloq in the class and section passed
    // in params and return the tag.
    this.getBloq = function(section, bloqClass, advanced) {
        var that = this,
            bloqsuniquetag = Date.now(),
            aleatorio = (Math.round(Math.random() * 100)) + 0;
        var toolbox = that.getToolboxPO(section);
        toolbox.click();
        if (advanced) {
            that.advancedButtonToolbox.click();
        }
        return browser.executeScript('document.querySelectorAll(\'[data-element="toolbox-container-' + section + '"] .' + bloqClass + '\')[0].setAttribute("bloqsuniquetag", "' + bloqsuniquetag + aleatorio + '")').then(function() {
            browser.sleep(1000);
            return $('[bloqsuniquetag="' + bloqsuniquetag + aleatorio + '"]');
        });
    };

    this.getBloqFunctions = function(bloqClass) {
        return this.getBloq('functions', bloqClass, false);
    };

    this.getBloqMaths = function(bloqClass) {
        return this.getBloq('maths', bloqClass, false);
    };

    this.getBloqVars = function(bloqClass) {
        return this.getBloq('vars', bloqClass, false);
    };

    this.getBloqControl = function(bloqClass) {
        return this.getBloq('control', bloqClass, false);
    };

    // This function return the distance between two position
    // objects.
    this.getDistance = function(position1, position2) {
        return {
            x: position1.x - position2.x,
            y: position1.y - position2.y
        };
    };

    // This function move a bloq
    this.moveBloq = function(bloq, positionDiff) {
        browser.actions()
            .mouseMove(bloq, {
                x: 10,
                y: 10
            })
            .mouseDown()
            .mouseMove(bloq, {
                x: 10,
                y: 10
            }) //premove start
            .mouseMove(bloq, {
                x: 0,
                y: 0
            })
            .mouseMove(positionDiff, {
                x: 0,
                y: 0
            })
            .mouseUp()
            .perform();
    };

    // This function moves a bloq to the zone passed in params
    // it can be vars, setup or loop
    this.addToGroup = function(zona, bloque) {
        var that = this;
        var group = that.getRegion(zona);

        group.getLocation().then(function(location) {
            bloque.getLocation().then(function(location2) {
                var distance = that.getDistance(location, location2);
                that.moveBloq(bloque, {
                    x: distance.x + 10,
                    y: distance.y + 100
                });
            });
        });
    };

    this.addToGroupVars = function(bloque) {
        return this.addToGroup('vars', bloque);
    };

    this.addToGroupSetup = function(bloque) {
        return this.addToGroup('setup', bloque);
    };

    // This function connect two boqs through the conector passed in params
    // it can be up, down or root

    this.connectBloqsUp = function(bloqueDest, bloqueMover) {
        var that = this;
        bloqueDest.getSize().then(function(size) {
            bloqueDest.getLocation().then(function(location) {
                bloqueMover.getLocation().then(function(location2) {
                    var distance = that.getDistance(location, location2);
                    that.moveBloq(bloqueMover, {
                        x: distance.x,
                        y: distance.y + size.height
                    });
                });
            });
        });
    };

    this.connectBloqsDown = function(bloqueDest, bloqueMover) {
        var that = this;
        bloqueDest.getSize().then(function() {
            bloqueDest.getLocation().then(function(location) {
                bloqueMover.getLocation().then(function(location2) {
                    var distance = that.getDistance(location, location2);
                    that.moveBloq(bloqueMover, {
                        x: distance.x,
                        y: distance.y - 10
                    });
                });
            });
        });
    };

    this.connectBloqsRoot = function(bloqueDest, bloqueMover) {
        var that = this;
        bloqueDest.getSize().then(function(size) {
            bloqueDest.getLocation().then(function(location) {
                bloqueMover.getLocation().then(function(location2) {
                    var distance = that.getDistance(location, location2);
                    that.moveBloq(bloqueMover, {
                        x: distance.x,
                        y: distance.y + size.height / 2
                    });
                });
            });
        });
    };

};

module.exports = Bloqs;
