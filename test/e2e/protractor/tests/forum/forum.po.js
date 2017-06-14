'use strict';
var Login = require('../login/login.po.js'),
    Variables = require('../commons/variables.js'),
    Commons = require('../commons/commons.po.js'),
    GlobalFunctions = require('../commons/globalFunctions.js');

var login = new Login(),
    vars = new Variables(),
    commons = new Commons(),
    globalFunctions = new GlobalFunctions();

var Forum = function() {
    //header
    this.newTopicButton = $('[data-element="forum-new-topic-button"]');
    this.breadcrumbsForo = $('[data-element="forum-header-breadcrumb-forum"]');
    this.breadcrumbsCategory = $('[data-element="forum-header-breadcrumb-category"]');

    //Footer
    this.contactUsLink = $('[data-element="forum-contact-us-link"]');
    this.contactUsButton = $('[data-element="forum-contact-us-button"]');

    //categories
    this.newsCategory = $('[data-element="forum-category-Noticias"]');
    this.faqCategory = $('[data-element="forum-category-Preguntas frecuentes"]');

    //new topic
    this.categoryList = $('[data-element="forum_category_dropdown"]');
    this.newTopicTitle = $('[data-element="forum-new-theme-title"]');
    this.newTopicDescription = $('[data-element="forum-new-theme-description"]');
    this.forumScroll = '$(\'[data-element="forum-scroll"]\')';
    this.publishTopic = $('[data-element="forum-publish-theme"]');

    //new topic category dropdown
    this.categoryListNoticias = $('[data-element="forum_category_dropdown-8"]');
    this.categoryListBienvenida = $('[data-element="forum_category_dropdown-6"]');

    //category topic lists
    this.categoryTopicTitle = $('[data-element="forum-category-theme-title"]');
    this.categoryTopicTitleArray = element.all(by.xpath('//*[@data-element="forum-category-theme-title"]'));

    //inside a topic
    this.topicTopicTitle = $('[data-element="forum-theme-theme-title"]');
    this.topicTopicContent = $('[data-element="forum-theme-theme-content"]');
    this.answerTopic = $('[data-element="forum-theme-answer-theme"]');
    this.publishAnswerButton = $('[data-element="forum-theme-publish-answer-button"]');
    this.answerContent = $('[data-element="forum-theme-answer"]');

    //FAQS
    this.faqCastellanoThreadCounter = $('[data-element="forum-threads-counter-Preguntas frecuentes"]');
    this.faqEnglishThreadCounter = $('[data-element="forum-threads-counter-English"]');
    this.faqNetherlandsThreadCounter = $('[data-element="forum-threads-counter-Netherlands"]');
    this.faqPyccknnThreadCounter = $('[data-element="forum-threads-counter-Pусский"]');
    this.faqItalianoThreadCounter = $('[data-element="forum-threads-counter-Italiano"]');
    this.faqEuskaraThreadCounter = $('[data-element="forum-threads-counter-Euskara"]');
    this.faqCatalaThreadCounter = $('[data-element="forum-threads-counter-Català"]');
    this.faqFrancaisThreadCounter = $('[data-element="forum-threads-counter-Français"]');
    this.faqDeutschThreadCounter = $('[data-element="forum-threads-counter-Deutsch"]');
    this.faqPortuguesThreadCounter = $('[data-element="forum-threads-counter-Português"]');
    this.faqGalegoThreadCounter = $('[data-element="forum-threads-counter-Galego"]');
    this.faqChineseThreadCounter = $('[data-element="forum-threads-counter-简体中文"]');

    //versions
    this.versionCategory = $('[data-element="forum-category-Versiones de Bitbloq"]');


    this.url = '#/forum';

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
        this.newTopicButton.click();
        browser.sleep(vars.timeToWaitTab);
        this.categoryList.click();
        topicCategory.click();
        this.newTopicTitle.sendKeys(nameTitle);
        browser.sleep(vars.timeToWaitSendKeys);

        this.newTopicDescription.all(by.css('div')).get(15).click();
        this.newTopicDescription.all(by.css('div')).get(15).sendKeys(nameDescription);

        browser.sleep(vars.timeToWaitSendKeys);
        this.publishTopic.click();
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
        browser.sleep(vars.timeToWaitTab);

        return {
            topicTitle: nameTitle,
            topicDescription: nameDescription

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

    this.isPresentTitle = function() {
        return $('[data-element="forum-theme-theme-title"]').isPresent();
    };

    this.isPresentContentThread = function() {
        return $('[data-element="forum-theme-theme-content"]').isPresent();
    };
};
module.exports = Forum;
