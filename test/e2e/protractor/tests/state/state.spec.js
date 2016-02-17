/**
 * Commons Spec to state
 */

'use strict';

var Login = require('../login/login.po.js'),
    Make = require('../bloqsproject/make.po.js'),
    GlobalFunctions = require('../commons/globalFunctions.js'),
    Modals = require('../modals/modals.po.js'),
    Projects = require('../projects/projects.po.js'),
    Variables = require('../commons/variables.js'),
    Header = require('../header/header.po.js'),
    Explore = require('../explore/explore.po.js'),
    Project = require('../explore/project.po.js'),
    Help = require('../help/help.po.js'),
    Modals = require('../modals/modals.po.js'),
    CodeProject = require('../codeproject/codeproject.po.js'),
    Forum = require('../help/forum/forum.po.js');

var login = new Login(),
    make = new Make(),
    modals = new Modals(),
    projects = new Projects(),
    vars = new Variables(),
    modals = new Modals(),
    header = new Header(),
    explore = new Explore(),
    project = new Project(),
    help = new Help(),
    globalFunctions = new GlobalFunctions(),
    codeProject = new CodeProject(),
    forum = new Forum();

globalFunctions.xmlReport('state');

describe('State ', function() {
    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bba-273:Verify that the empty bloqsproject isnt saved', function() {
        make.get();
        modals.attentionContinueGuest.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        login.loginFromHeader('bloqsproject');
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        globalFunctions.navigatorLanguage()
            .then(function(language) {
                if (language === 'es') {
                    expect(make.projectName.getText()).toEqual(vars.nameNewProject);
                } else {
                    expect(make.projectName.getText()).toEqual(vars.nameNewProjectEN);
                }
            });
        projects.get();
        expect(projects.getProjectCount()).toBe(0);
        login.logout();
    });

    it('bba-274:Verify that the empty codeproject isnt saved', function() {
        make.get();
        modals.attentionContinueGuest.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        make.softwareTab.click();
        browser.sleep(vars.timeToWaitTab);
        make.codeTab.click();
        make.softwareEditCode.click();
        modals.modalAlertOk.click();
        login.loginFromHeader('codeproject');
        projects.get();
        expect(projects.getProjectCount()).toBe(0);
        login.logout();
    });

    it('bba-258:See a explore tab', function() {
        make.get();
        modals.attentionContinueGuest.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        header.navExplore.click();
        login.loginFromHeader('explore');
        login.logout();
    });

    it('bba-260:See a project in explore tab', function() {
        var projectElem;
        make.saveProjectAndPublishNewUserAndLogout().then(function(project1) {
            make.get();
            modals.attentionContinueGuest.click();
            browser.sleep(vars.timeToWaitFadeModals);
            modals.rejectTour();
            browser.sleep(vars.timeToWaitFadeModals);
            header.navExplore.click();
            explore.exploreFind.clear().sendKeys(project1.projectName).then(function() {
                projectElem = explore.projectElem;
                projectElem.click();
                browser.sleep(vars.timeToWaitFadeModals);
                explore.projectMoreInfoButton.click();
                browser.getCurrentUrl().then(function(url) {
                    login.loginFromHeader('project');
                    expect(browser.getCurrentUrl()).toEqual(url);
                    login.logout();
                });
            });
        });
    });

    it('bba-261:See a bloqs project detail from explore tab', function() {
        var projectElem;
        make.saveProjectAndPublishNewUserAndLogout().then(function(project1) {
            make.get();
            modals.attentionContinueGuest.click();
            browser.sleep(vars.timeToWaitFadeModals);
            modals.rejectTour();
            browser.sleep(vars.timeToWaitFadeModals);
            header.navExplore.click();
            explore.exploreFind.clear().sendKeys(project1.projectName).then(function() {
                projectElem = explore.projectElem;
                projectElem.click();
                browser.sleep(vars.timeToWaitFadeModals);
                explore.projectMoreInfoButton.click();
                browser.getCurrentUrl().then(function(url) {
                    url = url.split('/');
                    project.seeProjectButton.click();
                    browser.sleep(vars.timeToWaitTab);
                    browser.getAllWindowHandles().then(function(handles) {
                        browser.switchTo().window(handles[1]);
                        browser.sleep(vars.timeToWaitTab);
                        login.loginFromHeader('bloqsproject');
                        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/bloqsproject/' + url[url.length - 1]);
                        browser.close().then(browser.switchTo().window(handles[0]));
                        login.logout();
                    });
                });
            });
        });
    });

    it('bba-262:See a code project detail from explore tab', function() {
        var projectElem;
        var projectSaved = codeProject.saveCodeProjectAndPublishNewUserAndLogout();
        make.get();
        modals.attentionContinueGuest.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        header.navExplore.click();
        explore.exploreFind.clear().sendKeys(projectSaved.projectName).then(function() {
            projectElem = explore.projectElem;
            projectElem.click();
            browser.sleep(vars.timeToWaitFadeModals);
            explore.projectMoreInfoButton.click();
            browser.getCurrentUrl().then(function(url) {
                url = url.split('/');
                project.seeProjectButton.click();
                browser.sleep(vars.timeToWaitTab);
                browser.getAllWindowHandles().then(function(handles) {
                    browser.switchTo().window(handles[1]);
                    browser.sleep(vars.timeToWaitTab);
                    login.loginFromHeader('codeproject');
                    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/codeproject/' + url[url.length - 1]);
                    browser.close().then(browser.switchTo().window(handles[0]));
                    login.logout();
                });
            });
        });
    });

    it('bba-263:See a faq page', function() {
        make.get();
        modals.attentionContinueGuest.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        header.navHelp.click();
        help.tutorialTab.click();
        help.faqTab.click();
        login.loginFromHeader('help/faq');
    });

    it('bba-264:See a tutorial page', function() {
        make.get();
        modals.attentionContinueGuest.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        header.navHelp.click();
        help.tutorialTab.click();
        login.loginFromHeader('help/tutorial');
    });

    it('bba-265:See a changelog page', function() {
        make.get();
        modals.attentionContinueGuest.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        header.navHelp.click();
        help.changelogTab.click();
        login.loginFromHeader('help/update');
    });

    it('bba-266:A search in the explora tab', function() {
        make.get();
        modals.attentionContinueGuest.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        header.navExplore.click();
        explore.exploreFind.clear().sendKeys('Test_Save_');
        browser.getCurrentUrl().then(function(url) {
            login.loginFromHeader('explore');
            expect(browser.getCurrentUrl()).toEqual(url);
        });

    });

    it('bba-267:A filter in the explora tab', function() {
        make.get();
        modals.attentionContinueGuest.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        header.navExplore.click();
        explore.exploreFilterDrowdown.click();
        element.all(by.repeater('compFilter in componentsFilterOptions').row(1).column('compFilter.option')).click();
        browser.sleep(vars.timeToWaitAutoSave);
        browser.getCurrentUrl().then(function(url) {
            login.loginFromHeader('explore');
            expect(browser.getCurrentUrl()).toEqual(url);
        });

    });

    it('bba-310:Check login and back to where you were(Foro)', function() {
        forum.get();
        browser.getCurrentUrl().then(function(url) {
            login.loginFromHeader('help/forum');
            expect(browser.getCurrentUrl()).toEqual(url);
            login.logout();
            forum.get();
            forum.categoryButton.click();
            browser.sleep(vars.timeToWaitLoadForumCategory);
            browser.getCurrentUrl().then(function(url) {
                login.loginFromHeader('help/forum');
                browser.sleep(vars.timeToWaitLoadForumCategory);
                expect(browser.getCurrentUrl()).toEqual(url);
                login.logout();
                forum.createTopicNewUser();
                login.logout();
                forum.get();
                forum.categoryButton.click();
                browser.sleep(vars.timeToWaitLoadForumCategory);
                forum.categoryTopicTitle.click();
                browser.getCurrentUrl().then(function(url) {
                    login.loginFromHeader('help/forum');
                    expect(browser.getCurrentUrl()).toEqual(url);
                    login.logout();
                });
            });

        });
    });

});
