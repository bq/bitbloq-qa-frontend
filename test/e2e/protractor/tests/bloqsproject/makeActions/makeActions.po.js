/**
 *Page object makeActions.html
 */

'use strict';

var Variables = require('../../commons/variables.js'),
    Modals = require('../../modals/modals.po.js'),
    Login = require('../../login/login.po.js');

var vars = new Variables(),
    modals = new Modals(),
    os = require('os').type,
    login = new Login();

var MakeActions = function() {

    this.hideBar = $('[data-element="hide-bar"]');
    //FILE
    this.menuFile = $('[data-element="menu-file"]');
    this.menuNewProject = $('[data-element="menu-newproject"]');
    this.menuopenProject = $('[data-element="menu-openproject"]');
    this.menuOpenProjectFromFile = $('[data-element="menu-openprojectfromfile"]');
    this.menuChangeName = $('[data-element="menu-changename"]');
    this.menuClone = $('[data-element="menu-clone"]');
    this.menuDownload = $('[data-element="menu-download"]');
    this.menuExportArduino = $('[data-element="menu-exportarduino"]');
    this.menuChangeLanguage = $('[data-element="menu-changelanguage"]');
    this.removeProject = $('[data-element="menu-removeproject"]');
    //EDIT
    this.menuEdit = $('[data-element="makeactions-menuedit"]');
    this.menuEditUndo = $('[data-element="makeactions-menuedit-undo"]');
    this.menuEditRedo = $('[data-element="makeactions-menuedit-redo"]');
    //VIEW
    this.menuView = $('[data-element="makeactions-menuview"]');
    this.menuViewMoreZoom = $('[data-element="makeactions-menuview-morezoom"]');
    this.menuViewResetZoom = $('[data-element="makeactions-menuview-resetzoom"]');
    this.menuViewLessZoom = $('[data-element="makeactions-menuview-lesszoom"]');
    this.menuViewConsole = $('[data-element="makeactions-menuview-console"]');
    //SHARE
    this.menuShare = $('[data-element="makeactions-menushare"]');
    this.menuSharePublish = $('[data-element="makeactions-menushare-publish"]');
    this.menuSharePrivate = $('[data-element="makeactions-menushare-private"]');
    this.menuShareWithUsers = $('[data-element="makeactions-menushare-share-with-users"]');
    this.menuShareSocial = $('[data-element="makeactions-menushare-share-social"]');
    this.publishButton = $('[data-element="publish-button"]');
    this.privateButton = $('[data-element="private-button"]');
    //HELP
    this.menuHelp = $('[data-element="makeactions-menuhelp"]');
    this.menuHelpFaq = $('[data-element="makeactions-menuhelp-faq"]');
    this.menuHelpTutorial = $('[data-element="makeactions-menuhelp-tutorial"]');
    this.menuHelpComments = $('[ data-element="makeactions-menuhelp-comments"]');
    this.menuHelpErrorFeedback = $('[data-element="makeactions-menuhelp-errorfeedback"]');
    this.menuHelpForum = $('[data-element="makeactions-menuhelp-forum"]');

    //Hidden input to upload file
    this.inputUploadFile = $('[data-element="makeactions-input-upload-file"]');

    this.publishProject = function() {
        this.menuShare.click();
        browser.sleep(vars.timeToWaitMenu);
        this.menuSharePublish.click();
        browser.sleep(vars.timeToWaitMenu);
        this.publishButton.click();
    };

    this.publishProjectWithName = function(name) {

        this.menuFile.click();
        browser.sleep(vars.timeToWaitMenu);
        this.menuChangeName.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.inputModalChangeN.clear();
        modals.inputModalChangeN.sendKeys(name);
        modals.okDialog.click();
        browser.sleep(vars.timeToWaitAutoSave);
        this.menuShare.click();
        browser.sleep(vars.timeToWaitMenu);
        this.menuSharePublish.click();
        browser.sleep(vars.timeToWaitMenu);
        this.publishButton.click();
    };

    this.importFile = function(file) {
        browser.get('#/bloqsproject');
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        if (os() === 'Windows_NT') {
            file = file.replace('/', '\\');
        }
        this.inputUploadFile.sendKeys(file);
        browser.sleep(vars.timeToWaitFadeModals);

    };

    this.importFileGuestUser = function(file) {
        browser.get('#/bloqsproject');
        modals.attentionContinueGuest.click();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        if (os() === 'Windows_NT') {
            file = file.replace('/', '\\');
        }
        this.inputUploadFile.sendKeys(file);
        browser.sleep(vars.timeToWaitFadeModals);

    };

    this.importFileNewUser = function(file) {
        var user = login.loginWithRandomUser();
        this.importFile(file);
        browser.sleep(5000);
        return {
            user: user
        };
    };

    this.importFileUserLogin = function(file, user) {
        login.login(user.user, user.password);
        browser.get('#/bloqsproject');
        if (os() === 'Windows_NT') {
            file = file.replace('/', '\\');
        }
        this.inputUploadFile.sendKeys(file);
        browser.sleep(vars.timeToWaitFadeModals);
    };

    this.importFileUser = function(file) {
        browser.get('#/bloqsproject');
        if (os() === 'Windows_NT') {
            file = file.replace('/', '\\');
        }
        this.inputUploadFile.sendKeys(file);
        browser.sleep(vars.timeToWaitFadeModals);
    };

};

module.exports = MakeActions;
