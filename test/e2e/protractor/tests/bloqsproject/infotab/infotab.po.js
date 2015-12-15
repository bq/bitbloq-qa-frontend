/**
 * P.O infotab
 */

'use strict';

var Infotab = function() {
    this.infoTab = $('[data-element="info-tab"]');
    this.hardwareTab = $('[data-element="hardware-tab"]');
    this.softwareTab = $('[data-element="software-tab"]');
    this.infotabProjectName = $('[data-element="info-project-name"]');
    this.infotabTaginputText = $('[data-element="infotab-taginput-text"]');
    this.infotabTaginputButton = $('[data-element="infotab-taginput-button"]');
    this.infotabUploadImageButton = $('[data-element="infotab-uploadimage"]');
    this.infotabFileUpload = $('[data-element="infotab-fileinput"]');
    this.infotabProjectImage = $('[data-element="infotab-projectimage"]');
    this.infotabChooseThemeButton = $('[data-element="infotab-choosetheme"]');
    this.infotabOptionGrayTheme = $('[data-element="infotab_option_grayTheme"]');
    this.infotabOptionColorTheme = $('[data-element="infotab_option_colorTheme"]');
    this.infotabYoutubeVideoInput = $('[data-element="infotab-youtubevideo"]');
    this.infotabDescription = $('[data-element="infotab-description"]');
};

module.exports = Infotab;
