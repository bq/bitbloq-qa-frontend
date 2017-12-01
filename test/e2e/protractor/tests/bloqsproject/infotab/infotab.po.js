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
    this.infotabChooseThemeButton = $('[data-element="infotab_choosetheme"]');
    this.infotabOptionGrayTheme = $('[data-element="infotab_choosetheme-0"]');
    this.infotabOptionColorTheme = $('[data-element="infotab_choosetheme-1"]');
    this.infotabYoutubeVideoInput = $('[data-element="infotab-youtubevideo"]');
    this.infotabDescription = $('[data-element="infotab-description"]');
    this.infotabRemoveTag=$('[data-element="infotab-remove-tag"]');
    this.infotabChooseBoardButton = $('[data-element="infotab_chooseboard"]');
    this.infotabBQZumButton = $('[data-element="infotab_chooseboard-0"]');
    //tags
    this.infotabBQZumTag = element(by.xpath('//div[@class="tags"]//span[contains(text(), "bq ZUM")]'));
    this.infotabBQZumDeleteTag = element(by.xpath('//div[@class="tags"]//span[contains(text(), "bq ZUM")]/../span[contains(@class, "tags__item--trash")][contains(text(), "bq ZUM")]'));
    this.infotabFreaduinoUnoTag = element(by.xpath('//div[@class="tags"]//span[contains(text(), "Freaduino UNO")]'));
    this.infotabFreaduinoUnoDeleteTag = element(by.xpath('//div[@class="tags"]//span[contains(text(), "Freaduino UNO")]/../span[contains(@class, "tags__item--trash")][contains(text(), "Freaduino UNO")]'));
    this.infotabMCoreTag= element(by.xpath('//div[@class="tags"]//span[contains(text(), "MCore")]'));
    this.infotabMCoreDeleteTag = element(by.xpath('//div[@class="tags"]//span[contains(text(), "MCore")]/../span[contains(@class, "tags__item--trash")][contains(text(), "MCore")]'));
    this.infotabMBotTag = element(by.xpath('//div[@class="tags"]//span[contains(text(), "mBot")]'));
    this.infotabMBotDeleteTag = element(by.xpath('//div[@class="tags"]//span[contains(text(), "mBot")]/../span[contains(@class, "tags__item--trash")][contains(text(), "mBot")]'));
};

module.exports = Infotab;
