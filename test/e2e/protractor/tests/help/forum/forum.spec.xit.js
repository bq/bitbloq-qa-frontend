'use strict';
var GlobalFunctions = require('../../commons/globalFunctions.js'),
    Variables = require('../../commons/variables.js'),
    Forum = require('./forum.po.js'),
    Login = require('../../login/login.po.js'),
    Commons = require('../../commons/commons.po.js');

var globalFunctions = new GlobalFunctions(),
    vars = new Variables(),
    forum = new Forum(),
    login = new Login(),
    commons = new Commons();

globalFunctions.xmlReport('helpForumXit');

describe('Forum', function() {
    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bba-292:helpForumXit:create a new topic', function() {

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
            globalFunctions.navigatorLanguage()
                .then(function(language) {
                    if (language === 'es') {
                        commons.expectToastTimeOutandText(commons.alertTextToast, vars.threadCreated);
                    } else {
                        commons.expectToastTimeOutandText(commons.alertTextToast, vars.threadCreatedEN);
                    }
                });

            forum.get();
            browser.sleep(vars.timeToWaitTab);

            forum.categoryButton.click();
            browser.sleep(vars.timeToWaitLoadForumCategory);
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

    it('bba-295:helpForumXit:create topics with the same title', function() {
        var title = 'same title ' + Number(new Date());
        var description = 'same description' + Number(new Date());
        forum.createTopicNewUser(title, description);
        forum.createNewTopic(title, description);
        forum.get();
        browser.sleep(vars.timeToWaitTab);
        forum.categoryButton.click();
        browser.sleep(vars.timeToWaitLoadForumCategory);
        element.all(by.repeater('theme in forum.categoryThemes').row(0).column('theme.title')).click();
        browser.sleep(vars.timeToWaitTab);
        browser.getCurrentUrl().then(function(url) {
            expect(forum.topicTopicTitle.getText()).toBe(title);
            expect(forum.topicTopicContent.getText()).toMatch(description);
            forum.get();
            browser.sleep(vars.timeToWaitTab);
            forum.categoryButton.click();
            browser.sleep(vars.timeToWaitLoadForumCategory);
            element.all(by.repeater('theme in forum.categoryThemes').row(1).column('theme.title')).click();
            browser.sleep(vars.timeToWaitTab);
            expect(browser.getCurrentUrl()).not.toMatch(url);
            expect(forum.topicTopicTitle.getText()).toBe(title);
            expect(forum.topicTopicContent.getText()).toMatch(description);
            login.logout();
        });

    });

    it('bba-296:helpForumXit:Answer a topic', function() {
        var user = forum.createTopicNewUser().user;
        forum.get();
        browser.sleep(vars.timeToWaitTab);
        forum.categoryButton.click();
        browser.sleep(vars.timeToWaitLoadForumCategory);
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

    it('bba-298:helpForumXit:topic title size limit', function() {
        var longTitle = 'long title ' + Number(new Date());
        for (var i = 0; i < 200; i++) {
            longTitle = longTitle + ' even longer title ' + Number(new Date());
        }
        forum.createTopicNewUser(longTitle);
        browser.sleep(vars.timeToWaitTab);
        forum.get();
        browser.sleep(vars.timeToWaitTab);
        forum.categoryButton.click();
        browser.sleep(vars.timeToWaitLoadForumCategory);
        element.all(by.repeater('theme in forum.categoryThemes').row(0).column('theme.title')).click();
        expect(forum.topicTopicTitle.getText()).toBe(longTitle);
        login.logout();

    });

    it('bba-299:helpForumXit:topic answer size limit', function() {
        forum.createTopicNewUser();
        var longanswer = 'long answer ' + Number(new Date());
        for (var i = 0; i < 200; i++) {
            longanswer = longanswer + ' even longer answer ' + Number(new Date());
        }
        forum.get();
        browser.sleep(vars.timeToWaitTab);
        forum.categoryButton.click();
        browser.sleep(vars.timeToWaitLoadForumCategory);
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

    xit('bba-290:helpForumXit:check the last answer in the main page', function() { //bug +100 temas
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
                    browser.sleep(vars.timeToWaitLoadForumCategory);
                    expect(browser.getCurrentUrl()).toMatch(topicUrl);
                    login.logout();
                    browser.sleep(vars.timeToWaitTab);
                    login.loginWithRandomUser();
                    forum.get();
                    browser.sleep(vars.timeToWaitTab);
                    element.all(by.repeater('category in section').row(1).column('category.name')).click();
                    browser.sleep(vars.timeToWaitLoadForumCategory);
                    element.all(by.repeater('theme in forum.categoryThemes').row(1).column('theme.title')).click();
                    browser.sleep(vars.timeToWaitTab);
                    forum.createAnswer();
                    forum.get();
                    browser.sleep(vars.timeToWaitTab);
                    element.all(by.repeater('category in section').row(1).column('category.lastTheme.threadName')).getText().then(function(lastTopicTitle2) {
                        expect(lastTopicTitle2).toMatch(topicTitle2);
                        element.all(by.repeater('category in section').row(1).column('category.lastTheme.threadName')).click();
                        browser.sleep(vars.timeToWaitLoadForumCategory);
                        expect(browser.getCurrentUrl()).toMatch(topicUrl2);
                        login.logout();
                    });

                });

            });
        });

    });

    // if there are more instances element.all row(0) not run because there are more topic first
    it('bba-289:helpForumXit: check answer count for a topic', function() {
        forum.createTopicNewUser();
        forum.get();
        browser.sleep(vars.timeToWaitTab);
        forum.categoryButton.click();
        browser.sleep(vars.timeToWaitLoadForumCategory);
        browser.sleep(vars.timeToWaitTab);
        element.all(by.repeater('theme in forum.categoryThemes').row(0).column('theme.numberOfAnswers')).getText().then(function(answerCount) {
            expect(answerCount).toMatch('0');
        });
        forum.categoryTopicTitle.click();
        browser.sleep(vars.timeToWaitTab);
        forum.createAnswer();
        forum.createAnswer();
        forum.createAnswer();
        forum.createAnswer();
        forum.createAnswer();
        forum.get();
        browser.sleep(vars.timeToWaitTab);
        forum.categoryButton.click();
        browser.sleep(vars.timeToWaitLoadForumCategory);
        browser.sleep(vars.timeToWaitTab);
        element.all(by.repeater('theme in forum.categoryThemes').row(0).column('theme.numberOfAnswers')).getText().then(function(answerCount) {
            expect(answerCount).toMatch('5');
        });
        login.logout();

    });
    xit('bba-288:helpForumXit: check answer count for a category', function() { //bug +100 temas por categoria
        forum.createTopicNewUser();
        forum.get();
        element.all(by.repeater('category in section').row(0).column('category.numberOfAnswers')).getText().then(function(categoryAnswers) {
            var answerCount = parseInt(categoryAnswers);
            browser.sleep(vars.timeToWaitTab);
            forum.categoryButton.click();
            browser.sleep(vars.timeToWaitLoadForumCategory);
            forum.categoryTopicTitle.click();
            browser.sleep(vars.timeToWaitTab);
            forum.createAnswer();
            forum.createAnswer();
            forum.createAnswer();
            forum.createAnswer();
            answerCount += 4;
            categoryAnswers = answerCount.toString();
            forum.get();
            browser.sleep(vars.timeToWaitTab);
            element.all(by.repeater('category in section').row(0).column('category.numberOfAnswers')).getText().then(function(updateCategoryAnswers) {
                expect(updateCategoryAnswers).toMatch(categoryAnswers);
                login.logout();

            });
        });
    });

    it('bba-287:helpForumXit:check topic count category', function() {
        forum.get();
        browser.sleep(vars.timeToWaitTab);
        element.all(by.repeater('category in section').row(0).column('category.numberOfThemes')).getText().then(function(topicsInCategory) {
            var topicsInCategoryVal = parseInt(topicsInCategory);
            forum.createTopicNewUser();
            forum.createNewTopic();
            forum.createNewTopic();
            forum.get();
            topicsInCategoryVal += 3;
            topicsInCategory = topicsInCategoryVal.toString();
            expect(element.all(by.repeater('category in section').row(0).column('category.numberOfThemes')).getText()).toMatch(topicsInCategory);
            login.logout();

        });

    });
});
