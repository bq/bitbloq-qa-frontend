/**
 * Spec to makeActionsHelp.spec.js
 * Menu Share of makeActions
 */

'use strict';

var GlobalFunctions = require('../../../commons/globalFunctions.js'),
    MakeActions = require('../makeActions.po.js'),
    Make = require('../../make.po.js'),
    Variables = require('../../../commons/variables.js'),
    Modals = require('../../../modals/modals.po.js'),
    Projects = require('../../../projects/projects.po.js'),
    MyProjects = require('../../../projects/myprojects/myprojects.po.js'),
    Infotab = require('../../infotab/infotab.po.js'),
    Login = require('../../../login/login.po.js'),
    fs = require('fs'),
    path = require('path');

var globalFunctions = new GlobalFunctions(),
    makeActions = new MakeActions(),
    make = new Make(),
    vars = new Variables(),
    modals = new Modals(),
    projects = new Projects(),
    myprojects = new MyProjects(),
    infoTab = new Infotab(),
    login = new Login();

globalFunctions.xmlReport('makeActionsShareLocal');
describe('Menu share of makeactions local', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bba-143:Modify a project shared to you', function() {
        var validYoutubeUrl = 'https://youtu.be/f2WME8N8qXc?list=PL3AshJDPy8GQhVWkzsjc5IvrzD5ctpQXN';
        var invalidYoutubeUrl = 'https://www.youtube.com/user/TheRedsMusic';
        var user1 = login.loginWithRandomUser();
        var perfectImagePath = '../../../../res/perfectimage.jpg',
            perfectImageAbsolutePath = path.resolve(__dirname, perfectImagePath);
        login.logout();
        //share project
        var projectName1 = make.saveProjectNewUser().projectName;
        makeActions.menuShare.click();
        makeActions.menuShareWithUsers.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.inputEmailsUsers.all(by.css('input')).get(0).sendKeys(user1.userEmail);
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        modals.okDialog.click();
        browser.sleep(vars.timeToWaitFadeModals);
        //download original project
        var file1 = path.resolve() + '/target/' + projectName1 + '.json';
        makeActions.menuFile.click();
        browser.sleep(vars.timeToWaitMenu);
        makeActions.menuDownload.click();
        browser.driver.wait(function() {
            return fs.existsSync(file1);
        }, 4000).then(function() {

            login.logout();
            //open shared project
            login.get();
            browser.sleep(vars.timeToWaitTab);
            login.login(user1.user, user1.password);
            projects.sharedProjects.click();
            myprojects.overMyProjects.click();
            browser.sleep(vars.timeToWaitFadeModals);
            myprojects.openProject.click();
            browser.getAllWindowHandles().then(function(handles) {
                browser.switchTo().window(handles[1]).then(function() {
                    //try to change values at infotab
                    browser.sleep(vars.timeToWaitTab);
                    make.infoTab.click();
                    browser.sleep(vars.timeToWaitTab);
                    infoTab.infotabProjectName.clear();
                    infoTab.infotabProjectName.sendKeys('new project name');
                    browser.sleep(vars.timeToWaitAutoSave);
                    expect(make.projectNotAllowSave.getAttribute('aria-hidden')).toBe('false');
                    infoTab.infotabDescription.clear();
                    infoTab.infotabDescription.sendKeys('new description');
                    browser.sleep(vars.timeToWaitAutoSave);
                    expect(make.projectNotAllowSave.getAttribute('aria-hidden')).toBe('false');
                    infoTab.infotabYoutubeVideoInput.clear();
                    infoTab.infotabYoutubeVideoInput.sendKeys(validYoutubeUrl);
                    browser.sleep(vars.timeToWaitSendKeys);
                    browser.sleep(vars.timeToWaitAutoSave);
                    expect(make.projectNotAllowSave.getAttribute('aria-hidden')).toBe('false');
                    //this does not causes autosave
                    infoTab.infotabYoutubeVideoInput.clear();
                    infoTab.infotabYoutubeVideoInput.sendKeys(invalidYoutubeUrl);
                    browser.sleep(vars.timeToWaitAutoSave);
                    expect(make.projectNotAllowSave.getAttribute('aria-hidden')).toBe('false');
                    /////////////////////////////
                    infoTab.infotabFileUpload.sendKeys(perfectImageAbsolutePath);
                    browser.sleep(vars.timeToWaitAutoSave);
                    expect(make.projectNotAllowSave.getAttribute('aria-hidden')).toBe('false');
                    infoTab.infotabTaginputText.sendKeys('TestTag_ONE_1');
                    infoTab.infotabTaginputButton.click();
                    browser.sleep(vars.timeToWaitAutoSave);
                    expect(make.projectNotAllowSave.getAttribute('aria-hidden')).toBe('false');
                    infoTab.infotabChooseThemeButton.click();
                    infoTab.infotabOptionGrayTheme.click();
                    browser.sleep(vars.timeToWaitAutoSave);
                    expect(make.projectNotAllowSave.getAttribute('aria-hidden')).toBe('false');
                    make.projectName.click();
                    modals.inputModalChangeN.clear();
                    modals.inputModalChangeN.sendKeys('new name modal');
                    browser.sleep(vars.timeToWaitSendKeys);
                    modals.okDialog.click();
                    browser.sleep(vars.timeToWaitAutoSave);
                    expect(make.projectNotAllowSave.getAttribute('aria-hidden')).toBe('false');

                    //turn the bloqsproject into codeproject
                    //this does not cause autosave
                    make.softwareTab.click();
                    make.codeTab.click();
                    make.softwareEditCode.click();
                    modals.modalAlertOk.click();
                    ////////////////////////////////////
                    make.infoTab.click();
                    browser.sleep(vars.timeToWaitTab);
                    infoTab.infotabProjectName.clear();
                    infoTab.infotabProjectName.sendKeys('new code project name');
                    browser.sleep(vars.timeToWaitAutoSave);
                    expect(make.projectNotAllowSave.getAttribute('aria-hidden')).toBe('false');
                    infoTab.infotabDescription.clear();
                    infoTab.infotabDescription.sendKeys('new code description');
                    browser.sleep(vars.timeToWaitAutoSave);
                    expect(make.projectNotAllowSave.getAttribute('aria-hidden')).toBe('false');
                    infoTab.infotabYoutubeVideoInput.clear();
                    infoTab.infotabYoutubeVideoInput.sendKeys(validYoutubeUrl);
                    browser.sleep(vars.timeToWaitSendKeys);
                    browser.sleep(vars.timeToWaitAutoSave);
                    expect(make.projectNotAllowSave.getAttribute('aria-hidden')).toBe('false');
                    //this does not causes autosave
                    infoTab.infotabYoutubeVideoInput.clear();
                    infoTab.infotabYoutubeVideoInput.sendKeys(invalidYoutubeUrl);
                    browser.sleep(vars.timeToWaitAutoSave);
                    expect(make.projectNotAllowSave.getAttribute('aria-hidden')).toBe('false');
                    /////////////////////////////
                    infoTab.infotabFileUpload.sendKeys(perfectImageAbsolutePath);
                    browser.sleep(vars.timeToWaitAutoSave);
                    expect(make.projectNotAllowSave.getAttribute('aria-hidden')).toBe('false');
                    infoTab.infotabTaginputText.sendKeys('TestTag_TWO_2');
                    infoTab.infotabTaginputButton.click();
                    browser.sleep(vars.timeToWaitAutoSave);
                    expect(make.projectNotAllowSave.getAttribute('aria-hidden')).toBe('false');
                    infoTab.infotabChooseThemeButton.click();
                    infoTab.infotabOptionGrayTheme.click();
                    browser.sleep(vars.timeToWaitAutoSave);
                    expect(make.projectNotAllowSave.getAttribute('aria-hidden')).toBe('false');
                    make.projectName.click();
                    modals.inputModalChangeN.clear();
                    modals.inputModalChangeN.sendKeys('new name code modal');
                    browser.sleep(vars.timeToWaitSendKeys);
                    modals.okDialog.click();
                    browser.sleep(vars.timeToWaitAutoSave);
                    expect(make.projectNotAllowSave.getAttribute('aria-hidden')).toBe('false');
                    myprojects.get();
                    browser.sleep(vars.timeToWaitTab);
                    projects.sharedProjects.click();
                    myprojects.overMyProjects.click();
                    browser.sleep(vars.timeToWaitFadeModals);
                    myprojects.openProject.click();
                    browser.sleep(vars.timeToWaitTab);
                    browser.getAllWindowHandles().then(function(handles2) {
                        browser.switchTo().window(handles2[2]).then(function() {
                            var file2 = path.resolve() + '/target/' + projectName1 + '.json';
                            makeActions.menuFile.click();
                            browser.sleep(vars.timeToWaitMenu);
                            makeActions.menuDownload.click();
                            browser.driver.wait(function() {
                                return fs.existsSync(file1);
                            }, 4000).then(function() {
                                expect(JSON.parse(fs.readFileSync(file1, 'utf8'))).toEqual(JSON.parse(fs.readFileSync(file2, 'utf8')));
                                login.logout();

                            });

                        });

                    });


                });

            });

        });

    });

});
