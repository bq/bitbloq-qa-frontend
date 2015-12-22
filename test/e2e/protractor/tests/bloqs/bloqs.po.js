'use strict';

var Bloqs = function() {

    var Q = require('q');

    this.getToolboxPO = function(section) {
        return $('[data-element="toolbox-' + section + '"]');
    };

    // this.getBloq = function(section, bloqClass) {

    //     var toolbox = this.getToolboxPO(section);
    //     toolbox.click();
    //     browser.sleep(1000);
    //     return toolbox.$('.' + bloqClass);
    // };

    this.getBloq = function(section, bloqClass) {
        var that = this,
            bloqsuniquetag = Date.now();

        return browser.executeScript('document.querySelectorAll(\'[data-element="toolbox-' + section + '"] .' + bloqClass + '\')[0].setAttribute("bloqsuniquetag", "' + bloqsuniquetag + '")').then(function() {
            var toolbox = that.getToolboxPO(section);
            toolbox.click();
            browser.sleep(1000);
            return $('[bloqsuniquetag="' + bloqsuniquetag + '"]');
        });
    };

    /**
     * Always to a visible position
     */
    this.moveBloq = function(bloq, positionDiff) {
        browser.actions()
            .mouseMove(bloq.getWebElement(), {
                x: 10,
                y: 10
            })
            .mouseDown()
            .mouseMove(bloq.getWebElement()) //premove start
            .mouseMove({ //first move to get distance and leave preMove status
                x: 10,
                y: 10
            })
            .mouseMove({ //first move to get distance and leave preMove status
                x: 0,
                y: 0
            })
            .mouseMove(positionDiff)
            .mouseUp()
            .perform();
    };

    this.connectBloqs = function(connector, destinationBloq, movingBloq) {

        return Q.all([destinationBloq.getLocation(), movingBloq.getLocation()]).then(function() {

            browser.actions()
                .mouseMove(destinationBloq.getWebElement(), {
                    x: 10,
                    y: 10
                })
                .mouseDown()
                .mouseMove(destinationBloq.getWebElement()) //premove start
                .mouseMove({ //first move to get distance and leave preMove status
                    x: 10,
                    y: 10
                })
                .mouseMove({ //first move to get distance and leave preMove status
                    x: 0,
                    y: 0
                })
                .mouseMove({
                    x: 0,
                    y: 100
                })
                .mouseUp()
                .perform();

            browser.actions()
                .mouseMove(movingBloq.getWebElement(), {
                    x: 10,
                    y: 10
                })
                .mouseDown()
                .mouseMove(movingBloq.getWebElement()) //premove start
                .mouseMove({ //first move to get distance and leave preMove status
                    x: 10,
                    y: 10
                })
                .mouseMove({ //first move to get distance and leave preMove status
                    x: 0,
                    y: 0
                })
                .mouseMove({
                    x: 0,
                    y: 100
                })
                .mouseUp()
                .perform();
        });
    };
};

module.exports = Bloqs;
