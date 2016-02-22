'use strict';
var Login = require('../../login/login.po.js'),
    Variables = require('../../commons/variables.js'),
    Commons = require('../../commons/commons.po.js');

var login = new Login(),
    vars = new Variables(),
    commons = new Commons();

var Forum = function() {
    //header
    this.newTopicButton = $('[data-element="forum-new-topic-button"]');
    this.newTopicButtonArray = element.all(by.css('[data-element="forum-new-topic-button"]'));
    this.categoryButton = $('[data-element="forum-category-button"]');

    //new topic
    this.categoryList = $('[data-element="forum_category_dropdown"]');
    this.newTopicTitle = $('[data-element="forum-new-theme-title"]');
    this.newTopicDescription = $('[data-element="forum-new-theme-description"]');
    this.forumScroll = '$(\'[data-element="forum-scroll"]\')';
    this.publishTopic = $('[data-element="forum-publish-theme"]');

    //new topic category dropdown
    this.categoryListNoticias = $('[data-element="Noticias"]');
    this.categoryListExposicion = $('[data-element="Exposición"]');
    this.categoryListBienvenida = $('[data-element="Bienvenida"]');

    //category topic lists
    this.categoryTopicTitle = $('[data-element="forum-category-theme-title"]');

    //inside a topic
    this.topicTopicTitle = $('[data-element="forum-theme-theme-title"]');
    this.topicTopicContent = $('[data-element="forum-theme-theme-content"]');
    this.answerTopic = $('[data-element="forum-theme-answer-theme"]');
    this.publishAnswerButton = $('[data-element="forum-theme-publish-answer-button"]');
    this.answerContent = $('[data-element="forum-theme-answer"]');

    this.url = '#/help/forum';

    this.get = function() {
        browser.get(this.url);
    };
    this.createTopicNewUser = function(title, description, category) {
        var user = login.loginWithRandomUser();
        var results = this.createNewTopic(title, description, category);
        return {
            topicTitle: results.topicTitle,
            topicDescription: results.topicDescription,
            user: user

        };

    };
    this.createNewTopic = function(title, description, category) {
        var nameTitle = title || 'titulo_' + Number(new Date());
        var nameDescription = description || 'descripcion_' + Number(new Date());
        var topicCategory = category || this.categoryListNoticias;
        this.get();
        browser.sleep(vars.timeToWaitTab);
        this.newTopicButton.click();
        browser.sleep(vars.timeToWaitTab);
        this.categoryList.click();
        topicCategory.click();
        this.newTopicTitle.sendKeys(nameTitle);
        browser.sleep(vars.timeToWaitSendKeys);

        this.newTopicDescription.all(by.css('div')).get(15).click();
        this.newTopicDescription.all(by.css('div')).get(15).sendKeys(nameDescription);

        browser.sleep(vars.timeToWaitSendKeys);
        browser.sleep(vars.timeToWaitFadeModals);
        this.publishTopic.click();
        browser.sleep(vars.timeToWaitTab);
        //en el momento de creacion de este test, no existia traduccion para este toast
        //una vez exista, se añadira el control del idioma para saucelabs
        commons.expectToastTimeOutandText(commons.alertTextToast, 'Tema creado');
        browser.sleep(vars.timeToWaitTab);

        return {
            topicTitle: nameTitle,
            topicDescription: nameDescription,

        };

    };
    this.createAnswer = function(answer) {
        var answerText = answer || 'answer_' + Number(new Date());
        this.answerTopic.all(by.css('div')).get(15).click();
        this.answerTopic.all(by.css('div')).get(15).sendKeys(answerText);
        browser.sleep(vars.timeToWaitSendKeys);
        this.publishAnswerButton.click();
        browser.sleep(vars.timeToWaitTab);

        return {
            answer: answerText,

        };
    };
};
module.exports = Forum;
