'use strict';
var GlobalFunctions = require('../../commons/globalFunctions.js'),
    Variables = require('../../commons/variables.js'),
    Forum = require('./forum.po.js'),
    Login = require('../../login/login.po.js');

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
        //from the main forum page
        forum.get();
        browser.sleep(vars.timeToWaitTab);
        expect(forum.newTopicButtonArray.get(0).isPresent()).toBe(true);
        forum.newTopicButtonArray.get(0).click();

        browser.sleep(vars.timeToWaitTab);
        browser.getCurrentUrl().then(function(url) {
            expect(url).toMatch(/#\/forum\/new-theme/);
            //from a category
            forum.get();
            browser.sleep(vars.timeToWaitTab);
            forum.categoryButton.click();
            browser.sleep(vars.timeToWaitLoadForumCategory);
            expect(forum.newTopicButtonArray.get(1).isPresent()).toBe(true);
            forum.newTopicButtonArray.get(1).click();

            browser.sleep(vars.timeToWaitTab);
            browser.getCurrentUrl().then(function(url) {
                expect(url).toMatch(/#\/forum\/new-theme/);
                //from a topic
                forum.get();
                browser.sleep(vars.timeToWaitTab);
                forum.categoryButton.click();
                browser.sleep(vars.timeToWaitLoadForumCategory);
                forum.categoryTopicTitle.click();
                browser.sleep(vars.timeToWaitTab);
                expect(forum.newTopicButton.isPresent()).toBe(false);
                expect(forum.newTopicButton.isPresent()).toBe(false);

            });

        });

    });

    it('bbb-225:forum:create a new topic (not registered)', function() {

        forum.get();
        browser.sleep(vars.timeToWaitTab);
        forum.newTopicButton.click();
        browser.sleep(vars.timeToWaitTab);
        browser.getCurrentUrl().then(function(url) {
            expect(url).toMatch(/#\/login/);
            forum.get();
            browser.sleep(vars.timeToWaitTab);
            browser.get('#/forum/new-theme/');
            browser.sleep(vars.timeToWaitTab);
            browser.getCurrentUrl().then(function(url2) {
                expect(url2).toMatch(/#\/login/);

            });

        });

    });
    it('bbb-226:forum:create a new topic wrong', function() {
        login.loginWithRandomUser();
        //topic no category
        forum.get();
        browser.sleep(vars.timeToWaitTab);
        forum.newTopicButton.click();
        browser.sleep(vars.timeToWaitTab);
        var titulo = 'tema automatico ' + Number(new Date());
        forum.newTopicTitle.sendKeys(titulo);
        browser.sleep(vars.timeToWaitSendKeys);
        var script = forum.forumScroll + '.scrollTo(0,1000);';
        browser.executeScript(script).then(function() {
            forum.newTopicDescription.all(by.css('div')).get(15).click();
            var contenido = 'comentario automatico ' + Number(new Date());
            forum.newTopicDescription.all(by.css('div')).get(15).sendKeys(contenido);
            browser.sleep(vars.timeToWaitSendKeys);
            browser.sleep(vars.timeToWaitFadeModals);
            expect(forum.publishTopic.getAttribute('aria-disabled')).toBe('true');
            //topic no title
            forum.get();
            browser.sleep(vars.timeToWaitTab);
            forum.newTopicButton.click();
            browser.sleep(vars.timeToWaitTab);
            forum.categoryList.click();
            forum.categoryList.all(by.css('li')).get(4).click();
            browser.sleep(vars.timeToWaitSendKeys);
            var script = forum.forumScroll + '.scrollTo(0,1000);';
            browser.executeScript(script).then(function() {
                forum.newTopicDescription.all(by.css('div')).get(15).click();
                var contenido = 'comentario automatico ' + Number(new Date());
                forum.newTopicDescription.all(by.css('div')).get(15).sendKeys(contenido);
                browser.sleep(vars.timeToWaitSendKeys);
                browser.sleep(vars.timeToWaitFadeModals);
                expect(forum.publishTopic.getAttribute('aria-disabled')).toBe('true');
                //topic no description
                forum.get();
                browser.sleep(vars.timeToWaitTab);
                forum.newTopicButton.click();
                browser.sleep(vars.timeToWaitTab);
                forum.categoryList.click();
                forum.categoryList.all(by.css('li')).get(4).click();
                browser.sleep(vars.timeToWaitSendKeys);
                var titulo = 'tema automatico ' + Number(new Date());
                forum.newTopicTitle.sendKeys(titulo);
                browser.sleep(vars.timeToWaitSendKeys);
                expect(forum.publishTopic.getAttribute('aria-disabled')).toBe('true');
                login.logout();
            });
        });

    });

});
