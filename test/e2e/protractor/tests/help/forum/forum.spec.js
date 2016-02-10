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
        forum.categoryListNoticias.click();
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
            forum.get();
            browser.sleep(vars.timeToWaitTab);

            forum.categoryButton.click();
            forum.categoryTopicTitle.click();

            browser.sleep(vars.timeToWaitTab);
            forum.topicTopicTitle.getText().then(function(topicTitle) {
                expect(topicTitle).toBe(titulo);
                forum.topicTopicContent.getText().then(function(topicContent) {
                    expect(topicContent).toMatch(contenido);
                    login.logout();
                });
            });

        });

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
                login.logout();
            });
        });

    });
    it('bba-295:create topics with the same title', function() {
        var title = 'same title ' + Number(new Date());
        var description = 'same description' + Number(new Date());
        forum.createTopicNewUser(title, description);
        forum.createNewTopic(title, description);
        forum.get();
        browser.sleep(vars.timeToWaitTab);
        forum.categoryButton.click();
        browser.sleep(vars.timeToWaitTab);
        element.all(by.repeater('theme in forum.categoryThemes').row(0).column('theme.title')).click();
        browser.sleep(vars.timeToWaitTab);
        browser.getCurrentUrl().then(function(url) {
            expect(forum.topicTopicTitle.getText()).toBe(title);
            expect(forum.topicTopicContent.getText()).toMatch(description);
            forum.get();
            browser.sleep(vars.timeToWaitTab);
            forum.categoryButton.click();
            browser.sleep(vars.timeToWaitTab);
            element.all(by.repeater('theme in forum.categoryThemes').row(1).column('theme.title')).click();
            browser.sleep(vars.timeToWaitTab);
            expect(browser.getCurrentUrl()).not.toMatch(url);
            expect(forum.topicTopicTitle.getText()).toBe(title);
            expect(forum.topicTopicContent.getText()).toMatch(description);
            login.logout();
        });

    });

    it('bba-296:Answer a topic', function() {
        var user = forum.createTopicNewUser().user;
        forum.get();
        browser.sleep(vars.timeToWaitTab);
        forum.categoryButton.click();
        browser.sleep(vars.timeToWaitTab);
        element.all(by.repeater('theme in forum.categoryThemes').row(0).column('theme.title')).click();
        browser.sleep(vars.timeToWaitTab);
        var answer = 'answer_' + Number(new Date());
        forum.answerTopic.all(by.css('div')).get(15).click();
        forum.answerTopic.all(by.css('div')).get(15).sendKeys(answer);
        browser.sleep(vars.timeToWaitSendKeys);
        forum.publishAnswerButton.click();
        browser.sleep(vars.timeToWaitTab);
        element.all(by.repeater('answer in forum.themeAnswers').row(0).column('answer.owner.username')).getText().then(function(userAnswer) {
            expect(userAnswer).toMatch(user.user.toLowerCase());
            expect(forum.answerContent.getText()).toMatch(answer);
            login.logout();
        });

    });
    it('bba-297:Answer a topic (empty answer)', function() {
        forum.createTopicNewUser();
        forum.get();
        browser.sleep(vars.timeToWaitTab);
        forum.categoryButton.click();
        browser.sleep(vars.timeToWaitTab);
        element.all(by.repeater('theme in forum.categoryThemes').row(0).column('theme.title')).click();
        browser.sleep(vars.timeToWaitTab);
        expect(forum.publishAnswerButton.getAttribute('aria-disabled')).toBe('true');
        forum.answerTopic.all(by.css('div')).get(15).click();
        forum.answerTopic.all(by.css('div')).get(15).sendKeys('random keystrokes');
        browser.sleep(vars.timeToWaitSendKeys);
        browser.sleep(vars.timeToWaitFadeModals);
        expect(forum.publishAnswerButton.getAttribute('aria-disabled')).toBe('false');
        forum.answerTopic.all(by.css('div')).get(15).click();
        forum.answerTopic.all(by.css('div')).get(15).sendKeys(protractor.Key.BACK_SPACE + protractor.Key.BACK_SPACE + protractor.Key.BACK_SPACE + protractor.Key.BACK_SPACE + protractor.Key.BACK_SPACE + protractor.Key.BACK_SPACE + protractor.Key.BACK_SPACE + protractor.Key.BACK_SPACE + protractor.Key.BACK_SPACE + protractor.Key.BACK_SPACE + protractor.Key.BACK_SPACE + protractor.Key.BACK_SPACE + protractor.Key.BACK_SPACE + protractor.Key.BACK_SPACE + protractor.Key.BACK_SPACE + protractor.Key.BACK_SPACE + protractor.Key.BACK_SPACE);
        browser.sleep(vars.timeToWaitFadeModals);
        expect(forum.publishAnswerButton.getAttribute('aria-disabled')).toBe('true');
        login.logout();
    });

    it('bba-298:topic title size limit', function() {
        var longTitle = 'long title ' + Number(new Date());
        for (var i = 0; i < 200; i++) {
            longTitle = longTitle + ' even longer title ' + Number(new Date());
        }
        forum.createTopicNewUser(longTitle);
        browser.sleep(vars.timeToWaitTab);
        forum.get();
        browser.sleep(vars.timeToWaitTab);
        forum.categoryButton.click();
        browser.sleep(vars.timeToWaitTab);
        element.all(by.repeater('theme in forum.categoryThemes').row(0).column('theme.title')).click();
        expect(forum.topicTopicTitle.getText()).toBe(longTitle);
        login.logout();

    });
    it('bba-299:topic answer size limit', function() {
        forum.createTopicNewUser();
        var longanswer = 'long answer ' + Number(new Date());
        for (var i = 0; i < 200; i++) {
            longanswer = longanswer + ' even longer answer ' + Number(new Date());
        }
        forum.get();
        browser.sleep(vars.timeToWaitTab);
        forum.categoryButton.click();
        browser.sleep(vars.timeToWaitTab);
        element.all(by.repeater('theme in forum.categoryThemes').row(0).column('theme.title')).click();
        browser.sleep(vars.timeToWaitTab);
        forum.answerTopic.all(by.css('div')).get(15).click();
        forum.answerTopic.all(by.css('div')).get(15).sendKeys(longanswer);
        browser.sleep(vars.timeToWaitSendKeys);
        browser.sleep(vars.timeToWaitFadeModals);
        forum.publishAnswerButton.click();
        element.all(by.repeater('answer in forum.themeAnswers').row(0).column('answer.owner.username')).getText().then(function() {
            expect(forum.answerContent.getText()).toMatch(longanswer);
            login.logout();
        });

    });
    it('bba-290:check the last answer in the main page', function() {
        var topicTitle2 = forum.createTopicNewUser('titulo_' + Number(new Date()), 'descripcion_' + Number(new Date()), forum.categoryListBienvenida).topicTitle;
        var topicTitle = 'last answer topic' + Number(new Date());
        browser.getCurrentUrl().then(function(topicUrl2) {

            forum.createNewTopic(topicTitle, 'descripcion_' + Number(new Date()), forum.categoryListBienvenida);
            browser.sleep(vars.timeToWaitTab);
            browser.getCurrentUrl().then(function(topicUrl) {

                forum.get();
                browser.sleep(vars.timeToWaitTab);
                element.all(by.repeater('category in section').row(1).column('category.lastTheme.threadName')).getText().then(function(lastTopicTitle) {
                    expect(lastTopicTitle).toMatch(topicTitle);
                    element.all(by.repeater('category in section').row(1).column('category.lastTheme.threadName')).click();
                    browser.sleep(vars.timeToWaitTab);
                    expect(browser.getCurrentUrl()).toMatch(topicUrl);
                    login.logout();
                    browser.sleep(vars.timeToWaitTab);
                    login.loginWithRandomUser();
                    forum.get();
                    browser.sleep(vars.timeToWaitTab);
                    element.all(by.repeater('category in section').row(1).column('category.name')).click();
                    browser.sleep(vars.timeToWaitTab);
                    element.all(by.repeater('theme in forum.categoryThemes').row(1).column('theme.title')).click();
                    browser.sleep(vars.timeToWaitTab);
                    forum.createAnswer();
                    forum.get();
                    browser.sleep(vars.timeToWaitTab);
                    element.all(by.repeater('category in section').row(1).column('category.lastTheme.threadName')).getText().then(function(lastTopicTitle2) {
                        expect(lastTopicTitle2).toMatch(topicTitle2);
                        element.all(by.repeater('category in section').row(1).column('category.lastTheme.threadName')).click();
                        browser.sleep(vars.timeToWaitTab);
                        expect(browser.getCurrentUrl()).toMatch(topicUrl2);
                        login.logout();
                    });

                });

            });
        });

    });

});
