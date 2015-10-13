'use strict';

var SocialNetwork = function() {

    this.googleLink = element(by.xpath('//a[@title="bitbloq"]'));
    this.twitterLink = element(by.id('status'));
};

module.exports = SocialNetwork;
