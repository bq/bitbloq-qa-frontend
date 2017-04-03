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
    Commons = require('../../../commons/commons.po.js'),
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
    login = new Login(),
    commons = new Commons();

globalFunctions.xmlReport('makeactionsShareLocal');
describe('Menu share of makeactions local', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();
    //function to close all opened tabs
    function closeTabs() {
        browser.getAllWindowHandles().then(function(handles) {
            var ventanas = handles.length;
            while (ventanas > 1) {
                ventanas = ventanas - 1;
                browser.close().then(browser.switchTo().window(handles[ventanas - 1]));
            }
        });
    }

    it('bbb-85:makeactionsShareLocal:Modify a project shared to you', function() {
        var validYoutubeUrl = 'https://youtu.be/f2WME8N8qXc?list=PL3AshJDPy8GQhVWkzsjc5IvrzD5ctpQXN';
        var invalidYoutubeUrl = 'https://www.youtube.com/user/TheRedsMusic';
        var user1 = login.loginWithRandomUser();
        var perfectImagePath = '../../../../res/perfectimage.jpg',
            perfectImageAbsolutePath = path.resolve(__dirname, perfectImagePath);
        login.logout();
        //share project
        var projectName1 = make.saveProjectNewUser().projectName;
        browser.sleep(vars.timeToWaitSaveNewProject);
        makeActions.menuShare.click();
        makeActions.menuShareWithUsers.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.inputEmailsUsers.all(by.css('input')).get(0).sendKeys(user1.userEmail);
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        modals.okDialog.click();
        browser.sleep(vars.timeToWaitFadeModals);
        //download original project
        var file1 = path.resolve() + '/target/' + projectName1 + '.bitbloq';
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
            browser.getAllWindowHandles().then(function(handles) {
                browser.switchTo().window(handles[1]).then(function() {
                    //try to change values at infotab
                    browser.sleep(vars.timeToWaitTab);
                    make.infoTab.click();
                    browser.sleep(vars.timeToWaitTab);
                    make.projectName.click();
                    modals.inputModalChangeN.clear();
                    modals.inputModalChangeN.sendKeys('new project name');
                    modals.okDialog.click();
                    browser.sleep(vars.timeToWaitAutoSave);
                    expect(make.isProjectNotAllowSaveShown()).toBeTruthy();
                    infoTab.infotabDescription.clear();
                    infoTab.infotabDescription.sendKeys('new description');
                    browser.sleep(vars.timeToWaitAutoSave);
                    expect(make.isProjectNotAllowSaveShown()).toBeTruthy();
                    infoTab.infotabYoutubeVideoInput.clear();
                    infoTab.infotabYoutubeVideoInput.sendKeys(validYoutubeUrl);
                    browser.sleep(vars.timeToWaitSendKeys);
                    browser.sleep(vars.timeToWaitAutoSave);
                    expect(make.isProjectNotAllowSaveShown()).toBeTruthy();
                    //this does not causes autosave
                    infoTab.infotabYoutubeVideoInput.clear();
                    infoTab.infotabYoutubeVideoInput.sendKeys(invalidYoutubeUrl);
                    browser.sleep(vars.timeToWaitAutoSave);
                    expect(make.isProjectNotAllowSaveShown()).toBeTruthy();
                    /////////////////////////////
                    infoTab.infotabFileUpload.sendKeys(perfectImageAbsolutePath);
                    browser.sleep(vars.timeToWaitAutoSave);
                    expect(make.isProjectNotAllowSaveShown()).toBeTruthy();
                    infoTab.infotabTaginputText.sendKeys('TestTag_ONE_1');
                    infoTab.infotabTaginputButton.click();
                    browser.sleep(vars.timeToWaitAutoSave);
                    expect(make.isProjectNotAllowSaveShown()).toBeTruthy();
                    infoTab.infotabChooseThemeButton.click();
                    infoTab.infotabOptionGrayTheme.click();
                    browser.sleep(vars.timeToWaitAutoSave);
                    expect(make.isProjectNotAllowSaveShown()).toBeTruthy();
                    make.projectName.click();
                    modals.inputModalChangeN.clear();
                    modals.inputModalChangeN.sendKeys('new name modal');
                    browser.sleep(vars.timeToWaitSendKeys);
                    modals.okDialog.click();
                    browser.sleep(vars.timeToWaitAutoSave);
                    expect(make.isProjectNotAllowSaveShown()).toBeTruthy();

                    //turn the bloqsproject into codeproject
                    //this does not cause autosave
                    make.softwareTab.click();
                    browser.sleep(vars.timeToWaitTab);
                    make.codeTab.click();
                    make.softwareEditCode.click();
                    modals.modalAlertOk.click();
                    browser.sleep(vars.timeToWaitFadeModals);
                    ////////////////////////////////////
                    make.infoTab.click();
                    browser.sleep(vars.timeToWaitTab);
                    make.projectName.click();
                    modals.inputModalChangeN.clear();
                    modals.inputModalChangeN.sendKeys('new code project');
                    modals.okDialog.click();
                    browser.sleep(vars.timeToWaitAutoSave);
                    expect(make.isProjectNotAllowSaveShown()).toBeTruthy();
                    infoTab.infotabDescription.clear();
                    infoTab.infotabDescription.sendKeys('new code description');
                    browser.sleep(vars.timeToWaitAutoSave);
                    expect(make.isProjectNotAllowSaveShown()).toBeTruthy();
                    infoTab.infotabYoutubeVideoInput.clear();
                    infoTab.infotabYoutubeVideoInput.sendKeys(validYoutubeUrl);
                    browser.sleep(vars.timeToWaitSendKeys);
                    browser.sleep(vars.timeToWaitAutoSave);
                    expect(make.isProjectNotAllowSaveShown()).toBeTruthy();
                    //this does not causes autosave
                    infoTab.infotabYoutubeVideoInput.clear();
                    infoTab.infotabYoutubeVideoInput.sendKeys(invalidYoutubeUrl);
                    browser.sleep(vars.timeToWaitAutoSave);
                    expect(make.isProjectNotAllowSaveShown()).toBeTruthy();
                    /////////////////////////////
                    infoTab.infotabFileUpload.sendKeys(perfectImageAbsolutePath);
                    browser.sleep(vars.timeToWaitAutoSave);
                    expect(make.isProjectNotAllowSaveShown()).toBeTruthy();
                    infoTab.infotabTaginputText.sendKeys('TestTag_TWO_2');
                    infoTab.infotabTaginputButton.click();
                    browser.sleep(vars.timeToWaitAutoSave);
                    expect(make.isProjectNotAllowSaveShown()).toBeTruthy();
                    infoTab.infotabChooseBoardButton.click();
                    infoTab.infotabBQZumButton.click();
                    browser.sleep(vars.timeToWaitAutoSave);
                    expect(make.isProjectNotAllowSaveShown()).toBeTruthy();
                    make.projectName.click();
                    modals.inputModalChangeN.clear();
                    modals.inputModalChangeN.sendKeys('new name code modal');
                    browser.sleep(vars.timeToWaitSendKeys);
                    modals.okDialog.click();
                    browser.sleep(vars.timeToWaitAutoSave);
                    expect(make.isProjectNotAllowSaveShown()).toBeTruthy();
                    myprojects.get();
                    browser.sleep(vars.timeToWaitTab);
                    projects.sharedProjects.click();
                    browser.sleep(vars.timeToWaitTab);
                    element.all(by.repeater('project in sharedProjects').row(0)).click();
                    browser.sleep(vars.timeToWaitTab);
                    browser.getAllWindowHandles().then(function(handles2) {
                        browser.switchTo().window(handles2[2]).then(function() {
                            var file2 = path.resolve() + '/target/' + projectName1 + '.bitbloq';
                            makeActions.menuFile.click();
                            browser.sleep(vars.timeToWaitMenu);
                            makeActions.menuDownload.click();
                            browser.driver.wait(function() {
                                return fs.existsSync(file1);
                            }, 4000).then(function() {
                                expect(JSON.parse(fs.readFileSync(file1, 'utf8'))).toEqual(JSON.parse(fs.readFileSync(file2, 'utf8')));
                                login.logout();

                                closeTabs();
                            });

                        });

                    });

                });

            });

        });

    });
    it('bbb-80:makeactionsShareLocal:Verify that if not saved project, cannot share', function() {

        login.loginWithRandomUser();
        projects.createNewProject();
        browser.getAllWindowHandles().then(function(handles) {

            browser.sleep(vars.timeToWaitTab);
            browser.switchTo().window(handles[1]).then(function() {
                modals.rejectTour();
                browser.sleep(vars.timeToWaitFadeModals);
                makeActions.menuShare.click();
                expect(makeActions.menuSharePublish.getAttribute('aria-disabled')).toBe('true');
                expect(makeActions.menuShareWithUsers.getAttribute('aria-disabled')).toBe('true');
                expect(makeActions.menuShareSocial.getAttribute('aria-disabled')).toBe('true');
                make.saveProject();
                makeActions.menuShare.click();
                expect(makeActions.menuSharePublish.getAttribute('aria-disabled')).toBe('false');
                expect(makeActions.menuShareWithUsers.getAttribute('aria-disabled')).toBe('false');
                expect(makeActions.menuShareSocial.getAttribute('aria-disabled')).toBe('false');
                login.logout();
                closeTabs();
            });

        });

    });
    it('bbb-81:makeactionsShareLocal:share project with other users', function() {

        var user1 = login.loginWithRandomUser();
        login.logout();
        var user2 = login.loginWithRandomUser();
        login.logout();
        var user3 = login.loginWithRandomUser();
        login.logout();
        var projectName1 = make.saveProjectNewUser().projectName;
        browser.sleep(vars.timeToWaitSaveNewProject);
        //share a project with 1 user
        makeActions.menuShare.click();
        makeActions.menuShareWithUsers.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.inputEmailsUsers.all(by.css('input')).get(0).sendKeys(user1.userEmail);
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        modals.okDialog.click();
        globalFunctions.navigatorLanguage()
            .then(function(language) {
                if (language === 'es') {
                    commons.expectToastTimeOutandText(commons.alertTextToast, 'Tu proyecto se ha compartido con 1 personas');
                } else {
                    commons.expectToastTimeOutandText(commons.alertTextToast, 'Your project has been shared with 1 people');
                }
            });
        //download project 1 to comapre
        var file1 = path.resolve() + '/target/' + projectName1 + '.bitbloq';
        makeActions.menuFile.click();
        browser.sleep(vars.timeToWaitMenu);
        makeActions.menuDownload.click();
        browser.driver.wait(function() {
            return fs.existsSync(file1);
        }, 4000).then(function() {

            //share project non registered user
            var projectName2 = make.saveProject().projectName;
            makeActions.menuShare.click();
            makeActions.menuShareWithUsers.click();
            browser.sleep(vars.timeToWaitFadeModals);
            modals.inputEmailsUsers.all(by.css('input')).get(0).sendKeys('absolutelyfakeemail@fake.no');
            browser.sleep(vars.timeToWaitSendKeys);
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            modals.okDialog.click();
            browser.sleep(vars.timeToWaitFadeModals +1000);
            modals.okDialog.click();
            globalFunctions.navigatorLanguage()
                .then(function(language) {
                    if (language === 'es') {
                        commons.expectToastTimeOutandText(commons.alertTextToast, 'Tu proyecto se ha compartido con 0 personas');
                    } else {
                        commons.expectToastTimeOutandText(commons.alertTextToast, 'Your project has been shared with 0 people');
                    }
                });
            //share project multiple user+incorrect
            makeActions.menuShare.click();
            makeActions.menuShareWithUsers.click();
            browser.sleep(vars.timeToWaitFadeModals);
            modals.inputEmailsUsers.all(by.css('input')).get(0).sendKeys(user2.userEmail);
            browser.sleep(vars.timeToWaitSendKeys);
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            modals.inputEmailsUsers.all(by.css('input')).get(0).sendKeys('absolutelyfakeemail@fake.no');
            browser.sleep(vars.timeToWaitSendKeys);
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            modals.inputEmailsUsers.all(by.css('input')).get(0).sendKeys(user3.userEmail);
            browser.sleep(vars.timeToWaitSendKeys);
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            modals.okDialog.click();
            browser.sleep(vars.timeToWaitFadeModals + 1000);
            modals.okDialog.click();
            globalFunctions.navigatorLanguage()
                .then(function(language) {
                    if (language === 'es') {
                        commons.expectToastTimeOutandText(commons.alertTextToast, 'Tu proyecto se ha compartido con 2 personas');
                    } else {
                        commons.expectToastTimeOutandText(commons.alertTextToast, 'Your project has been shared with 2 people');
                    }
                });
            //download second project
            var file2 = path.resolve() + '/target/' + projectName2 + '.bitbloq';
            makeActions.menuFile.click();
            browser.sleep(vars.timeToWaitMenu);
            makeActions.menuDownload.click();
            browser.driver.wait(function() {
                return fs.existsSync(file2);
            }, 4000).then(function() {
                login.logout();
                login.get();
                browser.sleep(vars.timeToWaitTab);

                //check user 1 has Project
                login.login(user1.user, user1.password);
                projects.sharedProjects.click();
                myprojects.overMyProjects.click();
                browser.getAllWindowHandles().then(function(handles) {
                    browser.sleep(vars.timeToWaitTab);
                    browser.switchTo().window(handles[1]).then(function() {
                        var shareFile1 = path.resolve() + '/target/' + projectName1 + '.bitbloq';
                        makeActions.menuFile.click();
                        browser.sleep(vars.timeToWaitMenu);
                        makeActions.menuDownload.click();
                        browser.driver.wait(function() {
                            return fs.existsSync(shareFile1);
                        }, 4000).then(function() {
                            expect(JSON.parse(fs.readFileSync(file1, 'utf8'))).toEqual(JSON.parse(fs.readFileSync(shareFile1, 'utf8')));
                            //check user 2 & 3 have project
                            login.logout();
                            login.get();
                            browser.sleep(vars.timeToWaitTab);
                            login.login(user2.user, user2.password);
                            projects.sharedProjects.click();
                            myprojects.overMyProjects.click();
                            browser.getAllWindowHandles().then(function(handles2) {
                                browser.sleep(vars.timeToWaitTab);
                                browser.switchTo().window(handles2[2]).then(function() {
                                    var shareFile2 = path.resolve() + '/target/' + projectName2 + '.bitbloq';
                                    makeActions.menuFile.click();
                                    browser.sleep(vars.timeToWaitMenu);
                                    makeActions.menuDownload.click();
                                    browser.driver.wait(function() {
                                        return fs.existsSync(shareFile2);
                                    }, 4000).then(function() {
                                        expect(JSON.parse(fs.readFileSync(file2, 'utf8'))).toEqual(JSON.parse(fs.readFileSync(shareFile2, 'utf8')));
                                        login.logout();
                                        login.get();
                                        browser.sleep(vars.timeToWaitTab);
                                        login.login(user3.user, user3.password);
                                        projects.sharedProjects.click();
                                        myprojects.overMyProjects.click();
                                        browser.getAllWindowHandles().then(function(handles3) {
                                            browser.sleep(vars.timeToWaitTab);
                                            browser.switchTo().window(handles3[3]).then(function() {
                                                var shareFile3 = path.resolve() + '/target/' + projectName2 + '.bitbloq';
                                                makeActions.menuFile.click();
                                                browser.sleep(vars.timeToWaitMenu);
                                                makeActions.menuDownload.click();
                                                browser.driver.wait(function() {
                                                    return fs.existsSync(shareFile3);
                                                }, 4000).then(function() {
                                                    expect(JSON.parse(fs.readFileSync(file2, 'utf8'))).toEqual(JSON.parse(fs.readFileSync(shareFile3, 'utf8')));
                                                    login.logout();
                                                    closeTabs();
                                                });

                                            });

                                        });
                                    });

                                });
                            });
                        });

                    });

                });

            });

        });

    });
    it('bbb-84:makeactionsShareLocal:Access the project from URL only if you have been shared the project', function() {
        var user1 = login.loginWithRandomUser();
        login.logout();
        var projectName1 = make.saveProjectNewUser().projectName;
        browser.sleep(vars.timeToWaitSaveNewProject);
        //share the project with user 1
        makeActions.menuShare.click();
        makeActions.menuShareWithUsers.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.inputEmailsUsers.all(by.css('input')).get(0).sendKeys(user1.userEmail);
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        modals.okDialog.click();
        browser.sleep(vars.timeToWaitFadeModals);
        //download the project to comapre
        var file1 = path.resolve() + '/target/' + projectName1 + '.bitbloq';
        makeActions.menuFile.click();
        browser.sleep(vars.timeToWaitMenu);
        makeActions.menuDownload.click();
        browser.driver.wait(function() {
            return fs.existsSync(file1);
        }, 4000).then(function() {
            browser.getCurrentUrl().then(function(url) {
                console.log(url);

                login.logout();
                login.get();
                browser.sleep(vars.timeToWaitTab);
                login.login(user1.user, user1.password);
                browser.get(url);

                browser.sleep(vars.timeToWaitTab);

                var file2 = path.resolve() + '/target/' + projectName1 + '.bitbloq';
                makeActions.menuFile.click();
                browser.sleep(vars.timeToWaitMenu);
                makeActions.menuDownload.click();
                browser.driver.wait(function() {
                    return fs.existsSync(file2);
                }, 4000).then(function() {
                    expect(JSON.parse(fs.readFileSync(file1, 'utf8'))).toEqual(JSON.parse(fs.readFileSync(file2, 'utf8')));
                    login.logout();
                    login.loginWithRandomUser();
                    browser.get(url);
                    browser.sleep(vars.timeToWaitTab);
                    modals.rejectTour();
                    globalFunctions.navigatorLanguage()
                        .then(function(language) {
                            if (language === 'es') {
                                commons.expectToastTimeOutandText(commons.alertTextToast, vars.toastIsPrivateProject);
                            } else {
                                commons.expectToastTimeOutandText(commons.alertTextToast, vars.toastIsPrivateProjectEN);
                            }
                        });
                    expect(browser.getCurrentUrl()).toMatch('#/bloqsproject');
                    login.logout();
                    closeTabs();

                });

            });

        });

    });

});
