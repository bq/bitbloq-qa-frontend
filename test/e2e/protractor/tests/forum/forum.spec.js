'use strict';
var GlobalFunctions = require('../commons/globalFunctions.js'),
    Variables = require('../commons/variables.js'),
    Forum = require('./forum.po.js'),
    Login = require('../login/login.po.js'),
    Modals = require('../modals/modals.po.js');

var globalFunctions = new GlobalFunctions(),
    vars = new Variables(),
    forum = new Forum(),
    login = new Login(),
    modals = new Modals();

globalFunctions.xmlReport('forum');

describe('Forum', function () {
    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bbb-215:forum:check forum tag is present', function () {
        forum.get();
        browser.sleep(vars.timeToWaitTab);
        browser.getCurrentUrl().then(function (url) {
            expect(url).toMatch(/#\/forum/);

        });

    });
    it('bbb-216:forum:check create a new topic button', function () {

        login.loginWithRandomUser();
        // from the main forum page
        forum.get();
        expect(forum.newTopicButton.isPresent()).toBe(true, 'fallo0');
        forum.newTopicButton.click();
        browser.getCurrentUrl().then(function (url) {
            console.log('url', url);
            expect(url).toMatch(/#\/forum\/new-theme/, 'fallo1');
            //from a category
            forum.get();
            browser.sleep(vars.timeToWaitTab);
            forum.newsCategory.click();
            expect(forum.newTopicButton.isPresent()).toBe(true, 'fallo4');
            forum.newTopicButton.click();
            browser.getCurrentUrl().then(function (url) {
                expect(url).toMatch(/#\/forum\/new-theme/, 'fallo2');
                //from a topic
                forum.get();

                browser.sleep(vars.timeToWaitTab);
                forum.newsCategory.click();

                forum.createNewTopic();

                browser.sleep(vars.timeToWaitLoadForumCategory);
                expect(forum.newTopicButton.isPresent()).toBe(false, 'fallo3');

            });
        });
    });

    it('bbb-225:forum:create a new topic (not registered)', function () {
        forum.get();
        forum.newTopicButton.click();
        browser.getCurrentUrl().then(function (url) {
            expect(url).toMatch(/#\/login/);
            forum.get();
            browser.get('#/forum/new-theme/');
            browser.getCurrentUrl().then(function (url2) {
                expect(url2).toMatch(/#\/login/);
            });
        });
    });


    it('bbb-226:forum:create a new topic wrong', function () {
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

    it('bbb-194:forum: contact us (unregister user)', function () {
        forum.get();
        globalFunctions.navigatorLanguage()
            .then(function (language) {
                expect(forum.contactUsLink.getAttribute('href')).toEqual(vars.supportEmail(language));
            });
    });

    it('bbb-191:forum: contact us (register user)', function () {

        login.loginWithRandomUser();
        forum.get();
        browser.executeScript('arguments[0].click()', forum.contactUsButton.getWebElement()).then(function () {
            expect(modals.okDialog.isEnabled()).toBe(false);
            modals.sendCommentsTextarea.sendKeys('Esto es un mensaje');
            browser.sleep(vars.timeToWaitSendKeys);
            expect(modals.okDialog.isEnabled()).toBe(true);
            modals.okDialog.click();
        });
    });
});
