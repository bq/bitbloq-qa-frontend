'use strict';
var GlobalFunctions = require('../commons/globalFunctions.js'),
    Variables = require('../commons/variables.js'),
    Forum = require('./forum.po.js'),
    Login = require('../login/login.po.js'),
    Commons = require('../commons/commons.po.js');

var globalFunctions = new GlobalFunctions(),
    vars = new Variables(),
    forum = new Forum(),
    login = new Login(),
    commons = new Commons();

globalFunctions.xmlReport('forumXit');

describe('Forum', function() {
    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bbb-217:forum:check breadcrumbs', function() {
        //pagina principal
        forum.get();
        browser.sleep(vars.timeToWaitTab);
        expect(forum.breadcrumbsForo.getText()).toMatch('Foro');
        //categoria
        forum.newsCategory.click();
        browser.sleep(vars.timeToWaitLoadForumCategory);
        expect(forum.breadcrumbsForo.getText()).toMatch('Foro');
        expect(forum.breadcrumbsForo.getAttribute('href')).toMatch('#\/forum');
        expect(forum.breadcrumbsCategory.getText()).toMatch('Noticias');
        //tema
        forum.categoryTopicTitle.click();
        browser.sleep(vars.timeToWaitTab);
        expect(forum.breadcrumbsForo.getText()).toMatch('Foro');
        expect(forum.breadcrumbsForo.getAttribute('href')).toMatch('#\/forum');
        expect(forum.breadcrumbsCategory.getText()).toMatch('Noticias');
        expect(forum.breadcrumbsCategory.getAttribute('href')).toMatch('#\/forum\/Noticias');

    });

    it('bbb-219:forumXit:check topic count category', function() {
        forum.get();
        browser.sleep(vars.timeToWaitTab);
        element.all(by.repeater('category in section').row(0).column('category.numberOfThreads')).getText().then(function(topicsInCategory) {
            var topicsInCategoryVal = parseInt(topicsInCategory);
            forum.createTopicNewUser();
            forum.createNewTopic();
            forum.createNewTopic();
            forum.get();
            topicsInCategoryVal += 3;
            topicsInCategory = topicsInCategoryVal.toString();
            expect(element.all(by.repeater('category in section').row(0).column('category.numberOfThreads')).getText()).toMatch(topicsInCategory);
            login.logout();

        });

    });

    it('bbb-220:forumXit: check answer count for a category', function() { //bug +100 temas por categoria
        forum.createTopicNewUser();
        forum.get();
        element.all(by.repeater('category in section').row(0).column('category.numberOfAnswers')).getText().then(function(categoryAnswers) {
            var answerCount = parseInt(categoryAnswers);
            browser.sleep(vars.timeToWaitTab);
            forum.newsCategory.click();
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

    // if there are more instances element.all row(0) not run because there are more topic first
    it('bbb-221:forumXit: check answer count for a topic', function() {
        forum.createTopicNewUser();
        forum.get();
        forum.newsCategory.click();
        element.all(by.repeater('thread in forum.categoryThemes').row(0).column('thread.numberOfAnswers')).getText().then(function(answerCount) {
            expect(answerCount).toMatch('0');
        });
        forum.categoryTopicTitle.click();
        forum.createAnswer();
        forum.createAnswer();
        forum.createAnswer();
        forum.createAnswer();
        forum.createAnswer();
        forum.get();
        forum.newsCategory.click();
        element.all(by.repeater('thread in forum.categoryThemes').row(0).column('thread.numberOfAnswers')).getText().then(function(answerCount) {
            expect(answerCount).toMatch('5');
        });
        login.logout();

    });

    it('bbb-222:forumXit:check the last answer in the main page', function() { //bug +100 temas
        var topicTitle2 = forum.createTopicNewUser('titulo_' + Number(new Date()), 'descripcion_' + Number(new Date()), forum.categoryListBienvenida).topicTitle;
        var topicTitle = 'last answer topic' + Number(new Date());
        browser.getCurrentUrl().then(function(topicUrl2) {
            forum.createNewTopic(topicTitle, 'descripcion_' + Number(new Date()), forum.categoryListBienvenida);
            browser.getCurrentUrl().then(function(topicUrl) {
                forum.get();
                element.all(by.repeater('category in section').row(1).column('category.lastThread.title')).getText().then(function(lastTopicTitle) {
                    expect(lastTopicTitle).toMatch(topicTitle);
                    element.all(by.repeater('category in section').row(1).column('category.lastThread.title')).click();
                    expect(browser.getCurrentUrl()).toMatch(topicUrl);
                    login.logout();
                    login.loginWithRandomUser();
                    forum.get();
                    element.all(by.repeater('category in section').row(1).column('category.name')).click();
                    browser.sleep(vars.timeToWaitLoadForumCategory);
                    element.all(by.repeater('thread in forum.categoryThemes').row(1).column('thread.title')).click();
                    forum.createAnswer();
                    forum.get();
                    element.all(by.repeater('category in section').row(1).column('category.lastThread.title')).getText().then(function(lastTopicTitle2) {
                        expect(lastTopicTitle2).toMatch(topicTitle2);
                        element.all(by.repeater('category in section').row(1).column('category.lastThread.title')).click();
                        expect(browser.getCurrentUrl()).toMatch(topicUrl2);
                        login.logout();
                    });
                });
            });
        });

    });

    it('bbb-224:forumXit:create a new topic', function() {

        login.loginWithRandomUser();
        forum.get();
        forum.newTopicButton.click();
        forum.categoryList.click();
        forum.categoryListNoticias.click();
        var titulo = 'tema automatico ' + Number(new Date());
        forum.newTopicTitle.sendKeys(titulo);
        forum.newTopicDescription.all(by.css('div')).get(15).click();
        var contenido = 'comentario automatico ' + Number(new Date());
        forum.newTopicDescription.all(by.css('div')).get(15).sendKeys(contenido);
        forum.publishTopic.click();
        //en el momento de creacion de este test, no existia traduccion para este toast
        //una vez exista, se añadira el control del idioma para saucelabs
        globalFunctions.navigatorLanguage().then(function(language) {
            if (language === 'es') {
                commons.expectToastTimeOutandText({
                    'alertElement': commons.alertTextToast,
                    'text': vars.threadCreated
                });
            } else {
                commons.expectToastTimeOutandText({
                    'alertElement': commons.alertTextToast,
                    'text': vars.threadCreatedEN
                });
            }
        });

        forum.get();

        forum.newsCategory.click();
        forum.categoryTopicTitle.click();

        forum.topicTopicTitle.getText().then(function(topicTitle) {
            expect(topicTitle).toBe(titulo);
            forum.topicTopicContent.getText().then(function(topicContent) {
                expect(topicContent).toMatch(contenido);
                login.logout();
            });
        });

    });

    it('bbb-227:forumXit:create topics with the same title', function() {
        var title = 'same title ' + Number(new Date()),
            description = 'same description' + Number(new Date());

        forum.createTopicNewUser(title, description);
        forum.createNewTopic(title, description, forum.categoryListNoticias);
        forum.get();
        forum.newsCategory.click();
        browser.sleep(vars.timeToWaitLoadForumCategory);
        element.all(by.repeater('thread in forum.categoryThemes').row(0).column('thread.title')).click();
        browser.getCurrentUrl().then(function(url) {
            expect(forum.topicTopicTitle.getText()).toBe(title);
            expect(forum.topicTopicContent.getText()).toMatch(description);
            forum.get();
            forum.newsCategory.click();
            browser.sleep(vars.timeToWaitLoadForumCategory);
            element.all(by.repeater('thread in forum.categoryThemes').row(1).column('thread.title')).click();
            expect(browser.getCurrentUrl()).not.toMatch(url);
            expect(forum.topicTopicTitle.getText()).toBe(title);
            expect(forum.topicTopicContent.getText()).toMatch(description);
            login.logout();
        });

    });

    it('bbb-228:forumXit:Answer a topic', function() {
        var user = forum.createTopicNewUser().user;
        forum.get();
        forum.newsCategory.click();
        element.all(by.repeater('thread in forum.categoryThemes').row(0).column('thread.title')).click();
        var answer = 'answer_' + Number(new Date());
        forum.answerTopic.all(by.css('div')).get(15).click();
        forum.answerTopic.all(by.css('div')).get(15).sendKeys(answer);
        browser.sleep(vars.timeToWaitSendKeys);
        forum.publishAnswerButton.click();
        element.all(by.repeater('answer in forum.themeAnswers').row(0).column('answer.creator.username')).getText().then(function(userAnswer) {
            expect(userAnswer).toMatch(user.user.toLowerCase());
            expect(forum.answerContent.getText()).toMatch(answer);
            login.logout();
        });

    });

    it('bbb-229:forum:Answer a topic (empty answer)', function() {
        forum.createTopicNewUser();
        forum.get();
        browser.sleep(vars.timeToWaitTab);
        forum.newsCategory.click();
        browser.sleep(vars.timeToWaitLoadForumCategory);
        element.all(by.repeater('thread in forum.categoryThemes').row(0).column('thread.title')).click();
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

    it('bbb-230:forumXit:topic title size limit', function() {
        var longTitle = 'long title ' + Number(new Date());
        for (var i = 0; i < 125; i++) {
            longTitle = longTitle + ' even longer title ' + Number(new Date());
        }
        forum.createTopicNewUser(longTitle);
        forum.get();
        forum.newsCategory.click();
        element.all(by.repeater('thread in forum.categoryThemes').row(0).column('thread.title')).click();
        expect(forum.topicTopicTitle.getText()).toBe(longTitle);
        login.logout();

    });

    it('bbb-231:forumXit:topic answer size limit', function() {
        forum.createTopicNewUser();
        var longanswer = 'long answer ' + Number(new Date());
        for (var i = 0; i < 125; i++) {
            longanswer = longanswer + ' even longer answer ' + Number(new Date());
        }
        forum.get();
        forum.newsCategory.click();
        element.all(by.repeater('thread in forum.categoryThemes').row(0).column('thread.title')).click();
        forum.answerTopic.all(by.css('div')).get(15).click();
        forum.answerTopic.all(by.css('div')).get(15).sendKeys(longanswer);
        forum.publishAnswerButton.click();
        element.all(by.repeater('answer in forum.themeAnswers').row(0).column('answer.owner.username')).getText().then(function() {
            expect(forum.answerContent.getText()).toMatch(longanswer);
            login.logout();
        });

    });

    it('bbb-232:forum:check undo/redo buttons on editor', function() {
        login.loginWithRandomUser();
        forum.get();
        //en nuevo tema
        forum.newTopicButton.click();
        browser.sleep(vars.timeToWaitTab);
        forum.newTopicDescription.all(by.css('div')).get(15).click();
        forum.newTopicDescription.all(by.css('div')).get(15).sendKeys('random description');
        browser.sleep(1000);
        forum.newTopicDescription.all(by.css('div')).get(15).sendKeys('123456');
        forum.newTopicDescription.all(by.css('button')).get(9).click(); //undo
        expect(forum.newTopicDescription.all(by.css('input')).getAttribute('value')).toMatch('random description');
        expect(forum.newTopicDescription.all(by.css('input')).getAttribute('value')).not.toMatch('random description123456');
        forum.newTopicDescription.all(by.css('button')).get(9).click(); //undo
        expect(forum.newTopicDescription.all(by.css('input')).getAttribute('value')).not.toMatch('random description');
        forum.newTopicDescription.all(by.css('button')).get(10).click(); //redo
        expect(forum.newTopicDescription.all(by.css('input')).getAttribute('value')).toMatch('random description');
        forum.newTopicDescription.all(by.css('button')).get(10).click(); //redo
        expect(forum.newTopicDescription.all(by.css('input')).getAttribute('value')).toMatch('random description123456');
        //en respuesta
        forum.get();
        forum.newsCategory.click();
        browser.sleep(vars.timeToWaitLoadForumCategory);
        forum.categoryTopicTitle.click();
        browser.sleep(vars.timeToWaitTab);
        forum.answerTopic.all(by.css('div')).get(15).click();
        forum.answerTopic.all(by.css('div')).get(15).sendKeys('random description');
        browser.sleep(1000);
        forum.answerTopic.all(by.css('div')).get(15).sendKeys('123456');
        forum.answerTopic.all(by.css('button')).get(9).click(); //undo
        expect(forum.answerTopic.all(by.css('input')).getAttribute('value')).toMatch('random description');
        expect(forum.answerTopic.all(by.css('input')).getAttribute('value')).not.toMatch('random description123456');
        forum.answerTopic.all(by.css('button')).get(9).click(); //undo
        expect(forum.answerTopic.all(by.css('input')).getAttribute('value')).not.toMatch('random description');
        forum.answerTopic.all(by.css('button')).get(10).click(); //redo
        expect(forum.answerTopic.all(by.css('input')).getAttribute('value')).toMatch('random description');
        forum.answerTopic.all(by.css('button')).get(10).click(); //redo
        expect(forum.answerTopic.all(by.css('input')).getAttribute('value')).toMatch('random description123456');
        login.logout();
    });

    it('bbb-235:forum:special characters in editor', function() {
        login.loginWithRandomUser();
        forum.get();
        forum.newTopicButton.click();
        browser.sleep(vars.timeToWaitTab);
        forum.newTopicDescription.all(by.css('div')).get(15).click();
        forum.newTopicDescription.all(by.css('div')).get(15).sendKeys('<>&');
        expect(forum.newTopicDescription.all(by.css('input')).getAttribute('value')).toMatch('&lt;&gt;&amp;');
        forum.get();
        forum.newsCategory.click();
        browser.sleep(vars.timeToWaitLoadForumCategory);
        forum.categoryTopicTitle.click();
        browser.sleep(vars.timeToWaitTab);
        forum.answerTopic.all(by.css('div')).get(15).click();
        forum.answerTopic.all(by.css('div')).get(15).sendKeys('<>&');
        expect(forum.answerTopic.all(by.css('input')).getAttribute('value')).toMatch('&lt;&gt;&amp;');
        login.logout();

    });

    it('bbb-236:forumXit:check visit counter topic', function() {
        forum.createTopicNewUser();
        forum.get();
        browser.sleep(vars.timeToWaitTab);
        forum.newsCategory.click();
        browser.sleep(vars.timeToWaitLoadForumCategory);
        element.all(by.repeater('thread in forum.categoryThemes').row(0).column('thread.numberOfViews')).getText().then(function(answerCount) {
            expect(answerCount).toMatch('0');
            forum.categoryTopicTitle.click();
            browser.sleep(vars.timeToWaitTab);
            forum.get();
            browser.sleep(vars.timeToWaitTab);
            forum.newsCategory.click();
            browser.sleep(vars.timeToWaitLoadForumCategory);
            element.all(by.repeater('thread in forum.categoryThemes').row(0).column('thread.numberOfViews')).getText().then(function(answerCount) {
                expect(answerCount).toMatch('0');
                login.logout();
                login.loginWithRandomUser();
                forum.get();
                browser.sleep(vars.timeToWaitTab);
                forum.newsCategory.click();
                browser.sleep(vars.timeToWaitLoadForumCategory);
                forum.categoryTopicTitle.click();
                browser.sleep(vars.timeToWaitTab);
                forum.get();
                browser.sleep(vars.timeToWaitTab);
                forum.newsCategory.click();
                browser.sleep(vars.timeToWaitLoadForumCategory);
                forum.categoryTopicTitle.click();
                browser.sleep(vars.timeToWaitTab);
                forum.get();
                browser.sleep(vars.timeToWaitTab);
                forum.newsCategory.click();
                browser.sleep(vars.timeToWaitLoadForumCategory);
                element.all(by.repeater('thread in forum.categoryThemes').row(0).column('thread.numberOfViews')).getText().then(function(answerCount) {
                    expect(answerCount).toMatch('2');
                    login.logout();
                });
            });
        });
    });
});