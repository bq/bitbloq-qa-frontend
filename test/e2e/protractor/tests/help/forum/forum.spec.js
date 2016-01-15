'use strict';
var GlobalFunctions = require('../../commons/globalFunctions.js'),
    Variables = require('../../commons/variables.js'),
    Forum = require('./forum.po.js'),
    Login = require('../../login/login.po.js'),
    Commons = require('../../commons/commons.po.js'),
    Help = require('../help.po.js');

var globalFunctions = new GlobalFunctions(),
    vars = new Variables(),
    forum = new Forum(),
    login = new Login(),
    commons = new Commons(),
    help = new Help();

globalFunctions.xmlReport('forum');

describe('Forum', function() {
    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bba-283:check forum tag is present', function() {

        help.get();
        browser.sleep(vars.timeToWaitTab);
        expect(help.foroNav.isPresent()).toBe(true);
        help.foroNav.click();
        browser.sleep(vars.timeToWaitTab);
        browser.getCurrentUrl().then(function(url) {
            expect(url).toMatch(/#\/help\/forum/);

        });

    });
    xit('bba-284:check create a new topic button', function() { //bloqueado hasta que se reorganice la header del foro

        login.loginWithRandomUser();
        //from the main forum page
        forum.get();
        browser.sleep(vars.timeToWaitTab);
        expect(forum.newTopicButton.isPresent()).toBe(true);
        forum.newTopicButton.click();
        browser.sleep(vars.timeToWaitTab);
        browser.getCurrentUrl().then(function(url) {
            expect(url).toMatch(/#\/help\/forum\/new-theme/);
            //from a category
            forum.get();
            browser.sleep(vars.timeToWaitTab);
            forum.categoryButton.click();
            browser.sleep(vars.timeToWaitTab);
            expect(forum.newTopicButton.isPresent()).toBe(true);
            forum.newTopicButton.click();
            browser.sleep(vars.timeToWaitTab);
            browser.getCurrentUrl().then(function(url) {
                expect(url).toMatch(/#\/help\/forum\/new-theme/);
            });
            //from a topic

        });

    });
    it('bba-292:create a new topic', function() {
        login.loginWithRandomUser();
        forum.get();
        browser.sleep(vars.timeToWaitTab);
        forum.newTopicButton.click();
        browser.sleep(vars.timeToWaitTab);
        forum.categoryList.click();
        forum.categoryList.all(by.css('li')).get(4).click();
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
            forum.publishTopic.click();
            browser.sleep(vars.timeToWaitTab);
            //en el momento de creacion de este test, no existia traduccion para este toast
            //una vez exista, se añadira el control del idioma para saucelabs
            commons.expectToastTimeOutandText(commons.alertTextToast, 'Tema creado');

            forum.categoryButton.click();
            forum.categoryTopicTitle.click();

            browser.sleep(vars.timeToWaitTab);
            forum.topicTopicTitle.getText().then(function(topicTitle) {
                expect(topicTitle).toBe(titulo);
                forum.topicTopicContent.getText().then(function(topicContent) {
                    expect(topicContent).toMatch(contenido);
                });
            });

        });

        //browser.sleep(100000);
    });
    it('bba-293:create a new topic (not registered)', function() {

        forum.get();
        browser.sleep(vars.timeToWaitTab);
        forum.newTopicButton.click();
        browser.sleep(vars.timeToWaitTab);
        browser.getCurrentUrl().then(function(url) {
            expect(url).toMatch(/#\/login/);
            forum.get();
            browser.sleep(vars.timeToWaitTab);
            browser.get('#/help/forum/new-theme/');
            browser.sleep(vars.timeToWaitTab);
            browser.getCurrentUrl().then(function(url2) {
                expect(url2).toMatch(/#\/login/);

            });

        });

    });
    it('bba-294:create a new topic wrong', function() {
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
              });
        });
    });

});
