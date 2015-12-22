/**
 * Spec to makeActionsHelp.spec.js
 * Menu Share of makeActions
 */

'use strict';

var GlobalFunctions = require('../../../commons/globalFunctions.js'),
    MakeActions = require('../makeActions.po.js'),
    Make = require('../../make.po.js'),
    Explore = require('../../../explore/explore.po.js'),
    Login = require('../../../login/login.po.js'),
    Variables = require('../../../commons/variables.js'),
    Projects = require('../../../projects/projects.po.js'),
    Modals = require('../../../modals/modals.po.js'),
    Commons = require('../../../commons/commons.po.js'),
    Project = require('../../../explore/project.po.js'),
    MyProjects = require('../../../projects/myprojects/myprojects.po.js'),
    fs = require('fs'),
    path = require('path');

var globalFunctions = new GlobalFunctions(),
    makeActions = new MakeActions(),
    make = new Make(),
    explore = new Explore(),
    login = new Login(),
    vars = new Variables(),
    projects = new Projects(),
    modals = new Modals(),
    commons = new Commons(),
    myprojects = new MyProjects(),
    project = new Project();

globalFunctions.xmlReport('makeActionsShare');
describe('Menu Help of MakeActions', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    //TODO test TOAST
    it('bba-109:Publish project', function() {

        var projectName = make.saveProjectNewUser();

        makeActions.menuShare.click();
        browser.sleep(vars.timeToWaitTab);
        makeActions.menuSharePublish.click();
        browser.sleep(vars.timeToWaitTab);
        makeActions.publishButton.click();
        explore.get();
        explore.exploreFind.sendKeys(projectName.projectName);
        browser.sleep(2000);
        expect(explore.projectName.getText()).toContain(projectName.projectName);
        login.logout();

    });
    it('bba-56:make private a project', function() {
        var projectName = make.saveProjectNewUser();

        makeActions.menuShare.click();
        browser.sleep(vars.timeToWaitTab);
        makeActions.menuSharePublish.click();
        browser.sleep(vars.timeToWaitTab);
        makeActions.publishButton.click();
        explore.get();
        explore.exploreFind.sendKeys(projectName.projectName);
        browser.sleep(vars.timeToWaitLoadExporeProjects);
        expect(explore.projectName.getText()).toContain(projectName.projectName);

        explore.projectElem.click();
        browser.sleep(vars.timeToWaitFadeModals);
        explore.projectMoreInfoButton.click();

        project.seeProjectButton.click();

        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {

            browser.sleep(vars.timeToWaitTab);
            browser.switchTo().window(handles[1]).then(function() {
                makeActions.menuShare.click();
                browser.sleep(vars.timeToWaitTab);
                makeActions.menuSharePrivate.click();
                browser.sleep(vars.timeToWaitTab);
                makeActions.privateButton.click();

                explore.get();
                explore.exploreFind.sendKeys(projectName.projectName);
                browser.sleep(2000);
                explore.exploreCounts.getText().then(function(value) {
                    value = value.split('/');
                    expect(Number(value[1])).toEqual(0);
                });
            });
            login.logout();
        });
    });
    it('bba-139:Verify that if not saved project, cannot share', function() {
        //on standalone, this does not work. with the full suite, its necessary
        browser.getAllWindowHandles().then(function(handles) {
            browser.close().then(browser.switchTo().window(handles[0]));
        });

        //////////////////////////////////////////////////////////////////////
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
            });

        });

    });
    it('bba-142:share project with other users', function() {
        //on standalone, this does not work. with the full suite, its necessary
        browser.getAllWindowHandles().then(function(handles) {
            browser.close().then(browser.switchTo().window(handles[0]));
        });

        //////////////////////////////////////////////////////////////////////
        var user1 = login.loginWithRandomUser();

        login.logout();
        var user2 = login.loginWithRandomUser();
        login.logout();
        var user3 = login.loginWithRandomUser();
        login.logout();
        var projectName1 = make.saveProjectNewUser().projectName;
        //share a project with 1 user
        makeActions.menuShare.click();
        makeActions.menuShareWithUsers.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.inputEmailsUsers.all(by.css('input')).get(0).sendKeys(user1.userEmail);
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        modals.okDialog.click();
        browser.sleep(vars.timeToWaitFadeModals);
        //browser.sleep(1000);
        globalFunctions.navigatorLanguage()
            .then(function(language) {
                if (language === 'es') {
                    commons.expectToastTimeOutandText(commons.alertTextToast, 'Tu proyecto se ha compartido con 1 personas');
                } else {
                    commons.expectToastTimeOutandText(commons.alertTextToast, 'Your project has been shared with 1 people');
                }
            });
        //download project 1 to comapre
        var file1 = path.resolve() + '/target/' + projectName1 + '.json';
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
            browser.sleep(vars.timeToWaitFadeModals);
            modals.okDialog.click();
            browser.sleep(vars.timeToWaitFadeModals);
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
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            modals.inputEmailsUsers.all(by.css('input')).get(0).sendKeys('absolutelyfakeemail@fake.no');
            browser.sleep(vars.timeToWaitSendKeys);
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            modals.inputEmailsUsers.all(by.css('input')).get(0).sendKeys(user3.userEmail);
            browser.sleep(vars.timeToWaitSendKeys);
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            modals.okDialog.click();
            browser.sleep(vars.timeToWaitFadeModals);
            modals.okDialog.click();
            browser.sleep(vars.timeToWaitFadeModals);
            globalFunctions.navigatorLanguage()
                .then(function(language) {
                    if (language === 'es') {
                        commons.expectToastTimeOutandText(commons.alertTextToast, 'Tu proyecto se ha compartido con 2 personas');
                    } else {
                        commons.expectToastTimeOutandText(commons.alertTextToast, 'Your project has been shared with 2 people');
                    }
                });
            //download second project
            var file2 = path.resolve() + '/target/' + projectName2 + '.json';
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
                browser.sleep(vars.timeToWaitFadeModals);
                myprojects.openProject.click();
                browser.getAllWindowHandles().then(function(handles) {
                    browser.sleep(vars.timeToWaitTab);
                    browser.switchTo().window(handles[1]).then(function() {
                        var shareFile1 = path.resolve() + '/target/' + projectName1 + '.json';
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
                            browser.sleep(vars.timeToWaitFadeModals);
                            myprojects.openProject.click();
                            browser.getAllWindowHandles().then(function(handles2) {
                                browser.sleep(vars.timeToWaitTab);
                                browser.switchTo().window(handles2[2]).then(function() {
                                    var shareFile2 = path.resolve() + '/target/' + projectName2 + '.json';
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
                                        browser.sleep(vars.timeToWaitFadeModals);
                                        myprojects.openProject.click();
                                        browser.getAllWindowHandles().then(function(handles3) {
                                            browser.sleep(vars.timeToWaitTab);
                                            browser.switchTo().window(handles3[3]).then(function() {
                                                var shareFile3 = path.resolve() + '/target/' + projectName2 + '.json';
                                                makeActions.menuFile.click();
                                                browser.sleep(vars.timeToWaitMenu);
                                                makeActions.menuDownload.click();
                                                browser.driver.wait(function() {
                                                    return fs.existsSync(shareFile3);
                                                }, 4000).then(function() {
                                                    expect(JSON.parse(fs.readFileSync(file2, 'utf8'))).toEqual(JSON.parse(fs.readFileSync(shareFile3, 'utf8')));
                                                    login.logout();
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
    it('bba-141:Access the project from URL only if you have been shared the project', function() {
        var user1 = login.loginWithRandomUser();
        login.logout();
        var projectName1 = make.saveProjectNewUser().projectName;
        //share the project with user 1
        makeActions.menuShare.click();
        makeActions.menuShareWithUsers.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.inputEmailsUsers.all(by.css('input')).get(0).sendKeys(user1.userEmail);
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        modals.okDialog.click();
        browser.sleep(vars.timeToWaitFadeModals);
        //download the project to comapre
        var file1 = path.resolve() + '/target/' + projectName1 + '.json';
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

                var file2 = path.resolve() + '/target/' + projectName1 + '.json';
                makeActions.menuFile.click();
                browser.sleep(vars.timeToWaitMenu);
                makeActions.menuDownload.click();
                browser.driver.wait(function() {
                    return fs.existsSync(file2);
                }, 4000).then(function() {
                    console.log('antes de comparar');
                    expect(JSON.parse(fs.readFileSync(file1, 'utf8'))).toEqual(JSON.parse(fs.readFileSync(file2, 'utf8')));
                    console.log('despues de comparar');
                    login.logout();
                    login.loginWithRandomUser();
                    browser.get(url);
                    browser.sleep(vars.timeToWaitTab);
                    modals.rejectTour();
                    commons.expectToastTimeOutandText(commons.alertTextToast, 'Este es un proyecto privado y no tienes permisos para verlo.');
                    expect(browser.getCurrentUrl()).toMatch('#/bloqsproject');

                });

            });

        });

    });

});
