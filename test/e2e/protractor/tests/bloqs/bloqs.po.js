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
            .mouseMove(positionDiff)
            .mouseUp()
            .perform();
    };

    this.connectBloqs = function(connector, movingBloq, destinationBloq) {

        return Q.all([destinationBloq.getLocation(), movingBloq.getLocation()]).then(function(res) {
            console.log('destinationBloq');
            console.log(res[0]);
            console.log(res[1]);
            destinationBloq.getSize().then(function(size) {
                console.log('size');
                console.log(size);
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
                    .mouseMove({
                        x: res[0].x - res[1].x - 10,
                        y: res[0].y - res[1].y - size.height - 10
                    })
                    .mouseMove({
                        x: res[0].x - res[1].x,
                        y: res[0].y - res[1].y - size.height - 10
                    })
                    .mouseUp()
                    .perform();

            });
        });
    };
};

module.exports = Bloqs;