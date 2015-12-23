'use strict';

var Bloqs = function() {

    //var Q = require('q');

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

    this.connectBloqsDown = function() {
        var that = this;

        that.getBloq('functions', 'bloq-void-function').then(function(voidFunctionBloq) {

            that.moveBloq(voidFunctionBloq, {
                x: -100,
                y: 0
            });

            that.getBloq('functions', 'bloq-void-function').then(function(voidFunctionBloq2) {

                that.moveBloq(voidFunctionBloq2, {
                    x: 0,
                    y: 100
                });
            });
        });
    };

    this.connectBloqsUp = function() {
        var that = this;

        that.getBloq('functions', 'bloq-void-function').then(function(voidFunctionBloq) {

            that.moveBloq(voidFunctionBloq, {
                x: 0,
                y: 100
            });

            that.getBloq('functions', 'bloq-void-function').then(function(voidFunctionBloq2) {

                that.moveBloq(voidFunctionBloq2, {
                    x: -100,
                    y: 0
                });
            });
        });
    };

    this.connectBloqsRoot = function() {
        var that = this;

        that.getBloq('functions', 'bloq-void-function').then(function(voidFunctionBloq) {

            that.moveBloq(voidFunctionBloq, {
                x: 0,
                y: 0
            });

            that.getBloq('functions', 'bloq-void-function').then(function(voidFunctionBloq2) {

                that.moveBloq(voidFunctionBloq2, {
                    x: 0,
                    y: 50
                });
            });
        });
    };

    this.connectElement = function() {
        var that = this;

        that.getBloq('vars', 'bloq-declare-variable').then(function(voidFunctionBloq) {

            that.moveBloq(voidFunctionBloq, {
                x: -200,
                y: 0
            });

            that.getBloq('maths', 'bloq-number').then(function(voidFunctionBloq2) {

                that.moveBloq(voidFunctionBloq2, {
                    x: 100,
                    y: 0
                });
            });
        });
    };
};

module.exports = Bloqs;
