'use strict';
var GlobalFunctions = require('../commons/globalFunctions.js'),
    Variables = require('../commons/variables.js'),
    Forum = require('./forum.po.js'),
    Login = require('../login/login.po.js');

var globalFunctions = new GlobalFunctions(),
    vars = new Variables(),
    forum = new Forum(),
    login = new Login();

globalFunctions.xmlReport('forum');

describe('Forum', function() {
    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bbb-215:forum:check forum tag is present', function() {
        forum.get();
        browser.sleep(vars.timeToWaitTab);
        browser.getCurrentUrl().then(function(url) {
            expect(url).toMatch(/#\/forum/);

        });

    });
    it('bbb-216:forum:check create a new topic button', function() {

        login.loginWithRandomUser();
        // from the main forum page
        forum.get();
        expect(forum.newTopicButton.isPresent()).toBe(true);
        forum.newTopicButton.click();
        browser.getCurrentUrl().then(function(url) {
            expect(url).toMatch(/#\/forum\/new-theme/);
            //from a category
            forum.get();
            browser.sleep(vars.timeToWaitTab);
            forum.newsCategory.click();
            expect(forum.newTopicButton.isPresent()).toBe(true);
            forum.newTopicButton.click();
            browser.getCurrentUrl().then(function(url) {
                expect(url).toMatch(/#\/forum\/new-theme/);
                //from a topic
                forum.get();
                browser.sleep(vars.timeToWaitTab);
                forum.newsCategory.click();
                forum.createNewTopic();
                browser.sleep(vars.timeToWaitLoadForumCategory);
                expect(forum.newTopicButton.isPresent()).toBe(false);
            });
        });
    });

    it('bbb-225:forum:create a new topic (not registered)', function() {
        forum.get();
        forum.newTopicButton.click();
        browser.getCurrentUrl().then(function(url) {
            expect(url).toMatch(/#\/login/);
            forum.get();
            browser.get('#/forum/new-theme/');
            browser.getCurrentUrl().then(function(url2) {
                expect(url2).toMatch(/#\/login/);
            });
        });
    });


    it('bbb-226:forum:create a new topic wrong', function() {
        login.loginWithRandomUser();

        var titulo = 'tema automatico ' + Number(new Date());
        var contenido = 'comentario automatico ' + Number(new Date());


        //topic no category
        forum.get();
        forum.newTopicButton.click();
        forum.newTopicTitle.sendKeys(titulo);
        forum.newTopicDescription.all(by.css('div')).get(15).click();
        forum.newTopicDescription.all(by.css('div')).get(15).sendKeys(contenido);
        expect(forum.publishTopic.getAttribute('aria-disabled')).toBe('true');


        //topic no title
        forum.get();
        forum.newTopicButton.click();
        forum.categoryList.click();
        forum.categoryList.all(by.css('li')).get(4).click();
        forum.newTopicDescription.all(by.css('div')).get(15).click();
        forum.newTopicDescription.all(by.css('div')).get(15).sendKeys(contenido);
        expect(forum.publishTopic.getAttribute('aria-disabled')).toBe('true');


        //topic no description
        forum.get();
        forum.newTopicButton.click();
        forum.categoryList.click();
        forum.categoryList.all(by.css('li')).get(4).click();
        forum.newTopicTitle.sendKeys(titulo);
        expect(forum.publishTopic.getAttribute('aria-disabled')).toBe('true');

        //all is ok
        forum.get();
        forum.newTopicButton.click();
        forum.categoryList.click();
        forum.categoryList.all(by.css('li')).get(4).click();
        forum.newTopicTitle.sendKeys(titulo);
        forum.newTopicDescription.all(by.css('div')).get(15).sendKeys(contenido);
        expect(forum.publishTopic.getAttribute('aria-disabled')).toBe('false');

        login.logout();
    });

    it('bbb-194:forum: contact us (register user)', function() {
        forum.get();
        globalFunctions.navigatorLanguage()
            .then(function(language) {
                expect(forum.contactUsLink.getAttribute('href')).toEqual(vars.supportEmail(language));
            });
    });

    xit('bbb-191:forum:Comprobar botones Informar de un error en usuario registrado', function() {

        login.loginWithRandomUser();
        forum.get();

        globalFunctions.scrollBottomPage().then(function(){
            forum.contactUsButton.click();
            browser.sleep(vars.timeToWaitFadeModals);
        });
        // forum.contactUsButton.click();
        // browser.sleep(vars.timeToWaitFadeModals);

        // modals.bladeClose.click();
        // browser.sleep(vars.timeToWaitFadeModals);
        //
        // help.feedbackAboutAnError.click();
        // browser.sleep(vars.timeToWaitFadeModals);
        // globalFunctions.navigatorLanguage()
        //     .then(function(language) {
        //         if (language === 'es') {
        //             expect(modals.modalTitle.getText()).toEqual(vars.infoErrorLiteral);
        //         } else {
        //             expect(modals.modalTitle.getText()).toEqual(vars.infoErrorLiteralEN);
        //         }
        //     });
        // modals.bladeClose.click();
        // browser.sleep(vars.timeToWaitFadeModals);
    });
});
