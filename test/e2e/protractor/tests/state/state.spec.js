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
    CodeProject = require('../codeproject/codeproject.po.js'),
    Forum = require('../forum/forum.po.js');

var login = new Login(),
    make = new Make(),
    modals = new Modals(),
    projects = new Projects(),
    vars = new Variables(),
    header = new Header(),
    explore = new Explore(),
    project = new Project(),
    globalFunctions = new GlobalFunctions(),
    codeProject = new CodeProject(),
    forum = new Forum();

globalFunctions.xmlReport('state');

describe('State ', function() {
    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bbb-291:state:See a explore tab', function() {
        make.get();
        modals.attentionContinueGuest.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        header.navExplore.click();
        login.loginFromHeader('explore');
        login.logout();
    });

    it('bbb-292:state:See a project in explore tab', function() {
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

    it('bbb-293:state:See a bloqs project detail from explore tab', function() {
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
                        projects.get();
                        login.logout();
                    });
                });
            });
        });
    });

    it('bbb-294:state:See a code project detail from explore tab', function() {
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
                    projects.get();
                    login.logout();
                });
            });
        });
    });

    it('bbb-295:state:See a faq page', function() {
        make.get();
        modals.attentionContinueGuest.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        header.navForum.click();
        forum.faqCategory.click();
        login.loginFromHeader('forum/Preguntas%20frecuentes');
    });

    it('bbb-296:state:See a tutorial page', function() {
        make.get();
        modals.attentionContinueGuest.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        header.navLearn.click();
        login.loginFromHeader('learn');
    });

    it('bbb-297:state:See a changelog page', function() {
        make.get();
        modals.attentionContinueGuest.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        header.navForum.click();
        forum.versionCategory.click();
        login.loginFromHeader('forum/Versiones%20de%20Bitbloq');
    });

    it('bbb-298:state:A search in the explora tab', function() {
        make.get();
        modals.attentionContinueGuest.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        header.navExplore.click();
        explore.exploreFind.clear().sendKeys('Test_Save_');
        browser.getCurrentUrl().then(function(url) {
            login.loginFromHeader('explore');
            browser.getCurrentUrl().then(function(url2){
                var baseUrl1 = url.split('?')[0],
                    baseUrl2 = url2.split('?')[0],
                    params1 = url.split('?')[1].split('&'),
                    params2 = url2.split('?')[1].split('&');
                expect(baseUrl1).toEqual(baseUrl2);
                expect(params1.sort()).toEqual(params2.sort());
            });
        });
    });

    it('bbb-299:state:A filter in the explora tab', function() {
        make.get();
        modals.attentionContinueGuest.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        header.navExplore.click();
        explore.exploreFilterDrowdown.click();
        element.all(by.repeater('compFilter in componentsFilterOptions').row(1).column('compFilter.option')).click();
        browser.getCurrentUrl().then(function(url) {
            login.loginFromHeader('explore');
            browser.getCurrentUrl().then(function(url2){
                var baseUrl1 = url.split('?')[0],
                    baseUrl2 = url2.split('?')[0],
                    params1 = url.split('?')[1].split('&'),
                    params2 = url2.split('?')[1].split('&');
                expect(baseUrl1).toEqual(baseUrl2);
                expect(params1.sort()).toEqual(params2.sort());
            });
        });
    });


    it('bbb-300:state:Verify that the empty bloqsproject isnt saved', function() {
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

    it('bbb-301:state:Verify that the empty codeproject is saved', function() {
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
        expect(projects.getProjectCount()).toBe(1);
        login.logout();
    });

    it('bbb-302:state:Check login and back to where you were(Foro)', function() {
        forum.get();
        var curl;
        browser.getCurrentUrl().then(function(url) {
            curl = url;
        });
        login.loginFromHeader('forum');
        browser.getCurrentUrl().then(function(url) {
            expect(curl).toEqual(url);

        });
        login.logout();
        forum.get();
        browser.sleep(vars.timeToWaitLoadForumCategory);
        forum.newsCategory.click();
        browser.sleep(vars.timeToWaitLoadForumCategory);
        browser.getCurrentUrl().then(function(url) {
            curl = url;
        });
        login.loginFromHeader('forum');
        browser.sleep(vars.timeToWaitLoadForumCategory);
        browser.getCurrentUrl().then(function(url) {
            expect(curl).toEqual(url);
        });
        login.logout();
        forum.createTopicNewUser();
        login.logout();
        forum.get();
        forum.newsCategory.click();
        browser.sleep(vars.timeToWaitLoadForumCategory);
        forum.categoryTopicTitle.click();
        browser.getCurrentUrl().then(function(url) {
            curl = url;
        });
        login.loginFromHeader('forum');
        browser.getCurrentUrl().then(function(url) {

            expect(curl).toEqual(url);
        });
        login.logout();
        /*
         */
    });

});
