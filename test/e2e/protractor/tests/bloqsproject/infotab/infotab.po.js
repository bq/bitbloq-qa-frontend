/**
 * P.O infotab.html
 */

'use strict';

var Infotab = function() {
    this.infotabProjectName = $('[data-element="info-project-name"]');
    this.infotabTaginputText = $('[data-element="infotab-taginput-text"]');
    this.infotabTaginputButton = $('[data-element="infotab-taginput-button"]');
    this.infotabUploadImageButton = $('[data-element="infotab-uploadimage"]');
    this.infotabFileUpload = $('[data-element="infotab-fileinput"]');
    this.infotabProjectImage = $('[data-element="infotab-projectimage"]');
    this.infotabDescription = $('[data-element="infotab-description"]');
    this.infotabYoutubeVideo = $('[data-element="infotab-youtubevideo"]');
};

module.exports = Infotab;