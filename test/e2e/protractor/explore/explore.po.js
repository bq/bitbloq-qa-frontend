/**
 * Local Spec to explore.html
 */

'use strict';

var Explore = function() {

    this.exploreCounts = $('[data-element="explore-count-projects"]');
    this.exploreFind= $('[data-element="explore-find"]');
    this.projectName = $('[data-element="explore-project-name"]');
    this.indexMain = '$(\'[data-element="explore-scroll"]\')';

    this.get = function() {
        browser.get('#/explore');
    };
};

module.exports = Explore;
