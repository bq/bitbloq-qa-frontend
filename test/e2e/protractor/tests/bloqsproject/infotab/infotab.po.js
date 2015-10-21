/**
 * P.O infotab
 */

'use strict';

var Infotab = function() {
    this.infotabProjectName = $('[data-element="info-project-name"]');
    this.infotabTaginputText = $('[data-element="infotab-taginput-text"]');
    this.infotabTaginputButton = $('[data-element="infotab-taginput-button"]');
    this.infotabUploadImageButton = $('[data-element="infotab-uploadimage"]');
    this.infotabFileUpload = $('[data-element="infotab-fileinput"]');
    this.infotabProjectImage = $('[data-element="infotab-projectimage"]');
    this.infotabChooseThemeButton = $('[data-element="infotab-choosetheme"]');
    this.infotabOptionGrayTheme = $('[data-element="infotab_option_grayTheme"]');
    this.infotabOptionColorTheme = $('[data-element="infotab_option_colorTheme"]');
};

module.exports = Infotab;